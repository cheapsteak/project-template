import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from 'svgs/icon-play.svg';
import PauseButtonSvg from 'svgs/icon-pause.svg';
import BackButtonSvg from 'svgs/video-back-button.svg';
import ForwardButtonSvg from 'svgs/video-forward-button.svg';
import IconExplore from 'svgs/icon-explore.svg';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import MuteButtonSvg from 'svgs/video-player-mute.svg';
import VolumeButtonSvg from 'svgs/video-player-volume.svg';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import TransitionGroup from 'react-transition-group-plus';
import animate from 'gsap-promise';
import _ from 'lodash';
import { Link } from 'react-router';
import ImageCard from '../components/image-card/image-card.jsx';
import calculateAnimationStates from '../calculateAnimationStates.js';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';
import BgCover from 'background-cover';
import detect from 'common/utils/detect';

export default class NarrativeVideoPlayer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  // Local Storage Ids
  static timeStorageId = 'narrative-video-time';
  static muteStorageId = 'narrative-video-mute-status';

  state = {
    showEndingCTA: false
  };

  hideControlsTimeoutId = undefined;
  setLocalStorageIntervalId = undefined;
  wrapperVisible = false;

  componentWillReceiveProps(nextProps) {
    const el = findDOMNode(this);

    if(this.props.useFullControls !== nextProps.useFullControls
       && !this.videoEnded && (this.lastMouseCoord || detect.isTablet)) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
      }
    }

    if(this.props.currentChapter.title !== nextProps.currentChapter.title)  {
      if(nextProps.currentChapter.title) {
        this.animateCircleCTAText();
      }
    }

    // Video Finished
    if(this.props.duration && nextProps.duration &&
      this.props.currentTime !== nextProps.currentTime) {
      if(this.props.currentTime !== this.props.duration &&
        nextProps.currentTime >= nextProps.duration) {
        clearTimeout(this.hideControlsTimeoutId);
        this.hideControlsTimeoutId = undefined;
        this.animateInEndOverlay();
        this.props.hideFullControls();
      }
    }

    if(this.props.isPlaying !== nextProps.isPlaying) {
      nextProps.isPlaying ? this.video.play() : this.video.pause();
    }
  }

  componentDidMount() {
    this.animationStates = calculateAnimationStates(this.refs);

    const initialState = this.props.useFullControls
      ? 'idle'
      : 'out';

    animate.set(this.refs.cornerButton, this.animationStates[initialState].cornerButton);
    animate.set(this.refs.overlay, this.animationStates[initialState].overlay);
    animate.set(this.refs.videoWrapper, this.animationStates[initialState].videoWrapper);
    animate.set(this.refs.circleCTA, this.animationStates[initialState].circleCTA);
    animate.set(this.refs.controls, this.animationStates[initialState].controls);

    animate.set(this.refs.endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(this.refs.replayButton, this.animationStates.out.replayButton);
    animate.set(this.refs.replayLabel, this.animationStates.out.replayLabel);

    if(!this.props.isPlaying) {
      if(!this.props.useFullControls) {
        this.props.showFullControls();
      }
    }

    if (detect.isTablet && !this.video.paused) { // TODO: make sure no double click needed when coming from other pages0
      this.userInteractionHappened = true;
    } else {
      this.props.isPlaying && this.video.play();
    }

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    clearTimeout(this.hideControlsTimeoutId);
    this.props.hideFullControls();
    window.removeEventListener('resize', this.handleResize);
    this.clearTimeStorageInterval();
  }

  get videoEnded () {
    return this.video.currentTime === this.video.duration;
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  setTimeStorageInterval = () => {
    this.localStorageIntervalId = setInterval(() => {
      localStorage.setItem(NarrativeVideoPlayer.timeStorageId, this.video.currentTime);
    }, 1000);
  };

  clearTimeStorageInterval = () => {
    clearInterval(this.localStorageIntervalId);
    this.localStorageIntervalId = undefined;
  };

  /************************/
  /*     Animatations     */
  /************************/

  animateInControls = () => {
    const buttons = this.refs.root.querySelectorAll('.button');
    const dots = this.refs.root.querySelectorAll('.dot');

    this.wrapperVisible = true;

    this.stopAnimations();
    animate.staggerFrom(dots, 0.1, { delay: 0.5, opacity: 0 }, 0.1);

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.idle.cornerButton),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.idle.circleCTA),
      animate.to(this.refs.controls, 0.3, this.animationStates.idle.controls),
      _.map(buttons, (button) => { animate.fromTo(button, 0.3, { y: 50 }, { delay: 0.3, y: 0})})
    ]);
  }

  animateOutControls = () => {
    this.stopAnimations();
    this.wrapperVisible = false;

    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar)
    ];

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.out.circleCTA),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  animateCircleCTAText = () => {
    const el = findDOMNode(this);
    const ctaEls = el.querySelectorAll('.stagger-cta');
    return animate.staggerFromTo(ctaEls, 0.3, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.2);
  };

  animateInEndOverlay = () => {
    this.stopAnimations();
    this.wrapperVisible = true;

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.idle.replayLabel),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.out.circleCTA),
      animate.to(this.refs.overlay, 0.3, this.animationStates.end.overlay),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
        .then(() => this.setState({ showEndingCTA: true }))
    ]);
  };

  animateOutEndOverlay = () => {
    this.setState({ showEndingCTA: false });
    this.stopAnimations();
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
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  stopAnimations = () => {
    TweenMax.killTweensOf(_.values(this.refs));
  };


  /************************/
  /*       Handlers       */
  /************************/

  handleResize = () => {
    this.animationStates = calculateAnimationStates(this.refs);

    animate.set(this.refs.controls, { height: this.animationStates.idle.controls.height });

    if(this.wrapperVisible) {
      animate.set(this.refs.videoWrapper, {
        scaleX: this.animationStates.idle.videoWrapper.scaleX,
        scaleY: this.animationStates.idle.videoWrapper.scaleY,
      });
    }

    this.videoResize();
  };

  handleMetadataLoaded = () => {
    const storedTime = parseFloat(localStorage.getItem(NarrativeVideoPlayer.timeStorageId));
    const isMuted = localStorage.getItem(NarrativeVideoPlayer.muteStorageId);

    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);

    if(typeof storedTime === 'number' && !isNaN(storedTime) && storedTime !== this.video.duration) {
      this.changeVideoTime(storedTime)
    }

    if(isMuted === "true") {
      this.props.mute();
    } else {
      this.props.unmute();
    }

    this.videoResize();
    this.setTimeStorageInterval();
  };

  videoResize = () => {
    animate.set(this.video, {clearProps: 'all'});

    if (window.innerWidth > window.innerHeight) {
      BgCover.BackgroundCover(this.video, this.refs.videoWrapper);
    } else {
      animate.set(this.video, {position: 'absolute', top: '50%', y: '-50%', height: 'auto'});
    }
  };

  handleTimeUpdate = () => {
    const currentChapter = this.props.currentChapter;
    this.props.onVideoTimeChange(this.video.currentTime);
  };

  handleVideoPlayPause = () => {
    if(this.props.isPlaying) {
      this.video.pause();
      clearTimeout(this.hideControlsTimeoutId);
    } else {
      this.video.play();
    }
  };

  handlePrevClick = (e) => {
    const currentTime = this.props.currentTime;
    const times = this.props.chapters.map(point => point.time).reverse();
    const newTime =  _.find(times, (time) => time < currentTime) || 0;

    this.video.currentTime = newTime;
  };

  handleNextClick = (e) => {
    const currentTime = this.video.currentTime;
    const times = this.props.chapters.map(point => point.time);

    // newTime === video.duration will cause a replay
    const newTime =  _.find(times, (time) => time > currentTime) || this.video.duration - 0.001;

    this.video.currentTime = newTime;
  };

  handleMouseEnterControls = (e) => {
    clearTimeout(this.hideControlsTimeoutId);
  };

  handleComponentMouseMove = (e) => {
    const mouseCoords = {
      x: e.clientX,
      y: e.clientY
    };

    if(this.videoEnded || !this.lastMouseCoord) {
      this.lastMouseCoord = mouseCoords;
      return;
    }

    if(!this.props.useFullControls && !_.isEqual(this.lastMouseCoord, mouseCoords)) {
      this.props.showFullControls();
    }

    this.setHideControlsTimeout();

    this.lastMouseCoord = mouseCoords;
  };

  setHideControlsTimeout = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = setTimeout(() => {
      if(this.props.isPlaying) {
        this.props.hideFullControls();
      }
      this.hideControlsTimeoutId = undefined;
    }, detect.isTablet? 3000: 1500);
  };

  handleReplayClick = (e) => {
    e.stopPropagation();

    this.changeVideoTime(0);
    this.animateOutEndOverlay();
    this.props.hideFullControls();
    this.video.play();
  };

  handleOverlayClick = (e) => {
    if (detect.isTablet) return;

    if(e.target.id === 'videoOverlay') {
      this.props.hideFullControls();
      !this.props.isPlaying && this.video.play();
      clearTimeout(this.hideControlsTimeoutId);
    }
  };

  handleVolumeClick = (e) => {
    if(this.props.isMuted) {
      localStorage.setItem(NarrativeVideoPlayer.muteStorageId, false);
      this.props.unmute();
    } else {
      localStorage.setItem(NarrativeVideoPlayer.muteStorageId, true);
      this.props.mute();
    }
  };

  handleTouchStart = () => {
    if (this.userInteractionHappened) {
      this.props.showFullControls();
      this.setHideControlsTimeout();
    } else {
      this.userInteractionHappened = true;
      this.video.play();
      this.props.onVideoPlay();
    }
  };

  render() {
    const { style, className } = this.props;
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';

    return (
      <div
        ref="root"
        className="video-player narrative-video-player ${className || ''}"
        style={style}
        onMouseMove={this.handleComponentMouseMove}
        onTouchStart={this.handleTouchStart}
      >
        <div
          ref="videoWrapper"
          className="video-wrapper"
        >
          <div
            id="videoOverlay"
            ref="overlay"
            className="video-overlay"
            onClick={this.handleOverlayClick}
          >
          </div>
          <Link to="/grid">
            <RectangularButton
              ref={ node => this.refs.cornerButton = findDOMNode(node) }
              className="explore-button"
              text="Chapter Menu"
              color="#ffffff"
              backgroundColor="#f99100"
              hoverBackgroundColor="#f99100"
              svgIcon={IconExplore}
            />
          </Link>
          <video
            ref={(node) => this.video = node }
            src={this.props.src}
            preload="metadata"
            autoPlay={true}
            onLoadedMetadata={this.handleMetadataLoaded}
            onTimeUpdate={this.handleTimeUpdate}
            onPlay={this.props.onVideoPlay}
            onPause={this.props.onVideoPause}
            muted={this.props.isMuted}
          >
          </video>
          <Link
            ref={node => this.refs.circleCTA = findDOMNode(node)}
            className="circle-cta"
            to={`/chapters/${this.props.currentChapter.slug}`}
          >
            <div className="circle-cta-text">
              <label className="stagger-cta">Discover More:</label>
              <h3 className="stagger-cta">{this.props.currentChapter.title}</h3>
            </div>
          </Link>
          <div
            ref="endingOverlay"
            className="end-overlay"
          >
            <TransitionGroup
              component="div"
              className="route-content-wrapper full-height"
            >
            {
              this.state.showEndingCTA
              ? <ImageCard
                  gridButton={true}
                  key={'currentId'}
                  label="See All"
                  title="Chapters"
                  route="/grid"
                  image={`${ASSET_PATH}/narrative-ending-card.jpg`}
                />
              : undefined
            }
            </TransitionGroup>
            <div
              className="replay-group replay-group-grid"
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
        <div
          ref="simpleProgressBar"
          className="simple-progress-bar"
        >
          <span style={{ width: progressWidth }}></span>
        </div>
        <div
          ref="controls"
          className="controls"
          onMouseEnter={ this.handleMouseEnterControls }
          onMouseMove={ e => e.stopPropagation() }
          onMouseLeave={ this.handleMouseLeaveControls }
        >
          <span className="label-duration">{secondsToMinutes(this.video && this.video.duration || 0)}</span>
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
                dangerouslySetInnerHTML={{__html: BackButtonSvg}}
                onClick={this.handlePrevClick}
              >
              </div>
            </div>
            <div className="button-wrapper">
              <div
                className="button"
                dangerouslySetInnerHTML={{__html: ForwardButtonSvg}}
                onClick={this.handleNextClick}
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
          </div>
          <Timeline
            currentTime={this.props.currentTime}
            duration={ this.video && this.video.duration || 0 }
            onTimeChange={this.changeVideoTime}
            items={this.props.chapters}
          />
        </div>
      </div>
    )
  }
}
