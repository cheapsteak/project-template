import React from 'react';
import { findDOMNode } from 'react-dom';
import PlayButton from 'common/components/play-button/play-button';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import VideoControls from 'common/components/video-players/components/video-controls/video-controls';
import SimpleProgressBar from 'common/components/video-players/components/simple-progress-bar/simple-progress-bar';
import TransitionGroup from 'react-transition-group-plus';
import CloseSvg from 'svgs/icon-close.svg';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import animate from 'gsap-promise';
import calculateAnimationStates from '../../calculateAnimationStates.js';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';
import BgCover from 'background-cover';
import detect from 'common/utils/detect';
import createVideoAnalyticsTracker from 'common/utils/createVideoAnalyticsTracker';

export default class ChapterVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    className: React.PropTypes.string,
    poster: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  state = {
    isReady: false,
    isMobile: detect.isMobile
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  els = {};
  videoId = 'target-video';
  cloneId = 'clone-video';
  hideControlsTimeoutId = undefined;
  wrapperVisible = false;

  componentDidMount() {
    this.animationStates = calculateAnimationStates(this.els);

    if(!this.props.isFullBrowser) {
      this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = this.videoResize;
    }

    const initialState = this.props.useFullControls
      ? 'idle'
      : 'out';

    const endingState = this.props.currentTime === this.props.duration && this.props.duration
      ? 'idle'
      : 'out';

    animate.set(this.els.cornerButton, this.animationStates[initialState].cornerButton);
    animate.set(this.els.overlay, this.animationStates[initialState].overlay);
    animate.set(this.els.videoWrapper, this.animationStates[initialState].videoWrapper);
    animate.set(this.els.endingOverlay, this.animationStates.out.endingOverlay);

    this.props.isPlaying && this.video && this.playVideo();

    window.addEventListener('resize', this.handleResize);

    if(this.video) {
      this.analytics = createVideoAnalyticsTracker(this.video, `Instructional Video Player - ${this.props.slug}`, 'Instructional Video');
      this.analytics.track();
    }
  }

  componentWillReceiveProps(nextProps) {

    if(this.props.init !== undefined && this.props.init !== nextProps.init) {
      this.animateInControls();
    } else if(this.props.useFullControls !== nextProps.useFullControls && !this.videoEnded) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else if(this.props.isPlaying) {
        this.animateOutControls();
      }
    }

    if(nextProps.duration && this.props.currentTime !== nextProps.currentTime) {
      if(nextProps.currentTime >= nextProps.duration) {
        this.animateInEndOverlay();
        this.props.hideFullControls();
      } else if (this.props.currentTime >= this.props.duration
        && nextProps.currentTime <= nextProps.duration) {
        this.animateOutEndOverlay();
        this.props.hideFullControls();
      }
    }

    if(this.props.isPlaying !== nextProps.isPlaying) {
      nextProps.isPlaying ? this.playVideo() : this.pauseVideo();
    }

    if(this.props.isMuted !== nextProps.isMuted) {
      nextProps.isMuted ? this.mute() : this.unmute();
    }
  }

  componentWillEnterFullBrowser = () => {
    const container = this.els.videoWrapper;
    const video = document.querySelector(`#${this.videoId}`);
    const videoParent = video.parentNode;
    const clone = video.cloneNode();
    const isPlaying = !video.paused;

    clone['data-reactid'] = new Date().getTime();
    clone.id = this.cloneId;

    videoParent.removeChild(video)
    videoParent.insertBefore(clone, videoParent.firstChild);
    container.insertBefore(video, container.firstChild);

    this.video = video;

    isPlaying && video.play();

    this.handleResize();

    return Promise.resolve();
  };

  componentWillLeaveFullBrowser = () => {
    this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = undefined;

    animate.to(this.els.videoWrapper, 0.6, this.animationStates.out.videoWrapper);
    return Promise.resolve();
  };

  componentDidLeaveFullBrowser = () => {
    const container = findDOMNode(this);
    const clone = document.querySelector('#clone-video');
    const cloneParent = clone.parentNode;
    const video = document.querySelector(`#${this.videoId}`);
    const isPlaying = !video.paused;

    cloneParent.removeChild(clone)
    cloneParent.insertBefore(video, cloneParent.firstChild);
    isPlaying && video.play();
  };

  componentWillUnmount() {
    this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = function () {};
    // delete this.animationStates.out.videoWrapper.onUpdate;
    // delete this.animationStates.idle.videoWrapper.onUpdate;

    window.removeEventListener('resize', this.handleResize);
    this.analytics && this.analytics.cleanup();
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  get videoEnded () {
    return !this.video || this.video.currentTime === this.video.duration;
  }

  handleResize = () => {
    this.animationStates = calculateAnimationStates(this.els);

    // we need to prevent the original cloned video component from updating its video size based on its own container
    if(!this.props.isFullBrowser) {
      this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = this.videoResize;
    }

    if(this.wrapperVisible) {
      animate.set(this.els.videoWrapper, {
        width: this.animationStates.idle.videoWrapper.width,
        height: this.animationStates.idle.videoWrapper.height,
      });
    }

    animate.set(this.video, {clearProps: 'all'});

    this.videoResize();
  };

  videoResize = () => {
    if (window.innerWidth > window.innerHeight) {
      BgCover.BackgroundCover(this.video, this.els.videoWrapper);
    } else {
      animate.set(this.video, {position: 'absolute', top: '50%', y: '-50%', height: 'auto'});
    }
  };

  handleComponentMouseMove = (e) => {
    if(this.props.init) return;

    const mouseCoords = {
      x: e.clientX,
      y: e.clientY
    };

    if(_.includes(['rectangle-button', 'video-controls'], e.target.id)) {
      if(this.hideControlsTimeoutId) {
        clearTimeout(this.hideControlsTimeoutId);
        this.hideControlsTimeoutId = undefined;
      }

      this.lastMouseCoord = mouseCoords;
      return;
    }

    if(this.videoEnded || !this.lastMouseCoord) {
      this.lastMouseCoord = mouseCoords;
      return;
    }

    if(!this.props.useFullControls && !this.videoEnded && !_.isEqual(this.lastMouseCoord, mouseCoords)) {
      this.props.showFullControls();
    }

    if(this.props.isPlaying) {
      clearTimeout(this.hideControlsTimeoutId);
      this.setHideControlsTimeout();
    }
  };

  handleControlsMouseEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();

    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = undefined;
    return false;
  };

  setHideControlsTimeout = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = setTimeout(() => {
      this.props.hideFullControls();
      this.hideControlsTimeoutId = undefined;
    }, 4000);
  };

  handleMetadataLoaded = () => {
    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);
    this.handleResize();
    this.setState({isReady: true});
  };

  handleTimeUpdate = () => {
    this.props.onVideoTimeChange(this.video.currentTime);
  };

  handleVideoPlayPause = () => {
    if(this.props.isPlaying) {
      this.pauseVideo();
      this.props.onVideoPause();
    } else {
      this.playVideo();
      this.props.onVideoPlay();
    }
  };

  handleReplayClick = (e) => {
    this.changeVideoTime(0);

    // Delay the replay by x time due to animations
    setTimeout(this.handleVideoPlayPause, 500);

    tracking.trackEvent({
      category: 'Instructional video player end - Replay CTA',
      label: 'Instructional Video'
    });
  };

  handleVolumeClick = (e) => {
    if(this.props.isMuted) {
      this.props.unmute();
    } else {
      this.props.mute();
    }
  }

  handleCloseClick = () => {
    if(this.props.isFullBrowser) {
      this.props.exitFullBrowser();
    }
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
      } else {
        this.video.play();
      }

      this.setHideControlsTimeout();
    }
  };

  pauseVideo = async () => {
    if(!this.video.paused) {
      !this.props.useFullControls && this.props.showFullControls();

      if(!this.props.isMuted && !detect.isMobile) {
        animate.set(this.video, { volume: 1 });
        await this.mute();
      }

      this.video && this.video.pause();
    }
  };

  animateInControls = () => {
    this.wrapperVisible = true;

    return Promise.all([
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.els.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.els.cornerButton, 0.3, this.animationStates.idle.cornerButton),
    ]);
  };

  animateOutControls = () => {
    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.els.cornerButton, 0.3, this.animationStates.out.cornerButton),
    ];

    this.wrapperVisible = false;

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.els.overlay, 0.3, this.animationStates.out.overlay),
    ]);
  };

  animateInEndOverlay = () => {
    this.wrapperVisible = true;

    return Promise.all([
      animate.to(this.els.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.els.cornerButton, 0.3, this.animationStates.idle.cornerButton),
      animate.to(this.els.overlay, 0.3, this.animationStates.end.overlay),
      animate.to(this.els.endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
    ]);
  };

  animateOutEndOverlay = () => {
    this.stopAnimations();

    this.wrapperVisible = false;

    return Promise.all([
      animate.to(this.els.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.els.endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(this.els.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.els.overlay, 0.3, this.animationStates.out.overlay),
    ]);
  };

  stopAnimations = () => {
    TweenMax.killTweensOf(_.values(this.els));
  }

  handleTouchStart = () => {
    if (!this.userHasInteracted) {
      this.userHasInteracted = true;
      this.playVideo();
      this.props.onVideoPlay();
    }

    this.props.showFullControls();
    this.setHideControlsTimeout();
  };

  handleClick = (e) => {
    if(e.target.id === 'videoOverlay' || e.target.id === this.videoId) {
      this.handleVideoPlayPause();
    }
  };

  handleFullBrowserClick = () => {
    if(this.props.isFullBrowser) {
      this.props.exitFullBrowser(this.props.chapterRoute);
    } else {
      this.context.router.push(this.props.fullBrowserChapterRoute);
    }
  }

  render() {
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';
    const { style, modelSlug, basePath, isFullBrowser, fullBrowserChapterRoute, chapterRoute, className = '', noZoom, init } = this.props;
    const route = (!isFullBrowser ? fullBrowserChapterRoute : chapterRoute) || '/';

    return (
      <div
        ref={ node => this.els.root = node }
        className={
          `video-player instructional-video-player chapter-player ${className} ${noZoom ? 'no-zoom' : ''} ${init ? 'init' : ''} ${this.state.isReady || this.props.isFullBrowser ? ' ready' : ''}`
        }
        style={style}
        onMouseLeave={this.handleComponentMouseMove}
        onMouseMove={this.handleComponentMouseMove}
        onTouchStart={this.handleTouchStart}
        onClick={this.handleClick}
      >
        <div
          className={`chapter-video-poster`}
        >
          <img src={this.props.poster} />
          <PlayButton
            label="Play"
            onPlay={this.state.isMobile ? this.handleTouchStart : this.handleVideoPlayPause}
          />
        </div>
        <div
          ref={ node => this.els.videoWrapper = node }
          className={`video-wrapper`}
        >
          {
            !isFullBrowser
            ? <video
                id={this.videoId}
                preload="auto"
                ref={(node) => this.video = node }
                src={this.props.src}
                onLoadedMetadata={this.handleMetadataLoaded}
                onEnded={this.handleVideoPlayPause}
                onTimeUpdate={this.handleTimeUpdate}
                poster={this.props.poster}
                style={{visibility: this.state.isReady ? 'visible' : 'hidden'}}
              >
              </video>
            : undefined
          }
          <RectangularButton
            id="rectangle-button"
            ref={ node => this.els.cornerButton = findDOMNode(node) }
            onClick={ this.handleCloseClick }
            className="close-button"
            text="Close"
            color="#ffffff"
            backgroundColor="#f7910b"
            hoverBackgroundColor="#de8209"
            svgIcon={CloseSvg}
          />
          {
            this.props.init
            ? <PlayButton
                label="Play"
                onPlay={this.handleVideoPlayPause}
              />
            : null
          }
          <div
            ref={ node => this.els.overlay = node }
            id="videoOverlay"
            className="video-overlay">
          </div>
          <div
            ref={ node => this.els.endingOverlay = node }
            className="end-overlay"
          >
            <div
              className="replay-group replay-group-chapter"
            >
              <PlayButton
                icon={ReplayArrowSvg}
                isReplay={true}
                onPlay={this.handleReplayClick}
                label={`Replay`}
              />
            </div>
          </div>
        </div>
        <TransitionGroup
          component="div"
          className="video-controls-wrapper"
        >
          {
           !this.video || (this.video && this.videoEnded) 
           ? null
             : this.props.useFullControls
             ? <VideoControls
                id="video-controls"
                 key="chapter-player-video-control"
                 isPlaying={this.props.isPlaying}
                 isMuted={this.props.isMuted}
                 currentTime={this.props.currentTime}
                 duration={this.video && this.video.duration}
                 isFullBrowser={this.props.isFullBrowser}

                 onScrubberClick={this.changeVideoTime}
                 onTouchMove={this.handleComponentMouseMove}
                 onTouchEnd={this.setHideControlsTimeout}

                 playPauseButton={this.handleVideoPlayPause}
                 muteButton={this.handleVolumeClick}
                 fullBrowserButton={this.handleFullBrowserClick}
               />
             : <SimpleProgressBar
                key="chapter-player-simple-control"
                currentTime={this.props.currentTime}
                duration={this.props.duration}
               />
          }
        </TransitionGroup>
      </div>
    )
  }
}
