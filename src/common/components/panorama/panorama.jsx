import React from 'react';
import { findDOMNode } from 'react-dom';
var PhotoSphere = require('photo-sphere').PhotoSphereViewer;

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

const minZoomNum = 0;
const maxZoomNum = 60;
const defaultZoomLevel = 0;
const zoomStep = 0.1;

export default class Panorama extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING,
      zoomLevel: defaultZoomLevel,
      sliderPosition: 0
    }
  }

  containerEl;
  panorama;
  zoomRange = maxZoomNum + minZoomNum;
  isDraggingSlider = false;

  static propTypes = {
    src: React.PropTypes.string
  };

  static defaultProps = {
    src: '../images/pan-test.jpg'
  };

  updateZoomLevel = (step) => {
    var zoomLevel = this.state.zoomLevel + step;
    zoomLevel = parseFloat(zoomLevel).toPrecision(1);
    this.panorama.zoom(this.zoomRange * zoomLevel);
  };

  handleZoomIn = () => {
    if (this.state.zoomLevel < 1) {
      this.updateZoomLevel(zoomStep);
      console.log('zoom in')
    }
  };

  handleZoomOut = () => {
    if (this.state.zoomLevel > 0) {
      this.updateZoomLevel(-zoomStep);
      console.log('zoom out')
    }
  };

  doDrag = (coordX) => {
    if (this.isDraggingSlider) {
      var pos = coordX - this.refs.slider.getBoundingClientRect().left;
      var zoomLevel = Math.min(pos / this.refs.slider.offsetWidth, 1);
      this.panorama.zoom(this.zoomRange * zoomLevel);
    }
  };

  stopDrag = (coordX) => {
    if (this.isDraggingSlider) {
      this.isDraggingSlider = false;
      console.log('stop drag')
    }
  };

  handleSliderDrag = () => {
    console.log('start drag')
    this.isDraggingSlider = true;

    document.addEventListener('mousemove', (e) => this.doDrag(e.clientX));
    document.addEventListener('touchmove', (e) => this.doDrag(e.targetTouches[0].clientX));

    document.addEventListener('mouseup', () => this.stopDrag());
    document.addEventListener('touchend', () => this.stopDrag());
  };

  handleFullScreen = () => {
    console.log('go fullscreen')
  };

  setZoom = (levelNum) => {
    var zoomLevel = levelNum / this.zoomRange;
    var sliderPos = this.refs.slider.offsetWidth * zoomLevel - this.refs.indicator.offsetWidth * 0.5;
    this.setState({zoomLevel: zoomLevel, sliderPosition: sliderPos});

    console.log('levelNum:', levelNum, 'zoomLevel', zoomLevel)
  };

  handleMouseWheel = (e) => {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    (delta > 0) ? this.handleZoomIn() : this.handleZoomOut();
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.panorama = PhotoSphere({
      container: this.containerEl,
      panorama: this.props.src,
      time_anim: false,
      min_fov: minZoomNum,
      max_fov: maxZoomNum,
      mousewheel: false
    });

    this.panorama.on('ready', () => {
      this.setState({status: states.LOADED});
      this.panorama.zoom(defaultZoomLevel * this.zoomRange);
    });

    this.panorama.on('zoom-updated', (levelNum) => {
      if (levelNum >= minZoomNum && levelNum <= maxZoomNum) {
        this.setZoom(levelNum);
      }
    });

    this.panorama.on('zoom-updated', (levelNum) => {
      if (levelNum >= minZoomNum && levelNum <= maxZoomNum) {
        this.setZoom(levelNum);
      }
    });

    this.containerEl.addEventListener('mousewheel', (e) => this.handleMouseWheel(e));
    this.containerEl.addEventListener('DOMMouseScroll', (e) => this.handleMouseWheel(e));
  }

  componentWillUnmount() {
    this.panorama.destroy();
  }

  render() {
    return (
      <div className={`panorama ${this.state.status}`}>
        <div className={`panorama-controls`}>
          <div className={`zoom-controls`}>
            <div className={`zoom-out zoom`} onClick={this.handleZoomOut}></div>
            <div className={`zoom-in zoom`} onClick={this.handleZoomIn}></div>

            <div ref="slider" className={`slider`}>
              <div
                ref="indicator"
                className={`indicator`}
                style={ {transform: 'translateX(' + this.state.sliderPosition + 'px)'} }
                onMouseDown={this.handleSliderDrag}
                onTouchStart={this.handleSliderDrag}
              >
                {parseFloat(this.state.zoomLevel + 1).toPrecision(2)}
              </div>
            </div>
          </div>
          <div className={`fs-controls`}>
            <div className={`fs-button`} onClick={this.handleFullScreen}></div>
          </div>
        </div>
      </div>

    );
  }
}
