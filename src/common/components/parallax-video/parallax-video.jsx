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

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING
    }
  }

  bgVideo;
  fgVideo;
  containerEl;
  parallax;
  loadedVideos = 0;

  static propTypes = {
    bgVideo: React.PropTypes.shape({
      path: React.PropTypes.string.isRequired,
      depth: React.PropTypes.number
    }),
    fgVideo: React.PropTypes.shape({
      path: React.PropTypes.string.isRequired,
      depth: React.PropTypes.number
    }),
    animateIn: React.PropTypes.func
  };

  static defaultProps = {
    animateIn: () => {
      console.log('default animateIn');
    }
  };

  positionElements = () => {
    mediaBgCover(this.refs.bgVideo, this.containerEl);
    mediaBgCover(this.refs.fgCanvas, this.containerEl);
    this.parallax && this.parallax.limit(window.innerWidth * 0.1, window.innerHeight * 0.1);
  };

  onVideosReady = () => {
    this.loadedVideos++;

    if (this.loadedVideos == 2) {
      this.positionElements();
      this.setState({status: states.LOADED});
      this.bgVideo.play();
      this.fgVideo.play();
      this.props.animateIn();
    }
  };

  setFgVideo = () => {
    this.fgVideo = document.createElement('video');
    this.fgVideo.src = this.props.fgVideo.path;
    this.fgVideo.preload = true;
    this.fgVideo.loop = true;

    var seriously = new Seriously();
    var target = seriously.target(this.refs.fgCanvas);
    var chroma = seriously.effect('chroma');

    chroma.source = this.fgVideo;
    //chroma.screen = '#29fe2f';
    target.source = chroma;

    seriously.go();
  };

  setEvents = () => {
    if (this.bgVideo.readyState !== 4) {
      this.bgVideo.addEventListener('loadstart', () => {
        console.time('bg-video-ready');
      });
      this.bgVideo.addEventListener('canplay', () => {
        this.onVideosReady();
        console.timeEnd('bg-video-ready');
      });
    } else {
      this.onVideosReady();
    }

    if (this.fgVideo.readyState !== 4) {
      this.fgVideo.addEventListener('loadstart', () => {
        console.time('fg-video-ready');
      });
      this.fgVideo.addEventListener('canplay', () => {
        this.onVideosReady();
        console.timeEnd('fg-video-ready');
      });
    } else {
      this.onVideosReady();
    }

    window.addEventListener('resize', this.positionElements);
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.bgVideo = this.refs.bgVideo;
    this.setFgVideo();

    this.parallax = new Parallax(this.refs.scene);
    this.setEvents();
  }

  componentWillUnmount() {
    this.fgVideo = null;
    window.removeEventListener('resize', this.positionElements);
  }

  render() {
    return (
      <div className={`parallax-video-container`}>
        <div ref="scene" className={`scene ${this.state.status}`}>
          <span className={`layer`} data-depth={this.props.bgVideo.depth || 0.7}>
            <video ref="bgVideo" preload="true" loop="true" className={`bg-video ${this.state.status}`}>
              <source src={this.props.bgVideo.path} type="video/mp4"/>
            </video>
          </span>
          <span className={`layer`} data-depth={this.props.fgVideo.depth || 0.5}>
            <canvas width="1920" height="1080" ref="fgCanvas" className={`fg-canvas ${this.state.status}`}></canvas>
          </span>
          {React.cloneElement(this.props.children || <div />, {ref: 'child'})}
        </div>
      </div>
    );
  }

}
