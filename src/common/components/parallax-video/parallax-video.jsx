import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import mediaBgCover from '../../utils/media-bg-cover';
import Seriously from 'seriously';
import chromaEffect from 'seriously/effects/seriously.chroma';

const maxParaX = 100;
const maxParaY = 100;

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

var containerEl, bgVideo, fgVideo;
var loadedVideos = 0;

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING,
      sceneScale: 1,
      textLeftPos: 0
    }
  }

  static propTypes = {
    bgVid: React.PropTypes.string,
    fgVid: React.PropTypes.string,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string
  };

  static defaultProps = {
    bgVid: '../videos/bg-1080.mp4',
    fgVid: '../videos/fg-1080.mp4',
    title: 'chapter',
    subtitle: 'science'
  };

  handleResize = () => {
    mediaBgCover(this.refs.bgVideo, containerEl);
    mediaBgCover(this.refs.fgCanvas, containerEl);

    var sceneWidth = this.refs.scene.offsetWidth;
    var sceneHeight = this.refs.scene.offsetHeight;

    var scaleX = (sceneWidth + maxParaX * 2) / sceneWidth;
    var scaleY = (sceneHeight + maxParaY * 2) / sceneHeight;
    var scale = Math.max(scaleX, scaleY);

    var textLeftPos = window.innerWidth * (scale - 1) / 2;

    this.setState({
      sceneScale: scale,
      textLeftPos: textLeftPos
    });
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

  setFgVideo = () => {
    fgVideo = document.createElement('video');
    fgVideo.src = this.props.fgVid;
    fgVideo.preload = true;
    fgVideo.loop = true;

    var seriously = new Seriously();
    var target = seriously.target(this.refs.fgCanvas);
    var chroma = seriously.effect('chroma');

    chroma.source = fgVideo;
    //chroma.screen = '#29fe2f';
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
    bgVideo = this.refs.bgVideo;

    this.setFgVideo();
    this.setEvents();

    var parallax = new Parallax(this.refs.scene, {
      limitX: maxParaX,
      invertY: maxParaY
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div className={`parallax-video-container`}>

        <div
          ref="scene"
          className={`scene ${this.state.status}`}
          style={{transform: 'scale(' + this.state.sceneScale + ') translate3d(0,0,0)'}}
        >
          <span className={`layer`} data-depth="0.7">
            <video ref="bgVideo" preload="true" loop="true" className={`bg-video ${this.state.status}`}>
              <source src={this.props.bgVid} type="video/mp4"/>
            </video>
          </span>

          <span className={`layer`} data-depth="0.5">
            <canvas width="1920" height="1080" ref="fgCanvas" className={`fg-canvas ${this.state.status}`}></canvas>
          </span>

          <span className={`layer`} data-depth="0.3">
            <div
              className={`text-container`}
              style={{transform: 'scale(' + (1/this.state.sceneScale) + ')'}}
            >
              <div className={`title`} style={{left: this.state.textLeftPos}}>{this.props.title}</div>
              <div className={`subtitle`} style={{left: this.state.textLeftPos}}>{this.props.subtitle}</div>
            </div>
          </span>
        </div>

      </div>
    );
  }

}
