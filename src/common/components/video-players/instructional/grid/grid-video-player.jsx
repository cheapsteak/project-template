import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from '../../../../../assets/video-play-button.svg';
import BackButtonSvg from '../../../../../assets/video-back-button.svg';
import ForwardButtonSvg from '../../../../../assets/video-forward-button.svg';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import LearnMoreCard from './learn-more-card/learn-more-card.jsx';
import NextVideoCard from './next-video-card/next-video-card.jsx';

function calculateAnimationStates (els) {
  const tileOffsetX = 20;
  const tileOffsetY = 60;
  const centerX = window.innerWidth/2;
  const centerY = window.innerHeight/2;
  const outOffsetY = 100;
    
  return {
    out: {
      endingOverlay: {
        display: 'none',
        opacity: 0
      },
      replayButton: {
        x: centerX - els.replayButton.offsetWidth/2,
        y: window.innerHeight/1.25 - els.replayButton.offsetHeight/2 + outOffsetY
      },
    },
    idle: {
      endingOverlay: {
        display: 'block',
        opacity: 1
      },
      replayButton: {
        y: window.innerHeight/1.25 - els.replayButton.offsetHeight/2
      }
    }
  };
};

export default class GridVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    poster: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  nextVideoIntervalId = undefined;

  state = {
    showEndingCTA: false,
    nextVideoTimeLeft: 15,
  };

  componentDidMount() {
    const { endingOverlay, replayButton } = this.refs;
    this.animationStates = calculateAnimationStates(this.refs);

    animate.set(endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(replayButton, this.animationStates.out.replayButton);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.duration && nextProps.currentTime === nextProps.duration) {
      this.animateInEndOverlay();
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

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

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

  handleEnded = (e) => {
    this.handleVideoPlayPause();
    this.animateInEndOverlay();
  };

  animateInEndOverlay = () => {
    const { endingOverlay, replayButton, frontOverlay, backOverlay } = this.refs;

    animate.to(endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
      .then(() => this.setState({ showEndingCTA: true }));

    animate.to(replayButton, 0.3, this.animationStates.idle.replayButton);
  };

  animateOutEndOverlay = () => {
    const { endingOverlay, learnMore, nextVideo, replayButton, frontOverlay, backOverlay } = this.refs;

    animate.to(endingOverlay, 0.3, this.animationStates.out.endingOverlay)
      .then(() => this.setState({ showEndingCTA: false }));

    animate.to(replayButton, 0.3, this.animationStates.out.replayButton);

  };

  clearCountdown = () => {
    clearInterval(this.nextVideoIntervalId);
    this.nextVideoIntervalId = undefined;
  };

  render() {
    const { style, modelSlug } = this.props;
    const tempPauseStyle = this.props.isPlaying ? {fill: 'black'} : undefined;

    return (
      <div className="instructional-video-player grid-player" style={style}>
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
        <div className="controls" ref="controls">
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
                image={this.props.chapterImage}
              />
              ,
              <NextVideoCard
                key={'nextVideoId'}
                title={this.props.nextVideoTitle}
                route={this.props.nextVideoRoute}
                video={this.props.nextVideoSrc}
                timeLeft={this.state.nextVideoTimeLeft}
              />
            ]
            : undefined 
          }
          </TransitionGroup>
          <div ref="replayButton" className="replay-button"></div>
        </div>
      </div>
    )
  }
}
