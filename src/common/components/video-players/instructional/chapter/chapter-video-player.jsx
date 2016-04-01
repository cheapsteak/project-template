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
import calculateAnimationStates from '../calculateAnimationStates.js';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';

export default class ChapterVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    className: React.PropTypes.string,
    poster: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  els = {};
  videoId = 'target-video';
  cloneId = 'clone-video';
  hideControlsTimeoutId = undefined;

  componentDidMount() {

    this.animationStates = calculateAnimationStates(this.els);

    const initialState = this.props.useFullControls
      ? 'idle'
      : 'out';

    const endingState = this.props.currentTime === this.props.duration && this.props.duration
      ? 'idle'
      : 'out';

    animate.set(this.els.closeButton, this.animationStates[initialState].closeButton);
    animate.set(this.els.overlay, this.animationStates[initialState].overlay);
    animate.set(this.els.videoWrapper, this.animationStates[initialState].videoWrapper);

    animate.set(this.els.controls, this.animationStates[initialState].controls);

    animate.set(this.els.endingOverlay, this.animationStates[endingState].endingOverlay);
    animate.set(this.els.replayButton, this.animationStates[endingState].replayButton);
    animate.set(this.els.replayLabel, this.animationStates[endingState].replayLabel);

    this.props.isPlaying && this.video && this.video.play();
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

    if(this.props.duration && nextProps.duration) {
      if(this.props.currentTime !== this.props.duration &&
        nextProps.currentTime === nextProps.duration) {
        this.animateInEndOverlay();
        this.props.hideFullControls();
      } else if (this.props.currentTime === this.props.duration
        && nextProps.currentTime !== nextProps.duration) {
        this.animateOutEndOverlay();
        this.props.hideFullControls();
      }
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

    return Promise.resolve();
  };

  componentWillLeaveFullBrowser = () => {
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
    this.props.onVideoPause();
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  get videoEnded () {
    return this.video.currentTime === this.video.duration;
  }

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
      this.setHideControlsTimeout();
    }
  };


  setHideControlsTimeout = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = setTimeout(() => {
      this.props.hideFullControls();
      this.hideControlsTimeoutId = undefined;
    }, 1500);
  }

  handleMetadataLoaded = () => {
    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);
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

  animateInControls = () => {
    return Promise.all([
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.els.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.els.closeButton, 0.3, this.animationStates.idle.closeButton),
      animate.to(this.els.controls, 0.3, this.animationStates.idle.controls),
    ]);
  };

  animateOutControls = () => {
    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.els.closeButton, 0.3, this.animationStates.out.closeButton),
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar)
    ];

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.els.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.els.controls, 0.3, this.animationStates.out.controls)
    ]);
  };

  animateInEndOverlay = () => {
    return Promise.all([
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.els.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.els.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.els.replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(this.els.replayLabel, 0.3, this.animationStates.idle.replayLabel),
      animate.to(this.els.closeButton, 0.3, this.animationStates.idle.closeButton),
      animate.to(this.els.overlay, 0.3, this.animationStates.end.overlay),
      animate.to(this.els.endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
    ]);
  };

  animateOutEndOverlay = () => {
    this.stopAnimations();

    return Promise.all([
      animate.to(this.els.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.els.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.els.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.els.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar),
      animate.to(this.els.endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(this.els.replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(this.els.closeButton, 0.3, this.animationStates.out.closeButton),
      animate.to(this.els.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.els.replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  stopAnimations = () => {
    TweenMax.killTweensOf(_.values(this.els));
  }

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
        onMouseMove={this.handleComponentMouseMove}
      >
        <div
          ref={ node => this.els.videoWrapper = node }
          className={`video-wrapper`}
        >
          {
            !isFullBrowser ?
              <video
                id={this.videoId}
                preload="metadata"
                ref={(node) => this.video = node }
                src={this.props.src}
                onLoadedMetadata={this.handleMetadataLoaded}
                onEnded={this.handleVideoPlayPause}
                onTimeUpdate={this.handleTimeUpdate}
                muted={this.props.isMuted}
                poster={this.props.poster}
              >
              </video>
              : undefined
          }
          <Link to={route}>
            <RectangularButton
              ref={ node => this.els.closeButton = findDOMNode(node) }
              className="close-button"
              text="Close"
              color="#ffffff"
              backgroundColor="#f99100"
              hoverBackgroundColor="#f99100"
              svgIcon={CloseSvg}
            />
          </Link>
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
        >
          <span className="label-duration">{secondsToMinutes(this.video && this.video.duration || 0)}</span>
          <div className="control-group">
            <span
              className="button play-button"
              dangerouslySetInnerHTML={{__html: !this.props.isPlaying ? PlayButtonSvg : PauseButtonSvg }}
              onClick={this.handleVideoPlayPause}
            >
            </span>
            <span
              className="button"
              dangerouslySetInnerHTML={{__html: !this.props.isMuted ? VolumeButtonSvg : MuteButtonSvg }}
              onClick={this.handleVolumeClick}
            >
            </span>
            <Link className="button fullbrowser-button" to={route}>
              <span
                dangerouslySetInnerHTML={{__html: isFullBrowser ? ExitFullBrowserButtonSvg : EnterFullBrowserButtonSvg }}
              >
              </span>
            </Link>
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
        <div
          ref={ node => this.els.endingOverlay = node }
          className="end-overlay"
        >
          <div
            className="replay-group replay-group-chapter"
          >
            <div
              ref={ node => this.els.replayButton = node }
              className="replay-button"
              onClick={this.handleReplayClick}
              dangerouslySetInnerHTML={{ __html: ReplayArrowSvg }}
            >
            </div>
            <label
              ref={ node => this.els.replayLabel = node }
              className="replay-label"
            >
              Replay
            </label>
          </div>
        </div>
      </div>
    )
  }
}
