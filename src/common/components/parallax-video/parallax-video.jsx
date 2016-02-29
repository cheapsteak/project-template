import React from 'react';
import { findDOMNode } from 'react-dom';
import mediaBgCover from '../../utils/media-bg-cover';
import Seriously from 'seriously';
import chromaEffect from 'seriously/effects/seriously.chroma';

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

export default class ParallaxVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING,
      fgVideoWidth: null,
      fgVideoHeight : null
    }
  }

  bgVideo;
  fgVideo;
  containerEl;
  parallax;
  seriously;
  loadedVideos = 0;

  static propTypes = {
    bgVideoPath: React.PropTypes.string.isRequired,
    fgVideoPath: React.PropTypes.string.isRequired,
    bgVideoDepth: React.PropTypes.number,
    fgVideoDepth: React.PropTypes.number,
    parallaxOpts: React.PropTypes.object,
    animateIn: React.PropTypes.func,
    animateOut: React.PropTypes.func
  };

  static defaultProps = {
    bgVideoDepth: 0.7,
    fgVideoDepth: 0.5,
    parallaxOpts: {},
    animateIn: () => {
      console.log('default animateIn');
    },
    animateOut: () => {
      console.log('default animateOut');
    }
  };

  positionElements = () => {
    mediaBgCover(this.bgVideo, this.containerEl);
    mediaBgCover(this.fgCanvas, this.containerEl);
    this.parallax && this.parallax.limit(window.innerWidth * 0.1, window.innerHeight * 0.1);
  };

  onVideoReady = () => {
    this.loadedVideos++;

    if (this.loadedVideos == 2) {
      this.positionElements();
      this.setState({
        status: states.LOADED,
        fgVideoWidth: this.fgVideo.videoWidth,
        fgVideoHeight : this.fgVideo.videoHeight
      });
      this.bgVideo.play();
      this.fgVideo.play();
      this.props.animateIn();
      this.createAlphaVideo();
    }
  };

  createFgVideoSource = () => {
    this.fgVideo = document.createElement('video');
    this.fgVideo.src = this.props.fgVideoPath;
    this.fgVideo.preload = true;
    this.fgVideo.loop = true;
  };

  createAlphaVideo = () => {
    this.seriously = new Seriously();
    var target = this.seriously.target(this.refs.fgCanvas);
    var chroma = this.seriously.effect('chroma');

    chroma.source = this.fgVideo;
    //chroma.screen = '#29fe2f';
    target.source = chroma;

    this.seriously.go();
  };

  setEvents = () => {
    if (this.bgVideo.readyState !== 4) {
      this.bgVideo.addEventListener('loadstart', () => {
        console.time('bg-video-ready');
      });
      this.bgVideo.addEventListener('canplay', () => {
        this.onVideoReady();
        console.timeEnd('bg-video-ready');
      });
    } else {
      this.onVideoReady();
    }

    if (this.fgVideo.readyState !== 4) {
      this.fgVideo.addEventListener('loadstart', () => {
        console.time('fg-video-ready');
      });
      this.fgVideo.addEventListener('mediadataloaded', () => {
        console.log('setting state');
      });
      this.fgVideo.addEventListener('canplay', () => {
        this.onVideoReady();
        console.timeEnd('fg-video-ready');
      });
    } else {
      this.onVideoReady();
    }

    window.addEventListener('resize', this.positionElements);
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.bgVideo = findDOMNode(this.refs.bgVideo);
    this.fgCanvas = findDOMNode(this.refs.fgCanvas);

    this.parallax = new Parallax(this.refs.scene, this.props.parallaxOpts);

    this.createFgVideoSource();
    this.setEvents();
  }

  componentWillUnmount() {
    this.fgVideo = null;
    window.removeEventListener('resize', this.positionElements);
  }

  render() {
    return (
      <div className={`parallax-video`}>
        <div ref="scene" className={`scene ${this.state.status}`}>
          <div className={`layer`} data-depth={this.props.bgVideoDepth}>
            <video ref="bgVideo" preload="true" loop="true" className={`bg-video ${this.state.status}`}>
              <source src={this.props.bgVideoPath} type="video/mp4"/>
            </video>
          </div>

          <div className={`layer`} data-depth={this.props.fgVideoDepth}>
            <canvas
              ref="fgCanvas"
              width={this.state.fgVideoWidth}
              height={this.state.fgVideoHeight}
              className={`fg-canvas ${this.state.status}`}
            ></canvas>
          </div>

          {React.cloneElement(this.props.children || <div />, {ref: 'child'})}
        </div>
      </div>
    );
  }

}
