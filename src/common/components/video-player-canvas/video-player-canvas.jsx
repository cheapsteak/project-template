import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import mediaBgCover from '../../utils/media-bg-cover';
import Seriously from 'seriously';
import chromaEffect from 'seriously/effects/seriously.chroma';

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

var containerEl, bgVideo, fgVideo, fgCanvas;
var seriously, target, chroma;
var loadedVideos = 0;

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING
    }
  }

  static propTypes = {
    bgVideo: React.PropTypes.string,
    fgVideo: React.PropTypes.string
  };

  static defaultProps = {
    bgVideo: '../videos/bg.mp4',
    fgVideo: '../videos/fg.mp4'
  };

  handleResize = () => {
    mediaBgCover(bgVideo, containerEl);
    mediaBgCover(fgCanvas, containerEl);
  };

  handleVideosLoaded = () => {
    loadedVideos++;
    if (loadedVideos == 2) {
      this.handleResize();
      this.setState({status: states.LOADED});
    }
  };

  setFgVideo = () => {
    seriously = new Seriously();
    target = seriously.target(this.refs.fgCanvas);
    chroma = seriously.effect('chroma');

    chroma.source = fgVideo;
    chroma.screen = '#347e46';
    target.source = chroma;
    seriously.go();
  };

  setEvents = () => {
    bgVideo.addEventListener('loadstart', () => {
      console.time('bgVideoLoaded');
    });
    bgVideo.addEventListener('canplay', () => {
      this.handleVideosLoaded();
      console.timeEnd('bgVideoLoaded');
    });

    fgVideo.addEventListener('loadstart', () => {
      console.time('fgVideoLoaded');
    });

    fgVideo.addEventListener('canplay', () => {
      this.handleVideosLoaded();
      console.timeEnd('fgVideoLoaded');
    });

    window.addEventListener('resize', this.handleResize);
  };

  componentDidMount() {
    containerEl = findDOMNode(this);
    bgVideo = findDOMNode(this.refs.bgVideo);
    fgVideo = findDOMNode(this.refs.fgVideo);
    fgCanvas = findDOMNode(this.refs.fgCanvas);

    this.setEvents();
    this.setFgVideo();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div className={`video-container`}>

        <video
          ref="bgVideo"
          autoPlay="true"
          preload="true"
          loop="true"
          muted="true"
          className={`bg-video ${this.state.status}`}
        >
          <source src={this.props.bgVideo} type="video/mp4"/>
        </video>

        <canvas width="1280" height="720" ref="fgCanvas" className={`fg-canvas ${this.state.status}`}></canvas>

        <video ref="fgVideo" className={`fg-video`} autoPlay="true" preload="true" loop="true" muted="true">
          <source src={this.props.fgVideo} type="video/mp4"/>
        </video>

      </div>
    );
  }
}
