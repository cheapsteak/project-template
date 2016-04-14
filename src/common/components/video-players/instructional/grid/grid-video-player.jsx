import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import PlayButtonSvg from 'svgs/icon-play.svg';
import PauseButtonSvg from 'svgs/icon-pause.svg';
import BackButtonSvg from 'svgs/video-back-button.svg';
import ForwardButtonSvg from 'svgs/video-forward-button.svg';
import MuteButtonSvg from 'svgs/video-player-mute.svg';
import VolumeButtonSvg from 'svgs/video-player-volume.svg';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import CloseSvg from 'svgs/icon-close.svg';
import PillButton from 'common/components/pill-button/pill-button';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import ImageCard from '../../components/image-card-one/image-card-one.jsx';
import VideoCard from '../../components/video-card/video-card.jsx';
import HoverCard from 'common/components/timeline/timeline-hover-card/timeline-hover-card';
import calculateAnimationStates from '../../calculateAnimationStates.js';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';
import BgCover from 'background-cover';
import PlayButton from 'common/components/play-button/play-button';
import detect from 'common/utils/detect';

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
    animate.set(this.refs.controls, this.animationStates[initialState].controls);
    animate.set(this.refs.controlsUI, this.animationStates[initialState].controlsUI),

    animate.set(this.refs.endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(this.refs.replayButton, this.animationStates.out.replayButton);
    animate.set(this.refs.replayLabel, this.animationStates.out.replayLabel);

    window.addEventListener('resize', this.handleResize);

    if(this.props.isMuted) {
      this.video.volume = 0;
    }
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
        this.video.play();
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
      this.video.play();
    }

    if(this.props.isMuted !== nextProps.isMuted) {
      nextProps.isMuted ? this.mute() : this.unmute();
    }
  }

  componentWillAppear(callback) {
    if (!detect.isMobile) {
      this.video.play();
      this.props.onVideoPlay();
    }
    callback();
  }

  componentWillEnter(callback) {
    //this.props.onVideoPause();
    //this.video.pause();

    // timeout is needed because we want to start playing video only after previous page animateOut is done
    setTimeout(() => {
      if (!detect.isMobile) {
        this.video.play();
        this.props.onVideoPlay();
      }
      callback();
    }, 1500);
  }

  componentWillLeave(callback) {
    animate.set(this.containerEl, {zIndex: 999999});
    this.isAnimatingOut = true;
    this.props.onVideoPause();
    this.video.pause();
    this.props.hideFullControls();
    this.animateOutFade(callback);
  }

  componentWillUnmount() {
    clearInterval(this.nextVideoIntervalId);
    clearTimeout(this.hideControlsTimeoutId);
    this.video.pause();
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
      .then(() => callback && callback())
  };

  get videoEnded () {
    return this.video && this.video.currentTime === this.video.duration;
  }

  handleResize = () => {
    const videoWrapperOnUpdate = () => BgCover.BackgroundCover(this.video, this.refs.videoWrapper);

    this.animationStates = calculateAnimationStates(this.refs);
    this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = this.videoResize;

    animate.set(this.refs.controls, { height: this.animationStates.idle.controls.height });

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
      this.video.play();
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
      this.video.pause();
      this.props.onVideoPause();
    } else {
      this.video.play();
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

  handleControlsMouseEnter = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = undefined;
  };

  handleReplayClick = (e) => {
    this.changeVideoTime(0);
    setTimeout(this.handleVideoPlayPause, 1000);
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

    if(!this.props.useFullControls && !this.videoEnded && !_.isEqual(this.lastMouseCoord, mouseCoords)) {
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
  };

  changeVideoTime = (time) => {
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
    }, 4000);
  }

  unmute = () => {
    animate.to(this.video, 0.8, { volume: 1, ease: Quad.easeOut });
  };

  mute = () => {
    animate.to(this.video, 0.8, { volume: 0, ease: Quad.easeOut });
  };

  animateInControls = () => {
    this.wrapperVisible = true;

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.idle.cornerButton),
      animate.to(this.refs.controlsUI, 0.6, this.animationStates.idle.controlsUI),
      animate.to(this.refs.controls, 0.6, this.animationStates.idle.controls),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.idle.moreAboutCTA)
    ]);
  };

  animateOutControls = () => {
    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar)
    ];

    this.wrapperVisible = false;

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
      animate.to(this.refs.controlsUI, 0.6, this.animationStates.out.controlsUI),
      animate.to(this.refs.controls, 0.6, this.animationStates.out.controls)
    ]);
  };

  animateInEndOverlay = () => {
    this.stopAnimations();

    this.zoomedOut = true;

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
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
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  stopAnimations = () => {
    TweenMax.killTweensOf(_.values(this.refs));
  }

  handleTouchStart = () => {
    if (!this.userHasInteracted) {
      this.userHasInteracted = true;
      this.video.play();
      this.props.onVideoPlay();
      animate.to(this.refs.playButton.containerEl, 0.3, {autoAlpha: 0});
    }

    this.props.showFullControls();
    this.setHideControlsTimeout();
  };


  render() {
    const { style, modelSlug, prevVideo, nextVideo, className } = this.props;
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';
    const prevVideoRoute = prevVideo ? prevVideo.gridRoute : '/';
    const nextVideoRoute = nextVideo ? nextVideo.gridRoute : '/';

    return (
      <div
        ref="root"
        className={`video-player instructional-video-player grid-player ${className || ''}`}
        style={style}
        onMouseMove={this.handleComponentMouseMove}
        onTouchStart={this.handleTouchStart}
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
            style={{visibility: this.state.isReady ? 'visible' : 'hidden'}}
          >
          </video>

          {
            this.state.isMobile ? <PlayButton ref="playButton" label="Play"/> : null
          }

          <div
            ref="endingOverlay"
            className="end-overlay"
          >
            <div className="end-overlay-ui">
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
                  />
                  ,
                  <VideoCard
                    key={'nextVideoId'}
                    title={nextVideo.title}
                    route={nextVideoRoute}
                    video={nextVideo.src}
                    timeLeft={this.state.nextVideoTimeLeft}
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
          </div>
          <RectangularButton
            ref={ node => this.refs.cornerButton = findDOMNode(node) }
            className="close-button"
            text="Close"
            color="#ffffff"
            backgroundColor="#f99100"
            hoverBackgroundColor="#f99100"
            svgIcon={CloseSvg}
            onClick={this.handleCloseButtonClick}
          />
          <Link
            onClick={this.props.onVideoPause}
            className="more-about-cta"
            ref={ node => this.refs.moreAboutCTA = findDOMNode(node) }
            to={this.props.chapterRoute || '/'}>
            <PillButton
              idleText={`More About ${this.props.title}`}
              activeText={`More About ${this.props.title}`}
            />
          </Link>
          <div ref="overlay" className="video-overlay"></div>
        </div>
        <div
          ref="simpleProgressBar"
          className="simple-progress-bar"
        >
          <span style={{ width: progressWidth }}></span>
        </div>
        <div
         ref="controls"
         className="controls"
         onMouseEnter={this.handleControlsMouseEnter}
         onTouchMove={ this.handleControlsMouseEnter}
         onTouchEnd={ this.setHideControlsTimeout }
        >
          <span className="label-duration">{secondsToMinutes(this.video && this.video.duration || 0)}</span>
          <div ref="controlsUI" className="controls-ui">
            <div className="control-group">
              <div className="button-wrapper">
                <div
                  className="button play-button"
                  dangerouslySetInnerHTML={{__html: !this.props.isPlaying ? PlayButtonSvg : PauseButtonSvg }}
                  onClick={this.handleVideoPlayPause}
                >
                </div>
              </div>
              <div
                ref="prevButton"
                className="button-wrapper"
                onMouseEnter={this.handleMouseEnterPrevButton}
                onMouseLeave={this.handleMouseLeaveNextPrevButtons}
              >
                <div
                  className="button"
                  onClick={this.handlePrevClick}
                  dangerouslySetInnerHTML={{__html: BackButtonSvg}}
                >
                </div>
                <TransitionGroup>
                  {
                    this.state.showHoverCard === 'prev' && prevVideo
                    ? <HoverCard
                        key="prev-card"
                        getContainer={ () => this.refs.prevButton }
                        ctaText={prevVideo.title}
                      />
                    : undefined
                  }
                </TransitionGroup>
              </div>
              <div
                ref="nextButton"
                className="button-wrapper"
                onMouseEnter={this.handleMouseEnterNextButton}
                onMouseLeave={this.handleMouseLeaveNextPrevButtons}
              >
                <div
                  className="button"
                  onClick={this.handleNextClick}
                  dangerouslySetInnerHTML={{__html: ForwardButtonSvg}}
                >
                </div>
                <TransitionGroup>
                  {
                    this.state.showHoverCard === 'next' && nextVideo
                    ? <HoverCard
                        key="next-card"
                        getContainer={ () => this.refs.prevButton }
                        ctaText={nextVideo.title}
                      />
                    : undefined
                  }
                </TransitionGroup>
              </div>
              {
                !detect.isTablet
                ? <div className="button-wrapper">
                    <div
                      className="button"
                      dangerouslySetInnerHTML={{__html: !this.props.isMuted ? VolumeButtonSvg : MuteButtonSvg }}
                      onClick={this.handleVolumeClick}
                    >
                    </div>
                  </div>
                : null
              }
            </div>
            <Timeline
              currentTime={this.props.currentTime || 0}
              duration={this.props.duration || 0}
              onTimeChange={this.changeVideoTime}
              items={[]}
            />
          </div>
        </div>
      </div>
    )
  }
}
