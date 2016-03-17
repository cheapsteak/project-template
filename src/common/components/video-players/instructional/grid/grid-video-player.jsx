import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from '../../../../../assets/video-play-button.svg';
import BackButtonSvg from '../../../../../assets/video-back-button.svg';
import ForwardButtonSvg from '../../../../../assets/video-forward-button.svg';
import ReplayArrowSvg from '../../../../../assets/replay-arrow.svg';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import LearnMoreCard from './learn-more-card/learn-more-card.jsx';
import NextVideoCard from './next-video-card/next-video-card.jsx';

function calculateAnimationStates (els) {
  const zoomedInRect = els.root.getBoundingClientRect();
  const zoomedOutVideoMargin = 40;
  const zoomedOutRect = {
    width: zoomedInRect.width - zoomedOutVideoMargin * 2,
    height: zoomedInRect.height - zoomedOutVideoMargin * 2
  }

  return {
    out: {
      videoWrapper: {
        delay: 0.3,
        scaleX: 1,
        scaleY: 1
      },
      endingOverlay: {
        delay: 0.1,
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
      controls: {
        y: els.controls.offsetHeight
      }
    },
    idle: {
      videoWrapper: {
        scaleX: zoomedOutRect.width/zoomedInRect.width,
        scaleY: zoomedOutRect.height/zoomedInRect.height
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
        delay: 1.4,
        opacity: 1,
        y: 0
      },
      controls: {
        y: 0
      }
    }
  };
};

export default class GridVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    className: React.PropTypes.string,
    poster: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  nextVideoIntervalId = undefined;
  hideControlsTimeoutId = undefined;

  state = {
    showEndingCTA: false,
    nextVideoTimeLeft: 15,
  };

  componentWillMount() {
    this.props.onVideoTimeChange(0);
  }

  componentDidMount() {
    const { endingOverlay, replayButton, replayLabel } = this.refs;
    this.animationStates = calculateAnimationStates(this.refs);
    animate.set(endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(replayButton, this.animationStates.out.replayButton);
    animate.set(replayLabel, this.animationStates.out.replayLabel);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.duration && nextProps.duration) {
      if(this.props.currentTime !== this.props.duration && 
        nextProps.currentTime === nextProps.duration) {
        this.animateInEndOverlay();
        this.animateOutControls();
        this.clearCountdown();
        this.nextVideoIntervalId = setInterval(() => {
          if(this.state.nextVideoTimeLeft > 0) {
            this.setState({ nextVideoTimeLeft: this.state.nextVideoTimeLeft - 1 }) 
          } else {
            this.clearCountdown();
            /*
            
              GO TO NEXT VIDEO
              
              this.context.router.push(this.props.nextVideoRoute);

             */
          }
        }, 1000);
      } else if (this.props.currentTime === this.props.duration
        && nextProps.currentTime !== nextProps.duration) {
        this.clearCountdown();
        this.animateOutEndOverlay()
        .then(this.animateInControls);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.nextVideoIntervalId);
    this.video.pause();
    this.props.onVideoPause();
  }

  handleMetadataLoaded = () => {
    this.video.currentTime = this.props.currentTime;
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

  handlePrevClick = (e) => {

  };

  handleNextClick = (e) => {

  };

  handleReplayClick = (e) => {
    this.changeVideoTime(0);

    // Delay the replay by x time due to animations
    setTimeout(this.handleVideoPlayPause, 1000);
  };

  handleEnded = (e) => {
    this.handleVideoPlayPause();
  };

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  animateInControls = () => {
    return animate.to(this.refs.controls, 0.3, this.animationStates.idle.controls);
  };

  animateOutControls = () => {
    return animate.to(this.refs.controls, 0.3, this.animationStates.out.controls);
  };

  animateInEndOverlay = () => {
    const { videoWrapper, endingOverlay, replayButton, replayLabel, controls } = this.refs;

    return Promise.all([
      animate.to(videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
        .then(() => this.setState({ showEndingCTA: true })),
      animate.to(replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(replayLabel, 0.3, this.animationStates.idle.replayLabel)
    ]);
  };

  animateOutEndOverlay = () => {
    const { videoWrapper, endingOverlay, replayButton, replayLabel, controls } = this.refs;

    this.setState({ showEndingCTA: false });
    return Promise.all([
      animate.to(videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  clearCountdown = () => {
    clearInterval(this.nextVideoIntervalId);
    this.nextVideoIntervalId = undefined;
    this.setState({ nextVideoTimeLeft: 15 });
  };

  render() {
    const { style, modelSlug } = this.props;
    const tempPauseStyle = this.props.isPlaying ? {fill: 'black'} : undefined;

    return (
      <div
        ref="root"
        className={`instructional-video-player grid-player ${this.props.className}`}
        style={style}
      >
        <div
          ref="videoWrapper"
          className="video-wrapper"
        >
          <video
            id={this.videoId}
            preload="metadata"
            ref={(node) => this.video = node }
            src={this.props.src}
            onLoadedMetadata={this.handleMetadataLoaded}
            onEnded={this.handleEnded}
            onTimeUpdate={this.handleTimeUpdate}
            poster={this.props.poster}
          >
          </video>
        </div>
        <div
         ref="controls"
         className="controls"
        >
          <div className="control-group">
            <span
              className="button"
              style={tempPauseStyle}
              dangerouslySetInnerHTML={{__html: PlayButtonSvg}}
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
          </div>
          <Timeline
            currentTime={this.props.currentTime || 0}
            duration={this.props.duration || 0}
            onTimeChange={this.changeVideoTime}
            items={[]}
          />
        </div>
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
            ? [ 
              <LearnMoreCard
                key={'currentId'}
                title={this.props.chapterName}
                route={this.props.chapterRoute}
                image={this.props.chapterCardImage}
              />
              ,
              <NextVideoCard
                key={'nextVideoId'}
                title={this.props.nextVideo.chapterName}
                route={this.props.nextVideo.videoRoute}
                video={this.props.nextVideo.src}
                timeLeft={this.state.nextVideoTimeLeft}
              />
            ]
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
    )
  }
}
