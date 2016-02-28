import React from 'react';
import { findDOMNode } from 'react-dom';
import PanoramaCompass from './compass/compass';
import FullBrowserSvg from '../../../assets/photo-essay-fullscreen-button.svg';
import PhotoSphere from 'photo-sphere-viewer';

const states = {
  LOADING: 'loading',
  INIT: 'init',
  ACCELEROMETER: 'accelerometer-on'
};

const minZoomNum = 0;
const maxZoomNum = 60;
const initZoomLevel = 0; // 0-1 corresponds to minZoomNum and maxZoomNum respectively
const zoomStep = 0.1;

const zoomRangeNum = maxZoomNum + minZoomNum;

export default class Panorama extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING,
      zoomLevel: initZoomLevel,
      long: undefined,
      lat: undefined,
      sliderPos: 0
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.src !== this.props.src) {
      this.setPanorama(newProps.src, newProps.initLong, newProps.initLat);
    }
  }

  static propTypes = {
    src: React.PropTypes.string.isRequired,
    initLong: React.PropTypes.number,
    initLat: React.PropTypes.number
  };

  static defaultProps = {
    initLong: 0,
    initLat: 0
  };

  isDraggingSlider = false;


  updateZoomLevel = (zoomLevel) => {
    zoomLevel = parseFloat(zoomLevel).toPrecision(1);
    this.panorama.zoom(zoomRangeNum * zoomLevel);
  };

  handleZoomIn = () => {
    if (this.state.zoomLevel < 1) {
      this.updateZoomLevel(this.state.zoomLevel + zoomStep);
    }
  };

  handleZoomOut = () => {
    if (this.state.zoomLevel > 0) {
      this.updateZoomLevel(this.state.zoomLevel - zoomStep);
    }
  };

  setZoom = (levelNum) => {
    const zoomLevel = levelNum / zoomRangeNum;
    const sliderPos = this.refs.slider.offsetWidth * zoomLevel - this.refs.indicator.offsetWidth * 0.5;
    this.setState({zoomLevel: zoomLevel, sliderPos: sliderPos});
    //console.log('levelNum:', levelNum, 'zoomLevel', zoomLevel)
  };

  doDrag = (coordX) => {
    if (this.isDraggingSlider) {
      const pos = coordX - this.refs.slider.getBoundingClientRect().left;
      const zoomLevel = Math.min(pos / this.refs.slider.offsetWidth, 1);
      this.panorama.zoom(zoomRangeNum * zoomLevel);
    }
  };

  stopDrag = () => {
    if (this.isDraggingSlider) {
      this.isDraggingSlider = false;
    }
  };

  handleSliderDrag = () => {
    this.isDraggingSlider = true;

    document.addEventListener('mousemove', (e) => this.doDrag(e.clientX));
    document.addEventListener('touchmove', (e) => this.doDrag(e.targetTouches[0].clientX));

    document.addEventListener('mouseup', () => this.stopDrag());
    document.addEventListener('touchend', () => this.stopDrag());
  };

  handleFullBrowserClick = () => {
    console.log('go full-browser')
  };

  handleMouseWheel = (e) => {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    (delta > 0) ? this.handleZoomIn() : this.handleZoomOut();
  };

  handleOrientationChange = (e) => {
    if (this.state.status === states.ACCELEROMETER) {
      const absolute = e.absolute;
      const alpha = e.alpha;

      const betaRad = e.beta * (Math.PI / 180);
      const gammaRad = e.gamma * (Math.PI / 180);
      console.log(absolute, alpha, betaRad, gammaRad)

      const long = gammaRad;
      const lat = betaRad;

      this.panorama.rotate(long, lat);
    }
  };

  setPanorama = (src = this.props.src, long = this.props.initLong, lat = this.props.initLat) => {
    if (this.panorama) this.panorama.destroy();

    this.panorama = PhotoSphere.PhotoSphereViewer({
      container: this.containerEl,
      panorama: src,
      time_anim: false,
      min_fov: minZoomNum,
      max_fov: maxZoomNum,
      mousewheel: false
    });

    this.panorama.on('ready', () => {
      this.setState({status: states.INIT, long: long, lat: lat});
      this.panorama.zoom(initZoomLevel * zoomRangeNum);
    });

    this.panorama.on('zoom-updated', (levelNum) => {
      if (levelNum >= minZoomNum && levelNum <= maxZoomNum) {
        this.setZoom(levelNum);
      }
    });

    this.panorama.on('position-updated', (long, lat) => {
      this.setState({long, lat});
    });
  };

  handleAccelerometerClick = () => {
    var state;
    if (this.state.status === states.ACCELEROMETER) {
      state = states.INIT;
      this.panorama.rotate(this.props.initLong, this.props.initLat);
    } else {
      state = states.ACCELEROMETER;
    }
    this.setState({status: state});
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.setPanorama();

    this.containerEl.addEventListener('mousewheel', (e) => this.handleMouseWheel(e));
    this.containerEl.addEventListener('DOMMouseScroll', (e) => this.handleMouseWheel(e));
    window.addEventListener('deviceorientation', this.handleOrientationChange);
  }

  componentWillUnmount() {
    this.panorama.destroy();
    window.removeEventListener('deviceorientation', this.handleOrientationChange);
  }

  render() {
    return (
      <div className={`panorama ${this.state.status}`}>
        <PanoramaCompass lat={this.state.lat} long={this.state.long}></PanoramaCompass>

        <div
          className={`toggle-accelerometer button ${this.state.status}`}
          onClick={this.handleAccelerometerClick}
        >
          AC
        </div>

        <div className={`panorama-controls`}>
          <div className={`zoom-controls`}>
            <div className={`zoom-out button`} onClick={this.handleZoomOut}>-</div>
            <div className={`zoom-in button`} onClick={this.handleZoomIn}>+</div>

            <div ref="slider" className={`slider`}>
              <div
                ref="indicator"
                className={`slider-indicator button`}
                style={ {transform: 'translateX(' + this.state.sliderPos + 'px)'} }
                onMouseDown={this.handleSliderDrag}
                onTouchStart={this.handleSliderDrag}
              >
                {parseFloat(this.state.zoomLevel + 1).toPrecision(2)}x
              </div>
            </div>
          </div>
          <div
            className={`fullbrowser-button button`}
            onClick={this.handleFullBrowserClick}
            dangerouslySetInnerHTML={{ __html: FullBrowserSvg }}
          ></div>
        </div>
      </div>
    );
  }
}
