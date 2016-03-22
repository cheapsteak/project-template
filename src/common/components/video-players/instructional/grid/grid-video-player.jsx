import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from 'svgs/video-player-play.svg';
import PauseButtonSvg from 'svgs/video-player-pause.svg';
import BackButtonSvg from 'svgs/video-back-button.svg';
import ForwardButtonSvg from 'svgs/video-forward-button.svg';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import CloseSvg from 'svgs/video-player-close.svg';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import ImageCard from '../../components/image-card/image-card.jsx';
import VideoCard from '../../components/video-card/video-card.jsx';
import HoverCard from './grid-hover-card/grid-hover-card.jsx';

function calculateAnimationStates (els) {
  const zoomedInRect = els.root.getBoundingClientRect();
  const zoomedOutVideoMargin = 40;
  const zoomedOutRect = {
    width: zoomedInRect.width - zoomedOutVideoMargin * 2,
    height: zoomedInRect.height - zoomedOutVideoMargin * 2
  };

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
      overlay: {
        opacity: 0
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
      closeButton: {
        y: -els.closeButton.offsetHeight
      },
      moreAboutCTA: {
        opacity: 0
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
        scaleY: zoomedOutRect.height/zoomedInRect.height
      },
      overlay: {
        opacity: 0.4
      },
      endingOverlay: {
        display: 'block',
        opacity: 0.99
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
      closeButton: {
        delay: 0.5,
        y: -1
      },
      moreAboutCTA: {
        delay: 0.3,
        opacity: 1
      },
      controls: {
        y: 0,
        display: 'flex'
      }
    },
    end: {
      overlay: {
        opacity: 1
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

    if(!this.props.isPlaying) {
      animate.set(videoWrapper, this.animationStates.idle.videoWrapper);

      if(!this.props.useFullControls) {
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

    // Video Finished
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
        // Video going to replay
        this.clearCountdown();
        this.animateOutEndOverlay();
        this.props.hideFullControls();
      }
    }

    if(this.props.useFullControls !== nextProps.useFullControls && !this.videoEnded) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.nextVideoIntervalId);
    clearTimeout(this.hideControlsTimeoutId);
    this.video.pause();
    this.props.onVideoPause();
  }

  get videoEnded () {
    return this.video.currentTime === this.video.duration;
  }

  handleMetadataLoaded = () => {
    this.video.currentTime = this.props.currentTime;
    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);
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

  handleComponentMouseMove = () => {
    if(!this.props.useFullControls && !this.videoEnded) {
      this.props.showFullControls();
    }

    if(this.props.isPlaying) {
      this.setHideControlsTimeout();
    }
  };

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  clearCountdown = () => {
    clearInterval(this.nextVideoIntervalId);
    this.nextVideoIntervalId = undefined;
    this.setState({ nextVideoTimeLeft: 15 });
  };

  setHideControlsTimeout = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = setTimeout(() => {
      this.props.hideFullControls();
      this.hideControlsTimeoutId = undefined;
    }, 3000);
  }

  animateInControls = () => {
    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.overlay, 0.3, this.animationStates.idle.overlay),
      animate.to(this.refs.closeButton, 0.3, this.animationStates.idle.closeButton),
      animate.to(this.refs.controls, 0.3, this.animationStates.idle.controls),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.idle.moreAboutCTA)
    ]);
  };

  animateOutControls = () => {
    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.closeButton, 0.3, this.animationStates.out.closeButton),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar)
    ];

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls)
    ]);
  };

  animateInEndOverlay = () => {
    this.stopAnimations();

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.idle.replayLabel),
      animate.to(this.refs.closeButton, 0.3, this.animationStates.idle.closeButton),
      animate.to(this.refs.overlay, 0.3, this.animationStates.end.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
        .then(() => this.setState({ showEndingCTA: true }))
    ]);
  };

  animateOutEndOverlay = () => {
    this.stopAnimations();
    this.setState({ showEndingCTA: false });

    return Promise.all([
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(this.refs.replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(this.refs.closeButton, 0.3, this.animationStates.out.closeButton),
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.moreAboutCTA, 0.3, this.animationStates.out.moreAboutCTA),
      animate.to(this.refs.replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  stopAnimations = () => {
    TweenMax.killTweensOf(_.map(this.refs, val => val));
  }


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
                <ImageCard
                  key={'currentId'}
                  label="Learn More"
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
          <button ref="closeButton" className="close-button">
            <span dangerouslySetInnerHTML={{ __html: CloseSvg }}></span>
            <div>Close</div>
          </button>
          <Link to={this.props.chapterRoute || '/'}>
            <div ref="moreAboutCTA" className="more-about-cta">
              <span className="circle-button">+</span>{`More About ${this.props.title}`}
            </div>
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
        >
          <div className="control-group">
            <span
              className="button"
              dangerouslySetInnerHTML={{__html: !this.props.isPlaying ? PlayButtonSvg : PauseButtonSvg }}
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
      </div>
    )
  }
}
