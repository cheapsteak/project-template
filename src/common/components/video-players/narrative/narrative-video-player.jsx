import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from 'svgs/video-player-play.svg';
import PauseButtonSvg from 'svgs/video-player-pause.svg';
import BackButtonSvg from 'svgs/video-back-button.svg';
import ForwardButtonSvg from 'svgs/video-forward-button.svg';
import IconExplore from 'svgs/icon-explore.svg';
import animate from 'gsap-promise';
import _ from 'lodash';
import { Link } from 'react-router';

export default class NarrativeVideoPlayer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  hideControlsTimeoutId = undefined;

  componentWillReceiveProps(nextProps) {
    const el = findDOMNode(this);

    if(this.props.useFullControls !== nextProps.useFullControls) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
        this.animateOutCircleCTA();
      }
    }

    if(this.props.circleCTA.text !== nextProps.circleCTA.text)  {
      if(nextProps.circleCTA.text) {

        if(this.props.useFullControls) {
          this.animateInCircleCTA();
        }

        this.animateCircleCTAText();
      } else {
        this.animateOutCircleCTA();
      }
    }
  }

  componentDidMount() {
    const el = findDOMNode(this);
    const { overlay, controls, exploreBtn } = this.refs;
    const circleCTA = findDOMNode(this.refs.circleCTA);

    animate.set(exploreBtn, { y: -51 });
    animate.set(overlay, { opacity: 0 });
    animate.set(controls, { bottom: -74 });
    animate.set(circleCTA, { opacity: 0, y: 20 });

    this.props.isPlaying && this.video.play();

    if(!this.props.isPlaying) {
      if(!this.props.useFullControls) {
        this.props.showFullControls();
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

  getCurrentChapter= () => {
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



  /************************/
  /*     Animatations     */
  /************************/

  animateInControls = () => {
    const el = findDOMNode(this);
    const { videoWrapper, overlay, controls, exploreBtn, simpleProgressBar } = this.refs;
    const delay = 0.2;

    const buttons = el.querySelectorAll('.button');
    const dots = el.querySelectorAll('.dot');

    const zoomedInRect = el.getBoundingClientRect();
    const zoomedOutVideoMargin = 40;
    const zoomedOutRect = {
      width: zoomedInRect.width - zoomedOutVideoMargin * 2,
      height: zoomedInRect.height - zoomedOutVideoMargin * 2
    }

    animate.to(overlay, 0.3, { delay, opacity: 0.25 });
    animate.to(exploreBtn, 0.3, { y: -1 });

    // in case anything goes weird with scaling the video wrapper - chang
    // animate.to(el, 0.8, { padding: '37px' });
    animate.to(videoWrapper, 0.3, {
      scaleX: zoomedOutRect.width/zoomedInRect.width,
      scaleY: zoomedOutRect.height/zoomedInRect.height
    });

    animate.set(controls, { opacity: 1 });
    animate.to(controls, 0.3, { delay: delay, bottom: 0 });

    _.forEach(buttons, (button) => { animate.fromTo(button, 0.3, { y: 50 }, { delay: 0.3, y: 0})});
    animate.staggerFrom(dots, 0.3, { delay: 0.5, opacity: 0 }, 0.2);

    animate.set(el, {cursor: 'default'});
    animate.set(simpleProgressBar, { display: 'none', bottom: -8  });
  }

  animateOutControls = () => {
    const el = findDOMNode(this);
    const { videoWrapper, overlay, controls, exploreBtn, simpleProgressBar } = this.refs;

    animate.to(overlay, 0.3, { opacity: 0 });
    animate.to(exploreBtn, 0.3, { y: -51 });

    // in case anything goes weird with scaling the video wrapper - chang
    // animate.to(el, 0.3, { padding: '0px' });

    animate.to(videoWrapper, 0.3, { scaleX: 1, scaleY: 1 });

    animate.set(controls, { opacity: 0 });
    animate.to(controls, 0.3, { bottom: -74 })
      .then(() => {
        animate.set(el, {cursor: 'none'});
        animate.to(simpleProgressBar, 0.4, { display: 'block', bottom: 0 });
      });
  }

  animateInCircleCTA = () => {
    const circleCTA = findDOMNode(this.refs.circleCTA);
    return animate.to(circleCTA, 0.3, { opacity: 1, y: 0 });
  };

  animateOutCircleCTA = () => {
    const circleCTA = findDOMNode(this.refs.circleCTA);
    animate.to(circleCTA, 0.3, { opacity: 0, y: 40 });
  };

  animateCircleCTAText = () => {
    const el = findDOMNode(this);
    const ctaEls = el.querySelectorAll('.stagger-cta');
    animate.staggerFromTo(ctaEls, 0.3, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.2);
  }



  /************************/
  /*       Handlers       */
  /************************/

  handleMetadataLoaded = () => {
    this.video.currentTime = this.props.currentTime;
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

  handleComponentMouseMove = () => {
    if(this.props.isPlaying) {
      if(!this.props.useFullControls) {
        this.props.showFullControls();
      }

      clearTimeout(this.hideControlsTimeoutId);
      this.hideControlsTimeoutId = setTimeout(() => {
        this.props.hideFullControls();
        this.hideControlsTimeoutId = undefined;
      }, 3000);
    }
  }



  render() {
    const { style, circleCTA } = this.props;
    const progressWidth = (this.video && this.video.duration ?  this.video.currentTime / this.video.duration * 100 : 0) + '%';

    return (
      <div
        className="narrative-video-player"
        style={style}
        onMouseMove={this.handleComponentMouseMove}
      >
        <div
          ref="videoWrapper"
          className="video-wrapper"
        >
          <div ref="overlay" className="video-overlay"></div>
          <button ref="exploreBtn" className="explore-button">
            <div dangerouslySetInnerHTML={{ __html: IconExplore }}></div>
            <div>Explore</div>
          </button>
          <video
            ref={(node) => this.video = node }
            src={this.props.src}
            preload="metadata"
            onLoadedMetadata={this.handleMetadataLoaded}
            onEnded={this.handleVideoPlayPause}
            onTimeUpdate={this.handleTimeUpdate}
          >
          </video>
          <Link ref="circleCTA" className="circle-cta" to={circleCTA.route}>
            <div className="circle-cta-text">
              <label className="stagger-cta">Explore</label>
              <h3 className="stagger-cta">{circleCTA.text}</h3>
            </div>
          </Link>
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
