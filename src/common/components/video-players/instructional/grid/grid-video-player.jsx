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
import HoverCard from './grid-hover-card/grid-hover-card.jsx';

function calculateAnimationStates (els) {
  const zoomedInRect = els.root.getBoundingClientRect();
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
      simpleProgressBar: {
        y: 0
      },
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
  showFullControls = undefined;

  state = {
    showEndingCTA: false,
    nextVideoTimeLeft: 15,
    showHoverCard: undefined
  };

  componentWillMount() {
    this.props.onVideoTimeChange(0);
  }

  componentDidMount() {
    const { endingOverlay, videoWrapper, replayButton, replayLabel, simpleProgressBar, controls } = this.refs;
    this.animationStates = calculateAnimationStates(this.refs);
    animate.set(endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(replayButton, this.animationStates.out.replayButton);
    animate.set(replayLabel, this.animationStates.out.replayLabel);
console.log(this.props);
    
    if(!this.props.isPlaying) {
      animate.set(videoWrapper, this.animationStates.idle.videoWrapper);

      if(!this.props.isFullControls) {
        this.props.showFullControls();
      } else {

        // Potential Issue: When video is not loaded yet, the timeline dots will not appear yet.
        // This can cause the dots to appear instantly during the animate in (instead of the 
        // staggered animation)
        this.animateInControls();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { endingOverlay, videoWrapper, replayButton, replayLabel, simpleProgressBar, controls } = this.refs;

    if(this.props.duration && nextProps.duration) {
      if(this.props.currentTime !== this.props.duration && 
        nextProps.currentTime === nextProps.duration) {
        this.animateInEndOverlay();
        this.props.hideFullControls();
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
        this.animateOutEndOverlay();
      }
    }

    if(this.props.isFullControls !== nextProps.isFullControls) {
      if(nextProps.isFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
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

  handleMouseEnterPrevButton = () => {
    this.state.showHoverCard !== 'prev' && this.setState({ showHoverCard: 'prev' });
  }

  handleMouseEnterNextButton = () => {
    this.state.showHoverCard !== 'next' && this.setState({ showHoverCard: 'next' });
  }

  handleMouseLeaveNextPrevButtons = () => {
    this.setState({ showHoverCard: undefined });
  }

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
    const { videoWrapper, endingOverlay, replayButton, replayLabel, controls, simpleProgressBar } = this.refs;

    return Promise.all([
      animate.to(simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
        .then(() => this.setState({ showEndingCTA: true })),
      animate.to(replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(replayLabel, 0.3, this.animationStates.idle.replayLabel)
    ]);
  };

  animateOutEndOverlay = () => {
    const { videoWrapper, endingOverlay, replayButton, replayLabel, controls, simpleProgressBar } = this.refs;

    this.setState({ showEndingCTA: false });
    return Promise.all([
      animate.to(simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar),
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
    const { style, modelSlug, prevVideo, nextVideo } = this.props;
    const tempPauseStyle = this.props.isPlaying ? {fill: 'black'} : undefined;
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';
    const prevVideoRoute = prevVideo ? prevVideo.gridRoute : '/';
    const nextVideoRoute = nextVideo ? nextVideo.gridRoute : '/';

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
          ref="simpleProgressBar"
          className="simple-progress-bar"
        >
          <span style={{ width: progressWidth }}></span>
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
            <div
              className="button-wrapper"
              onMouseEnter={this.handleMouseEnterPrevButton}
              onMouseLeave={this.handleMouseLeaveNextPrevButtons}
            >
              <Link to={prevVideoRoute}>
                <span
                  className="button"
                  dangerouslySetInnerHTML={{__html: BackButtonSvg}}
                  onClick={this.handlePrevClick}
                >
                </span>
              </Link>
              <TransitionGroup>
                  {
                    this.state.showHoverCard === 'prev' && prevVideo
                    ? <HoverCard
                        key="prev-card"
                        src={prevVideo.hoverCardImage}
                        ctaText={prevVideo.title}
                        label="Previous"
                      />
                    : undefined
                  }
              </TransitionGroup>
            </div>
            <div
              className="button-wrapper"
              onMouseEnter={this.handleMouseEnterNextButton}
              onMouseLeave={this.handleMouseLeaveNextPrevButtons}
            >
              <Link to={nextVideoRoute}>
                <span
                  className="button"
                  dangerouslySetInnerHTML={{__html: ForwardButtonSvg}}
                  onClick={this.handleNextClick}
                >
                </span>
              </Link>
              <TransitionGroup>
                {
                  this.state.showHoverCard === 'next' && nextVideo
                  ? <HoverCard
                      key="next-card"
                      src={nextVideo.hoverCardImage}
                      ctaText={nextVideo.title}
                      label="Next"
                    />
                  : undefined
                }
              </TransitionGroup>
            </div>
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
                title={this.props.title}
                route={this.props.chapterRoute}
                image={this.props.endingCardImage}
              />
              ,
              <NextVideoCard
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
    )
  }
}
