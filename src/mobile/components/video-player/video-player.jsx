import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import detect from 'common/utils/detect';
import createVideoAnalyticsTracker from 'common/utils/createVideoAnalyticsTracker';

export default class RotateScreen extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    src: React.PropTypes.string,
    trackingCategory: React.PropTypes.string,
    trackingLabel: React.PropTypes.string,
    status: React.PropTypes.string,
    onExitFullscreen: React.PropTypes.func,
    preload: React.PropTypes.string,
  };

  componentDidMount() {
    this.refs.video.style.opacity = 0;
    animate.set(this.refs.video, { opacity: 0, width: 1, height: 1, position: 'fixed', top: 0, left: 0, x: window.innerWidth/2, y: window.innerHeight/2 });
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);

    this.analytics = createVideoAnalyticsTracker(this.refs.video, this.props.trackingCategory, this.props.trackingLabel);
    this.analytics.track();
  }

  componentWillReceiveProps(nextProps) {

    if(this.props.status !== nextProps.status) {
      this.refs.video.currentTime = 0;

      if(detect.md.is('iPhone') && nextProps.status === 'play') {
        // setTimeout(() => {
          this.refs.video.play();
          setTimeout(()=> this.refs.video.play(),100)
          this.props.onExitFullscreen();
        // },300);
      } else {
        nextProps.status === 'play' ? this.playVideo() : this.stopVideo();
      }
    }
  }

  componentWillUnmount() {
    this.analytics.cleanup();
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
  }

  playVideo = () => {
    this.refs.video.style.opacity = 1;

    if(detect.md.is('iPhone')) {
      this.refs.video.play();
    } else {
      this.requestFullscreen(this.refs.video);
      this.refs.video.play();
    }
  }

  stopVideo = () => {
    this.refs.video.pause();
    this.refs.video.currentTime = 0;
  };

  requestFullscreen = (el) => {
    if(el.requestFullscreen) {
      el.requestFullscreen();
    } else if(el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if(el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if(el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
    
    el.style.opacity = 1;
  };

  isFullScreen() {
    var isFS;

    if(document.fullscreen !== undefined) {
      isFS = document.fullscreen;
    } else if(document.mozFullScreen !== undefined) {
      isFS = document.mozFullScreen;
    } else if(document.webkitIsFullScreen !== undefined) {
      isFS = document.webkitIsFullScreen;
    }

    return isFS;
  }

  handleFullscreenChange = () => {
    if(!this.isFullScreen()) {
      this.props.onExitFullscreen();
    }
  };

  render() {
    const { className = '', style } = this.props;

    return (
      <video ref="video" preload={this.props.preload} className={className} style={style} src={this.props.src} />
    )
  }
}
