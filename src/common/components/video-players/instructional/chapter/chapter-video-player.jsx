import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from 'svgs/icon-play.svg';
import PauseButtonSvg from 'svgs/icon-pause.svg';
import MuteButtonSvg from 'svgs/video-player-mute.svg';
import VolumeButtonSvg from 'svgs/video-player-volume.svg';
import EnterFullBrowserButtonSvg from 'svgs/video-player-enter-fullbrowser.svg';
import ExitFullBrowserButtonSvg from 'svgs/video-player-exit-fullbrowser.svg';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import { Link } from 'react-router';
import animate from 'gsap-promise';

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
        opacity: 0
      },
      replayLabel: {
        opacity: 0
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
        opacity: 1
      },
      replayLabel: {
        delay: 0.8,
        opacity: 1
      },
      controls: {
        y: 0
      }
    }
  };
};

export default class ChapterVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    className: React.PropTypes.string,
    poster: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  videoId = 'target-video';
  cloneId = 'clone-video';
  hideControlsTimeoutId = undefined;

  componentWillMount() {
    // this.props.onVideoTimeChange(0);
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
      } else if (this.props.currentTime === this.props.duration
        && nextProps.currentTime !== nextProps.duration) {
        this.animateOutEndOverlay()
        .then(this.animateInControls);
      }
    }

    if(this.props.isMuted != nextProps.isMuted) {
      this.video.muted = nextProps.isMuted;
    }
  }

  componentWillEnterFullBrowser = () => {
    const container = this.refs.videoWrapper;
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
    const container = findDOMNode(this);
    const clone = document.querySelector('#clone-video');
    const cloneParent = clone.parentNode;
    const video = document.querySelector(`#${this.videoId}`);
    const isPlaying = !video.paused;

    cloneParent.removeChild(clone)
    cloneParent.insertBefore(video, cloneParent.firstChild);

    isPlaying && video.play();

    return Promise.resolve();
  };

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
    return animate.to(this.refs.controls, 0.3, this.animationStates.idle.controls);
  };

  animateOutControls = () => {
    return animate.to(this.refs.controls, 0.3, this.animationStates.out.controls);
  };

  animateInEndOverlay = () => {
    const { videoWrapper, endingOverlay, replayButton, replayLabel, controls } = this.refs;

    return Promise.all([
      animate.to(videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(endingOverlay, 0.3, this.animationStates.idle.endingOverlay),
      animate.to(replayButton, 0.3, this.animationStates.idle.replayButton),
      animate.to(replayLabel, 0.3, this.animationStates.idle.replayLabel)
    ]);
  };

  animateOutEndOverlay = () => {
    const { videoWrapper, endingOverlay, replayButton, replayLabel, controls } = this.refs;

    return Promise.all([
      animate.to(videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(replayButton, 0.3, this.animationStates.out.replayButton),
      animate.to(replayLabel, 0.3, this.animationStates.out.replayLabel)
    ]);
  };

  render() {
    const { style, modelSlug, basePath, isFullBrowser, fullBrowserChapterRoute, chapterRoute, className } = this.props;
    const route = (!isFullBrowser ? fullBrowserChapterRoute : chapterRoute) || '/';

    return (
      <div
        ref="root"
        className={`video-player instructional-video-player chapter-player ${className || ''}`}
        style={style}
      >
        <div
          ref="videoWrapper"
          className="video-wrapper"
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
              poster={this.props.poster}
            >
            </video>
            : undefined
        }
        </div>
        <div className="controls" ref="controls">
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
          ref="endingOverlay"
          className="end-overlay"
        >
          <div
            className="replay-group replay-group-chapter"
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
