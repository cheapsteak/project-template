import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from '../../../../assets/video-play-button.svg';
import BackButtonSvg from '../../../../assets/video-back-button.svg';
import ForwardButtonSvg from '../../../../assets/video-forward-button.svg';
import animate from 'gsap-promise';
import _ from 'lodash';

export default class NarrativeVideoPlayer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  hideControlsTimeoutId = undefined;

  componentWillReceiveProps(nextProps) {
    if(this.props.isFullControls !== nextProps.isFullControls) {
      if(nextProps.isFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
      }
    }
  }

  componentDidMount() {
    const el = findDOMNode(this);
    const { overlay, controls, exploreBtn } = this.refs;

    animate.set(exploreBtn, { y: -51 });
    animate.set(overlay, { opacity: 0 });
    animate.set(controls, { bottom: -74 });

    this.props.isPlaying && this.video.play();

    if(!this.props.isPlaying) {
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

  componentWillUnmount() {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = undefined;
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  handleMouseMove = () => {

    if (!this.isFullControls) {
      this.props.showFullControls();
    }
    if(this.props.isPlaying) {
      clearTimeout(this.hideControlsTimeoutId);
      this.hideControlsTimeoutId = setTimeout(() => {
        this.props.hideFullControls();
        this.hideControlsTimeoutId = undefined;
      }, 3000);
    }
  }

  animateInControls = () => {
    const el = findDOMNode(this);
    const { videoWrapper, overlay, controls, exploreBtn, simpleProgressBar } = this.refs;
    const delay = 0.2;

    const buttons = Array.prototype.slice.call(el.querySelectorAll('.button'));
    const dots = el.querySelectorAll('.dot');

    const zoomedInRect = el.getBoundingClientRect();
    const zoomedOutVideoMargin = 40;
    const zoomedOutRect = {
      width: zoomedInRect.width - zoomedOutVideoMargin * 2,
      height: zoomedInRect.height - zoomedOutVideoMargin * 2
    }

    animate.to(overlay, 0.8, { delay, opacity: 0.25 });
    animate.to(exploreBtn, 0.8, { y: -1 });

    // in case anything goes weird with scaling the video wrapper - chang
    // animate.to(el, 0.8, { padding: '37px' });
    animate.to(videoWrapper, 0.8, {
      scaleX: zoomedOutRect.width/zoomedInRect.width,
      scaleY: zoomedOutRect.height/zoomedInRect.height
    });

    animate.set(controls, { opacity: 1 });
    animate.to(controls, 0.5, { delay: delay + 0.5, bottom: 0 });

    buttons.forEach((button) => { animate.fromTo(button, 0.3, { y: 20 }, { delay: 1, y: 0})});
    animate.staggerFrom(dots, 0.6, { delay: 1, opacity: 0 }, 0.2);

    animate.set(el, {cursor: 'default'});
    animate.set(simpleProgressBar, { display: 'none', bottom: -8  });
  }

  animateOutControls = () => {
    const el = findDOMNode(this);
    const { videoWrapper, overlay, controls, exploreBtn, simpleProgressBar } = this.refs;

    animate.to(overlay, 0.8, { opacity: 0 });
    animate.to(exploreBtn, 0.8, { y: -51 });

    // in case anything goes weird with scaling the video wrapper - chang
    // animate.to(el, 0.8, { padding: '0px' });

    animate.to(videoWrapper, 0.8, { scaleX: 1, scaleY: 1 });

    animate.set(controls, { opacity: 0 });
    animate.to(controls, 0.8, { bottom: -74 })
      .then(() => {
        animate.set(el, {cursor: 'none'});
        animate.to(simpleProgressBar, 0.4, { display: 'block', bottom: 0 });
      });
  }

  handleMetadataLoaded = () => {
    this.video.currentTime = this.props.currentTime;
  };

  handleTimeUpdate = () => {
    this.props.onVideoTimeChange(this.video.currentTime);
  };

  handleVideoPlayPause = () => {
    if(this.props.isPlaying) {
      this.video.pause();
      this.props.onVideoPause();
      clearTimeout(this.hideControlsTimeoutId);
      this.props.showFullControls();
    } else {
      this.video.play();
      this.props.onVideoPlay();
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

  secondsToMinutes (totalSeconds) {
    const totalSecondsFloat = parseFloat(totalSeconds);
    let minutes = Math.floor(totalSecondsFloat / 60);
    let seconds = Math.round(totalSecondsFloat - (minutes * 60));

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    const time = minutes + ':' + seconds;

    return time;
  }

  render() {
    const { style } = this.props;
    const tempPauseStyle = this.props.isPlaying ? {fill: 'black'} : undefined;
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';

    return (
      <div
        className="narrative-video-player"
        style={style}
        onMouseMove={this.handleMouseMove}
      >
        <div
          ref="videoWrapper"
          className="video-wrapper"
        >
          <div ref="overlay" className="video-overlay"></div>
          <button ref="exploreBtn" className="explore-button">Explore</button>
          <video
            ref={(node) => this.video = node }
            src={this.props.src}
            preload="metadata"
            onLoadedMetadata={this.handleMetadataLoaded}
            onEnded={this.handleVideoPlayPause}
            onTimeUpdate={this.handleTimeUpdate}
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
          onMouseEnter={ this.handleMouseEnterControls }
          onMouseMove={ e => e.stopPropagation() }
          onMouseLeave={ this.handleMouseLeaveControls }
        >
          <span className="label-duration">{this.secondsToMinutes(this.video && this.video.duration || 0)}</span>
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
