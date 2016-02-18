import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import mediaBgCover from '../../utils/media-bg-cover';
import Seriously from 'seriously';
import chromaEffect from 'seriously/effects/seriously.chroma';
import blurEffect from 'seriously/effects/seriously.blur';

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

var containerEl, bgVideo, fgVideo, bgCanvas, fgCanvas;
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
    bgVid: '../videos/bg.mp4',
    fgVid: '../videos/fg.mp4'
  };

  handleResize = () => {
    mediaBgCover(bgCanvas, containerEl);
    mediaBgCover(fgCanvas, containerEl);
  };

  handleVideosReady = () => {
    loadedVideos++;
    if (loadedVideos == 2) {
      this.handleResize();
      this.setState({status: states.LOADED});
      bgVideo.play();
      fgVideo.play();
    }
  };

  setBgVideo = () => {
    bgVideo = document.createElement('video');
    bgVideo.src = this.props.bgVid;
    bgVideo.loop = true;

    var seriously = new Seriously();
    var target = seriously.target(this.refs.bgCanvas);
    var blur = seriously.effect('blur');
    var reformat = seriously.transform('reformat');

    reformat.source = bgVideo;
    blur.source = reformat;
    blur.amount = 0;
    target.source = blur;

    seriously.go();
  };

  setFgVideo = () => {
    fgVideo = document.createElement('video');
    fgVideo.src = this.props.fgVid;
    fgVideo.loop = true;

    var seriously = new Seriously();
    var target = seriously.target(this.refs.fgCanvas);
    var chroma = seriously.effect('chroma');

    chroma.source = fgVideo;
    chroma.screen = '#42835d';
    target.source = chroma;

    seriously.go();
  };

  setEvents = () => {
    bgVideo.addEventListener('loadstart', () => {
      console.time('bg-video-ready');
    });
    bgVideo.addEventListener('canplay', () => {
      this.handleVideosReady();
      console.timeEnd('bg-video-ready');
    });

    fgVideo.addEventListener('loadstart', () => {
      console.time('fg-video-ready');
    });
    fgVideo.addEventListener('canplay', () => {
      this.handleVideosReady();
      console.timeEnd('fg-video-ready');
    });

    window.addEventListener('resize', this.handleResize);
  };

  componentDidMount() {
    containerEl = findDOMNode(this);
    bgCanvas = findDOMNode(this.refs.bgCanvas);
    fgCanvas = findDOMNode(this.refs.fgCanvas);

    this.setBgVideo();
    this.setFgVideo();

    this.setEvents();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div className={`parallax-video-container`}>
        <canvas width="1364" height="720" ref="bgCanvas" className={`bg-canvas ${this.state.status}`}></canvas>
        <canvas width="1280" height="720" ref="fgCanvas" className={`fg-canvas ${this.state.status}`}></canvas>
      </div>
    );
  }

}
