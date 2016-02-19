import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import mediaBgCover from '../../utils/media-bg-cover';

const states = {
  LOADING: 'loading',
  PLAYING: 'playing',
  PAUSED: 'paused'
};

var containerEl, videoEl;

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING
    }
  }

  static propTypes = {
    video: React.PropTypes.string,
    type: React.PropTypes.string,
    chapter: React.PropTypes.number
  };

  static defaultProps = {
    video: 'http://vjs.zencdn.net/v/oceans.mp4',
    type: 'narrative',
    chapter: 1
  };

  togglePlay = () => {
    (this.state.status === states.PAUSED) ? this.playVideo() : this.pauseVideo();
  };

  handleClick = () => {
    this.togglePlay();
  };

  handleKeypress = (e) => {
    e.preventDefault();
    if (e.keyCode === 32) this.togglePlay();
  };

  handleResize = () => {
    mediaBgCover(videoEl, containerEl);
  };

  playVideo = () => {
    this.setState({status: states.PLAYING});
    videoEl.play();
    console.log('video playing');
  };

  pauseVideo = () => {
    this.setState({status: states.PAUSED});
    videoEl.pause();
    console.log('video paused');
  };

  setEvents = () => {
    videoEl.addEventListener('canplay', () => {
      this.handleResize();
      this.playVideo();
    });

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keypress', this.handleKeypress);
  };

  componentDidMount() {
    containerEl = findDOMNode(this);
    videoEl = findDOMNode(this.refs.video);

    this.setEvents();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keypress', this.handleKeypress);
  }

  render() {
    return (
      <div className={`video-container`}>
        <video
          ref="video"
          preload="true"
          muted="true"
          className={`video-player ${this.state.status}`}
          onClick={this.handleClick}
        >
          <source src={this.props.video} type="video/mp4"/>
        </video>
      </div>
    );
  }
}
