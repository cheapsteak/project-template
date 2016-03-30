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
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';

function calculateAnimationStates (els) {
  const zoomedInRect = els.component.getBoundingClientRect();
  const zoomedOutVideoMargin = 40;
  const zoomedOutRect = {
    width: zoomedInRect.width - zoomedOutVideoMargin * 2,
    height: zoomedInRect.height - zoomedOutVideoMargin * 2
  }

  return {
    out: {
      simpleProgressBar: {
        y: els.simpleProgressBar.offsetHeight
      },
      videoWrapper: {
        delay: 0.3,
        scaleX: 1,
        scaleY: 1,
        cursor: 'none'
      },
      overlay: {
        delay: 0.1,
        display: 'none',
        opacity: 0
      },
      endingOverlay: {
        display: 'none',
        opacity: 0
      },
      replayButton: {
        opacity: 0,
        y: 100
      },
      replayLabel: {
        opacity: 0,
        y: 100
      },
      exploreButton: {
        y: -els.exploreButton.offsetHeight
      },
      circleCTA: {
        opacity: 0,
        y: 50
      },
      controls: {
        y: els.controls.offsetHeight,
        display: 'none'
      }
    },
    idle: {
      simpleProgressBar: {
        delay: 0.5,
        y: 0
      },
      videoWrapper: {
        scaleX: zoomedOutRect.width/zoomedInRect.width,
        scaleY: zoomedOutRect.height/zoomedInRect.height,
        cursor: 'default'
      },
      overlay: {
        display: 'block',
        delay: 0.3,
        opacity: 0.5
      },
      endingOverlay: {
        display: 'block',
        opacity: 1
      },
      replayButton: {
        delay: 0.8,
        opacity: 1,
        y: 0
      },
      replayLabel: {
        delay: 1.2,
        opacity: 1,
        y: 0
      },
      exploreButton: {
        delay: 0.5,
        y: -1
      },
      circleCTA: {
        opacity: 1,
        y: 0
      },
      controls: {
        y: 0,
        display: 'flex'
      }
    },
    end: {
      overlay: {
        display: 'block',
        opacity: 1
      }
    }
  };
};

export default class NarrativeVideoPlayer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  state = {
    showEndingCTA: false
  };

  hideControlsTimeoutId = undefined;

  componentWillReceiveProps(nextProps) {
    const el = findDOMNode(this);

    if(this.props.useFullControls !== nextProps.useFullControls
       && !this.videoEnded && this.lastMouseCoord) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
      }
    }

    if(this.props.circleCTA.text !== nextProps.circleCTA.text)  {
      if(nextProps.circleCTA.text) {
        this.animateCircleCTAText();
      }
    }

    // Video Finished
    if(this.props.duration && nextProps.duration) {
      if(this.props.currentTime !== this.props.duration &&
        nextProps.currentTime === nextProps.duration) {
        clearTimeout(this.hideControlsTimeoutId);
        this.hideControlsTimeoutId = undefined;
        this.animateInEndOverlay();
        this.props.hideFullControls();
      }
    }
  }

  componentDidMount() {
    this.animationStates = calculateAnimationStates(this.refs);

    const initialState = this.props.useFullControls
      ? 'idle'
      : 'out';

    animate.set(this.refs.exploreButton, this.animationStates[initialState].exploreButton);
    animate.set(this.refs.overlay, this.animationStates[initialState].overlay);
    animate.set(this.refs.videoWrapper, this.animationStates[initialState].videoWrapper);
    animate.set(this.refs.circleCTA, this.animationStates[initialState].circleCTA);
    animate.set(this.refs.controls, this.animationStates[initialState].controls);

    animate.set(this.refs.endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(this.refs.replayButton, this.animationStates.out.replayButton);
    animate.set(this.refs.replayLabel, this.animationStates.out.replayLabel);

    this.props.isPlaying && this.video.play();

    if(!this.props.isPlaying) {
      if(!this.props.useFullControls) {
        this.props.showFullControls();
      }
    }

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = undefined;
    this.props.hideFullControls();
    window.removeEventListener('resize', this.handleResize);
  }

  get videoEnded () {
    return this.video.currentTime === this.video.duration;
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  getCurrentChapter = () => {
    const { timeline, currentTime } = this.props;
    const duration = this.video.duration;
    let currentChapter = {};

    timeline.forEach((chapter, i) => {
      let upperRange = (timeline[i+1] || {}).time || duration;
      if(chapter.time <= currentTime && chapter.time < upperRange) {
        currentChapter = chapter;
      }
    });

    return currentChapter;
  };


  /************************/
  /*     Animatations     */
  /************************/

  animateInControls = () => {
    const buttons = this.refs.component.querySelectorAll('.button');
    const dots = this.refs.component.querySelectorAll('.dot');

    this.stopAnimations();
    animate.staggerFrom(dots, 0.3, { delay: 0.5, opacity: 0 }, 0.2);

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.refs.exploreButton, 0.3, this.animationStates.idle.exploreButton),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.idle.circleCTA),
      animate.to(this.refs.controls, 0.3, this.animationStates.idle.controls),
      _.map(buttons, (button) => { animate.fromTo(button, 0.3, { y: 50 }, { delay: 0.3, y: 0})})
    ]);
  }

  animateOutControls = () => {
    this.stopAnimations();

    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.exploreButton, 0.3, this.animationStates.out.exploreButton),
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

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.idle.replayLabel),
      animate.to(this.refs.exploreButton, 0.3, this.animationStates.out.exploreButton),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.out.circleCTA),
      animate.to(this.refs.overlay, 0.3, this.animationStates.end.overlay),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
        .then(() => this.setState({ showEndingCTA: true }))
    ]);
  };

  animateOutEndOverlay = () => {
    this.setState({ showEndingCTA: false });
    this.stopAnimations();

    return Promise.all([
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(this.refs.exploreButton, 0.3, this.animationStates.out.exploreButton),
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
  };

  handleMetadataLoaded = () => {
    this.video.currentTime = this.props.currentTime;
    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);
  };

  handleTimeUpdate = () => {
    const currentChapter = this.getCurrentChapter();

    if(this.props.circleCTA.text !== currentChapter.ctaText) {
      this.props.setCircleCTA({
        text: currentChapter.ctaText || '',
        route: currentChapter.route || ''
      });
    }

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
    const times = this.props.timeline.map(point => point.time).reverse();
    const newTime =  _.find(times, (time) => time < currentTime) || 0;

    this.video.currentTime = newTime;
  };

  handleNextClick = (e) => {
    const currentTime = this.video.currentTime;
    const times = this.props.timeline.map(point => point.time);

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

    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = setTimeout(() => {
      if(this.props.isPlaying) {
        this.props.hideFullControls();
      }
      this.hideControlsTimeoutId = undefined;
    }, 1500);

    this.lastMouseCoord = mouseCoords;
  };

  handleReplayClick = (e) => {
    e.stopPropagation();

    this.changeVideoTime(0);
    this.animateOutEndOverlay();
    this.props.hideFullControls();
    this.video.play();
  };

  handleOverlayClick = (e) => {
    if(e.target.id === 'videoOverlay') {
        this.props.hideFullControls();
        !this.props.isPlaying && this.video.play();
        clearTimeout(this.hideControlsTimeoutId);
    }
  };

  handleVolumeClick = (e) => {
    if(this.props.isMuted) {
      this.props.unmute();
    } else {
      this.props.mute();
    }
  };


  render() {
    const { style, circleCTA, className } = this.props;
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';

    return (
      <div
        ref="component"
        className="video-player narrative-video-player ${className || ''}"
        style={style}
        onMouseMove={this.handleComponentMouseMove}
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
              ref={ node => this.refs.exploreButton = findDOMNode(node) }
              className="explore-button"
              text="Chapter Menu"
              color="#ffffff"
              backgroundColor="#EB9729"
              hoverBackgroundColor="#EB9729"
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
          <Link ref={node => this.refs.circleCTA = findDOMNode(node)} className="circle-cta" to={circleCTA.route}>
            <div className="circle-cta-text">
              <label className="stagger-cta">Explore</label>
              <h3 className="stagger-cta">{circleCTA.text}</h3>
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
                  route="/"
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
            <span
              className="button play-button"
              dangerouslySetInnerHTML={{__html: !this.props.isPlaying ? PlayButtonSvg : PauseButtonSvg }}
              onClick={this.handleVideoPlayPause}
            >
            </span>
            <span
              className="button"
              dangerouslySetInnerHTML={{__html: BackButtonSvg}}
              onClick={this.handlePrevClick}
            >
            </span>
            <span
              className="button"
              dangerouslySetInnerHTML={{__html: ForwardButtonSvg}}
              onClick={this.handleNextClick}
            >
            </span>
            <span
              className="button"
              dangerouslySetInnerHTML={{__html: !this.props.isMuted ? VolumeButtonSvg : MuteButtonSvg }}
              onClick={this.handleVolumeClick}
            >
            </span>
          </div>
          <Timeline
            currentTime={this.props.currentTime}
            duration={ this.video && this.video.duration || 0 }
            onTimeChange={this.changeVideoTime}
            items={this.props.timeline}
          />
        </div>
      </div>
    )
  }
}
