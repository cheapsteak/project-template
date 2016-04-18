import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import VideoControls from 'common/components/video-players/components/video-controls/video-controls';
import SimpleProgressBar from 'common/components/video-players/components/simple-progress-bar/simple-progress-bar';
import PillButton from 'common/components/pill-button/pill-button';
import PlayButton from 'common/components/play-button/play-button';
import ImageCard from 'common/components/video-players/components/image-card-one/image-card-one.jsx';
import VideoCard from 'common/components/video-players/components/video-card/video-card.jsx';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import CloseSvg from 'svgs/icon-close.svg';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import calculateAnimationStates from '../../calculateAnimationStates.js';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';
import BgCover from 'background-cover';
import detect from 'common/utils/detect';
import createVideoAnalyticsTracker from 'common/utils/createVideoAnalyticsTracker';

export default class GridVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    className: React.PropTypes.string,
    poster: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  static contextTypes = {
    router: React.PropTypes.object,
    previousRoute: React.PropTypes.string
  };

  static nextVideoCountdownTime = 15;

  nextVideoIntervalId = undefined;
  hideControlsTimeoutId = undefined;
  wrapperVisible = false;

  state = {
    showEndingCTA: false,
    nextVideoTimeLeft: GridVideoPlayer.nextVideoCountdownTime,
    showHoverCard: undefined,
    isReady: false,
    isMobile: detect.isMobile
  };

  componentWillMount() {
    this.props.onVideoTimeChange(0);
  }

  componentDidMount() {
    this.animationStates = calculateAnimationStates(this.refs);
    this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = this.videoResize;

    this.containerEl = findDOMNode(this);

    let initialState = this.props.useFullControls
      ? 'idle'
      : 'out';

    // Temporary Fix for race condition between store update and component mounting
    initialState = 'out';

    const endingState = this.props.currentTime === this.props.duration && this.props.duration
      ? 'idle'
      : 'out';

    animate.set(this.refs.cornerButton, this.animationStates[initialState].cornerButton);
    animate.set(this.refs.overlay, this.animationStates[initialState].overlay);
    animate.set(this.refs.videoWrapper, this.animationStates[initialState].videoWrapper);

    animate.set(this.refs.endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(this.refs.replayButton, this.animationStates.out.replayButton);
    animate.set(this.refs.replayLabel, this.animationStates.out.replayLabel);

    window.addEventListener('resize', this.handleResize);

    if(this.props.isMuted) {
      this.video.volume = 0;
    }

    this.analytics = createVideoAnalyticsTracker(this.video, `Instructional Video Player - ${this.props.slug}`, 'Instructional Video');
    this.analytics.track();
  }

  componentWillReceiveProps(nextProps) {

    // Video Finished
    if(nextProps.duration && this.props.currentTime !== nextProps.currentTime) {
      if(nextProps.currentTime >= nextProps.duration) {
        this.animateInEndOverlay();
        this.props.hideFullControls();
        this.clearCountdown();
        this.nextVideoIntervalId = setInterval(() => {
          if(this.state.nextVideoTimeLeft > 0) {
            this.setState({ nextVideoTimeLeft: this.state.nextVideoTimeLeft - 1 })
          } else {
            this.context.router.replace(this.props.nextVideo.gridRoute);
          }
        }, 1000);
      } else if (this.props.currentTime >= this.props.duration
        && nextProps.currentTime <= nextProps.duration) {

        // Video going to replay
        this.clearCountdown();
        this.animateOutEndOverlay();
        this.props.hideFullControls();
        this.playVideo();
      }
    }

    if(this.props.useFullControls !== nextProps.useFullControls && !this.videoEnded) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
      }
    }

    if(this.props.slug && this.props.slug !== nextProps.slug) {
      this.clearCountdown();
      this.animateOutEndOverlay();
      this.props.hideFullControls();
      this.playVideo();
    }

    if(this.props.isMuted !== nextProps.isMuted) {
      nextProps.isMuted ? this.mute() : this.unmute();
    }
  }

  componentWillAppear(callback) {
    if (!detect.isMobile) {
      this.playVideo();
      this.props.onVideoPlay();
    }
    callback();
  }

  componentWillEnter(callback) {
    //this.props.onVideoPause();
    //this.pauseVideo();

    // timeout is needed because we want to start playing video only after previous page animateOut is done
    setTimeout(() => {
      if (!detect.isMobile) {
        this.playVideo();
        this.props.onVideoPlay();
      }
      callback();
    }, 1500);
  }

  componentWillLeave(callback) {
    animate.set(this.containerEl, {zIndex: 999999});
    this.isAnimatingOut = true;
    this.props.onVideoPause();
    this.pauseVideo();
    this.props.hideFullControls();
    this.animateOutFade(callback);
  }

  componentWillUnmount() {
    this.isAnimatingOut = true;
    clearInterval(this.nextVideoIntervalId);
    clearTimeout(this.hideControlsTimeoutId);
    this.pauseVideo();
    // this.props.onVideoPause();
    window.removeEventListener('resize', this.handleResize);
    this.stopAnimations();
  }

  animateOutFade = (callback) => {
    const duration = 1.2;
    const ease = Expo.easeOut;

    this.props.hideFullControls();

    return animate.all([
        animate.to(this.containerEl, duration, {autoAlpha: 0, ease: ease, delay: 0.5})
      ])
      .then(callback)
  };

  get videoEnded () {
    return this.video && this.video.currentTime === this.video.duration;
  }

  handleResize = () => {
    const videoWrapperOnUpdate = () => BgCover.BackgroundCover(this.video, this.refs.videoWrapper);

    this.animationStates = calculateAnimationStates(this.refs);
    this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = this.videoResize;


    if(this.wrapperVisible) {
      animate.set(this.refs.videoWrapper, {
        width: this.animationStates.idle.videoWrapper.width,
        height: this.animationStates.idle.videoWrapper.height,
      });
    }

    animate.set(this.video, {clearProps: 'all'});

    this.videoResize();
  };

  videoResize = () => {
    if (window.innerWidth > window.innerHeight) {
      BgCover.BackgroundCover(this.video, this.refs.videoWrapper);
    } else {
      animate.set(this.video, {position: 'absolute', top: '50%', y: '-50%', height: 'auto'});
    }
  };

  handleMetadataLoaded = () => {
    this.video.currentTime = this.props.currentTime;
    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);

    if(this.props.isPlaying && !detect.isMobile) {
      this.playVideo();
    }

    this.handleResize();
    this.setState({isReady: true});
  };

  handleTimeUpdate = () => {
    this.props.onVideoTimeChange(this.video.currentTime);
  };

  handleVideoPlayPause = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = undefined;

    if(this.props.isPlaying) {
      this.pauseVideo();
      this.props.onVideoPause();
    } else {
      this.playVideo();
      this.props.onVideoPlay();
    }
  };

  handleMouseEnterPrevButton = () => {
    this.state.showHoverCard !== 'prev' && this.setState({ showHoverCard: 'prev' });
  }

  handleMouseEnterNextButton = () => {
    this.state.showHoverCard !== 'next' && this.setState({ showHoverCard: 'next' });
  }

  handlePrevClick = () => {
    const prevVideoRoute = this.props.prevVideo ? this.props.prevVideo.gridRoute : '/';
    this.context.router.replace(prevVideoRoute);
  };

  handleNextClick = () => {
    const nextVideoRoute = this.props.nextVideo ? this.props.nextVideo.gridRoute : '/';
    this.context.router.replace(nextVideoRoute);
  };

  handleMouseLeaveNextPrevButtons = () => {
    this.setState({ showHoverCard: undefined });
  };

  handleMouseEnterControls = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = undefined;
  };

  handleReplayClick = (e) => {
    this.changeVideoTime(0);
    setTimeout(this.handleVideoPlayPause, 1000);

    tracking.trackEvent({
      category: 'Instructional video player end - Replay CTA',
      label: 'Instructional Video'
    });
  };

  handleEnded = (e) => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = undefined;
    this.props.hideFullControls();
    this.handleVideoPlayPause();
  };

  handleComponentMouseMove = (e) => {
    if (this.isAnimatingOut) return;

    const mouseCoords = {
      x: e.clientX,
      y: e.clientY
    };

    if(this.isAnimatingOut || this.videoEnded || !this.lastMouseCoord) {
      this.lastMouseCoord = mouseCoords;
      return;
    }

    if(!this.props.useFullControls && !this.videoEnded && !this.isAnimatingOut && !_.isEqual(this.lastMouseCoord, mouseCoords)) {
      this.props.showFullControls();
      this.setHideControlsTimeout();
    }

    this.lastMouseCoord = mouseCoords;
  };

  handleVolumeClick = (e) => {
    if(this.props.isMuted) {
      this.props.unmute();
    } else {
      this.props.mute();
    }
  };

  handleCloseButtonClick = () => {
    if(this.context.previousRoute) {
      history.back();
    } else {
      this.context.router.replace('/grid');
    }

    tracking.trackEvent({
      category: 'Instructional video player - Close CTA',
      label: 'Instructional Video'
    });
  };

  changeVideoTime = (time) => {
    if(isNaN(time)) {
      console.warn('Attempt to set time to something thats NaN');
      return;
    }

    this.video.currentTime = time;
  };

  clearCountdown = () => {
    clearInterval(this.nextVideoIntervalId);
    this.nextVideoIntervalId = undefined;
    this.setState({ nextVideoTimeLeft: GridVideoPlayer.nextVideoCountdownTime });
  };

  setHideControlsTimeout = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = setTimeout(() => {
      this.props.hideFullControls();
      this.hideControlsTimeoutId = undefined;
    }, 3000);
  }

  unmute = () => {
    return animate.to(this.video, 0.8, { volume: 1, ease: Quad.easeIn })
  };

  mute = () => {
    return animate.to(this.video, 0.5, { volume: 0, ease: Quad.easeIn })
  };

  playVideo = () => {
    if(this.video.paused) {
      if(!this.props.isMuted && !detect.isMobile) {
        animate.set(this.video, { volume: 0 });
        this.video.play();
        this.unmute();
        this.setHideControlsTimeout();
      } else {
        this.video.play();
      }
    }
  };

  pauseVideo = async () => {
    if(!this.video.paused) {
      !this.props.useFullControls && !this.isAnimatingOut && this.props.showFullControls();

      if(!this.props.isMuted && !detect.isMobile) {
        animate.set(this.video, { volume: 1 });
        await this.mute();
      }
      
      this.video && this.video.pause();
    }
  };

  animateInControls = () => {
    if(this.isAnimatingOut) return

    this.wrapperVisible = true;

    // this.stopAnimations();

    return Promise.all([
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.idle.cornerButton),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.idle.moreAboutCTA)
    ]);
  };

  animateOutControls = () => {
    // if(this.isAnimatingOut) return

    // this.stopAnimations(_.omit(this.refs, 'endingOverlay'));

    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
    ];


    this.wrapperVisible = false;

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
    ]);
  };

  animateInEndOverlay = () => {
    // this.stopAnimations(_.omit(this.refs, 'endingOverlay'));
    

    this.zoomedOut = true;

    return Promise.all([
      animate.to(this.refs.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.idle.replayLabel),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.idle.cornerButton),
      animate.to(this.refs.overlay, 0.3, this.animationStates.end.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
        .then(() => this.setState({ showEndingCTA: true }))
    ]);
  };

  animateOutEndOverlay = () => {
    this.stopAnimations();
    this.setState({ showEndingCTA: false });
    this.wrapperVisible = false;

    return Promise.all([
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  stopAnimations = (els) => {
    TweenMax.killTweensOf(els || _.values(this.refs));
  }

  handleTouchStart = () => {
    if (!this.userHasInteracted) {
      this.userHasInteracted = true;
      this.playVideo();
      this.props.onVideoPlay();
      animate.to(this.refs.playButton.containerEl, 0.3, {autoAlpha: 0});
    }

    this.props.showFullControls();
    this.setHideControlsTimeout();
  };

  handleClick = (e) => {
    if(e.target.id === 'videoOverlay') {
      this.handleVideoPlayPause();
    }
  };

  handleLearnMoreClick = () => {
    this.props.onVideoPause();
    tracking.trackEvent({
      category: 'Instructional video player - ' + this.props.title + ' learn more',
      label: 'Instructional Video'
    });
  };

  handleChapterCtaClick = () => {
    tracking.trackEvent({
      category: 'Instructional video player end - ' + this.props.title + ' learn more CTA',
      label: 'Instructional Video'
    });
  };

  handleNextVideoCtaClick = () => {
    tracking.trackEvent({
      category: 'Instructional video player end - ' + this.props.title + ' play next video CTA',
      label: 'Instructional Video'
    });
  };

  render() {
    const { style, modelSlug, prevVideo, nextVideo, className = '' } = this.props;
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';
    const prevVideoRoute = prevVideo ? prevVideo.gridRoute : '/';
    const nextVideoRoute = nextVideo ? nextVideo.gridRoute : '/';

    return (
      <div
        ref="root"
        className={`video-player instructional-video-player grid-player ${className} ${this.state.isReady ? ' ready' : ''}`}
        style={style}
        onMouseMove={this.handleComponentMouseMove}
        onTouchStart={this.handleTouchStart}
        onClick={this.handleClick}
      >
        <div
          ref="videoWrapper"
          className="video-wrapper"
        >
          <video
            id={this.videoId}
            preload="auto"
            ref={(node) => this.video = node }
            src={this.props.src}
            onLoadedMetadata={this.handleMetadataLoaded}
            onEnded={this.handleEnded}
            onTimeUpdate={this.handleTimeUpdate}
            poster={this.props.poster}
          >
          </video>

          {
            this.state.isMobile ? <PlayButton ref="playButton" label="Play"/> : null
          }

          <div
            ref="endingOverlay"
            className="end-overlay"
          >
            <TransitionGroup
              component="div"
              className="ending-cards"
            >
            {
              this.state.showEndingCTA
              ? [
                <ImageCard
                  key={'currentId'}
                  label="Discover:"
                  title={this.props.title}
                  route={this.props.chapterRoute}
                  image={this.props.endingCardImage}
                  onClick={this.handleChapterCtaClick}
                />
                ,
                <VideoCard
                  key={'nextVideoId'}
                  title={nextVideo.title}
                  route={nextVideoRoute}
                  video={nextVideo.src}
                  timeLeft={this.state.nextVideoTimeLeft}
                  onClick={this.handleNextVideoCtaClick}
                />
              ]
              : undefined
            }
            </TransitionGroup>
            <div
              className="replay-group"
            >
              <div
                ref="replayButton"
                className="replay-button"
                onClick={this.handleReplayClick}
                dangerouslySetInnerHTML={{ __html: ReplayArrowSvg }}
              >
              </div>
              <label
                ref="replayLabel"
                className="replay-label"
              >
                Replay
              </label>
            </div>
          </div>
          <RectangularButton
            ref={ node => this.refs.cornerButton = findDOMNode(node) }
            className="close-button"
            text="Close"
            color="#ffffff"
            backgroundColor="#f7910b"
            hoverBackgroundColor="#de8209"
            svgIcon={CloseSvg}
            onClick={this.handleCloseButtonClick}
          />
          <Link
            onClick={this.handleLearnMoreClick}
            className="more-about-cta"
            ref={ node => this.refs.moreAboutCTA = findDOMNode(node) }
            to={this.props.chapterRoute || '/'}>
            <PillButton
              idleText={`More About ${this.props.title}`}
              activeText={`More About ${this.props.title}`}
            />
          </Link>
          <div
            ref="overlay"
            id="videoOverlay"
            className="video-overlay"
          >
          </div>
        </div>
        <TransitionGroup
          component="div"
          className="video-controls-wrapper"
        >
          {
            this.isAnimatingOut ? null :
            this.props.useFullControls
            ? <VideoControls
                key={`video-controls-${this.props.slug}`}
                isPlaying={this.props.isPlaying}
                isMuted={this.props.isMuted}
                currentTime={this.props.currentTime}
                duration={this.video && this.video.duration}

                onScrubberClick={this.changeVideoTime}
                onMouseEnter={this.handleMouseEnterControls}
                onMouseMove={e => e.stopPropagation()}
                onTouchMove={this.handleMouseEnterControls}
                onTouchEnd={this.setHideControlsTimeout}

                playPauseButton={this.handleVideoPlayPause}
                prevButton={{
                  onClick: this.handlePrevClick,
                  hoverCard: prevVideo && {
                    text: prevVideo.title
                  }
                }}
                nextButton={{
                  onClick: this.handleNextClick,
                  hoverCard: nextVideo && {
                    text: nextVideo.title
                  }
                }}
                muteButton={this.handleVolumeClick}
              />
            : !this.state.showEndingCTA
              ? <SimpleProgressBar
                  key={`simple-progress-bar-${this.props.slug}`}
                  currentTime={this.props.currentTime}
                  duration={this.props.duration}
                />
              : null
          }
        </TransitionGroup>
      </div>
    )
  }
}
