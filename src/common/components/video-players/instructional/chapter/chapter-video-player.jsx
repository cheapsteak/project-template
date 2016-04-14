import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButton from 'common/components/play-button/play-button';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import PlayButtonSvg from 'svgs/icon-play.svg';
import PauseButtonSvg from 'svgs/icon-pause.svg';
import MuteButtonSvg from 'svgs/video-player-mute.svg';
import VolumeButtonSvg from 'svgs/video-player-volume.svg';
import CloseSvg from 'svgs/icon-close.svg';
import EnterFullBrowserButtonSvg from 'svgs/video-player-enter-fullbrowser.svg';
import ExitFullBrowserButtonSvg from 'svgs/video-player-exit-fullbrowser.svg';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import calculateAnimationStates from '../../calculateAnimationStates.js';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';
import BgCover from 'background-cover';
import detect from 'common/utils/detect';

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
      const videoWrapperOnUpdate = () => BgCover.BackgroundCover(this.video, this.els.videoWrapper);

      this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = videoWrapperOnUpdate;
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
    animate.set(this.els.controls, this.animationStates[initialState].controls);
    animate.set(this.refs.controlsUI, this.animationStates[initialState].controlsUI),
    animate.set(this.els.endingOverlay, this.animationStates.out.endingOverlay);

    this.props.isPlaying && this.video && this.video.play();

    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {

    if(this.props.init !== undefined && this.props.init !== nextProps.init) {
      this.animateInControls();
    } else if(this.props.useFullControls !== nextProps.useFullControls && !this.videoEnded) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else {
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
      nextProps.isPlaying ? this.video.play() : this.video.pause();
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
    window.removeEventListener('resize', this.handleResize);
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  get videoEnded () {
    return this.video.currentTime === this.video.duration;
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

    animate.set(this.els.controls, { height: this.animationStates.idle.controls.height });
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
    }, 1500);
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
      this.video.pause();
      this.props.onVideoPause();
    } else {
      this.video.play();
      this.props.onVideoPlay();
    }
  };

  handleReplayClick = (e) => {
    this.changeVideoTime(0);

    // Delay the replay by x time due to animations
    setTimeout(this.handleVideoPlayPause, 500);
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
    animate.to(this.video, 0.8, { volume: 1, ease: Quad.easeOut });
  };

  mute = () => {
    animate.to(this.video, 0.8, { volume: 0, ease: Quad.easeOut });
  };

  animateInControls = () => {
    this.wrapperVisible = true;

    return Promise.all([
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.els.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.els.cornerButton, 0.3, this.animationStates.idle.cornerButton),
      animate.to(this.els.controls, 0.6, this.animationStates.idle.controls),
      animate.to(this.refs.controlsUI, 0.6, this.animationStates.idle.controlsUI),
    ]);
  };

  animateOutControls = () => {
    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.els.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar)
    ];

    this.wrapperVisible = false;

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.els.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.els.controls, 0.6, this.animationStates.out.controls),
      animate.to(this.refs.controlsUI, 0.6, this.animationStates.out.controlsUI),
    ]);
  };

  animateInEndOverlay = () => {
    this.wrapperVisible = true;

    return Promise.all([
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.els.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.els.controls, 0.3, this.animationStates.out.controls),
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
      animate.to(this.els.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar),
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
      this.video.play();
      this.props.onVideoPlay();
    }

    this.props.showFullControls();
    this.setHideControlsTimeout();
  };

  render() {
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';
    const { style, modelSlug, basePath, isFullBrowser, fullBrowserChapterRoute, chapterRoute, className = '', noZoom, init } = this.props;
    const route = (!isFullBrowser ? fullBrowserChapterRoute : chapterRoute) || '/';

    return (
      <div
        ref={ node => this.els.root = node }
        className={
          `video-player instructional-video-player chapter-player ${className} ${noZoom ? 'no-zoom' : ''} ${init ? 'init' : ''}
          `
        }
        style={style}
        onMouseLeave={this.handleComponentMouseMove}
        onMouseMove={this.handleComponentMouseMove}
        onTouchStart={this.handleTouchStart}
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
            !isFullBrowser ?
              <video
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
            ref={ node => this.els.cornerButton = findDOMNode(node) }
            onClick={ this.handleCloseClick }
            className="close-button"
            text="Close"
            color="#ffffff"
            backgroundColor="#f99100"
            hoverBackgroundColor="#f99100"
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
        {/* This is a fix for BgCover making video absolute */}
        </div>
        <div
          ref={ node => this.els.simpleProgressBar = node }
          className="simple-progress-bar"
        >
          <span style={{ width: progressWidth }}></span>
        </div>
        <div
          className="controls"
          ref={ node => this.els.controls = node }
          onMouseEnter={this.handleControlsMouseEnter}
          onMouseMove={ (e) => e.stopPropagation() }
          onTouchMove={ this.handleControlsMouseEnter }
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
              <div className="button-wrapper">
                <div
                  className="button"
                  dangerouslySetInnerHTML={{__html: !this.props.isMuted ? VolumeButtonSvg : MuteButtonSvg }}
                  onClick={this.handleVolumeClick}
                >
                </div>
              </div>
              {
                isFullBrowser
                  ? <div className="button-wrapper">
                  <div
                    className="button fullscreen-button"
                    onClick={ () => this.props.exitFullBrowser(route) }
                  >
                    <div
                      dangerouslySetInnerHTML={{__html: isFullBrowser ? ExitFullBrowserButtonSvg : EnterFullBrowserButtonSvg }}></div>
                  </div>
                </div>
                  : <div className="button-wrapper">
                  <Link
                    className="button fullscreen-button"
                    to={route}
                  >
                    <div
                      dangerouslySetInnerHTML={{__html: isFullBrowser ? ExitFullBrowserButtonSvg : EnterFullBrowserButtonSvg }}></div>
                  </Link>
                </div>
              }
            </div>
            {
              /*
                The duration is put into the store and pass down to the component
                to account for the work around with moving around the video node
              */
            }
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
