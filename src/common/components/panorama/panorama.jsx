import React from 'react';
import { findDOMNode } from 'react-dom';
import PhotoSphere from 'photo-sphere-viewer';
import PanoramaCompass from './panorama-compass/panorama-compass';
import PanoramaControls from './panorama-controls/panorama-controls';

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
      lat: undefined
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

  updateZoomLevel = (zoomLevel) => {
    zoomLevel = parseFloat(zoomLevel).toPrecision(1);
    this.onZoomUpdate(zoomLevel);
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

  onZoomUpdate = (zoomLevel) => {
    this.panorama.zoom(zoomRangeNum * zoomLevel);
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

    this.panorama.on('zoom-updated', (zoomLevelNum) => {
      if (zoomLevelNum >= minZoomNum && zoomLevelNum <= maxZoomNum) {
        const zoomLevel = zoomLevelNum / zoomRangeNum;
        this.setState({zoomLevel});
      }
    });

    this.panorama.on('position-updated', (long, lat) => {
      this.setState({long, lat});
    });
  };

  handleAccelerometerToggle = () => {
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
        <PanoramaCompass
          lat={this.state.lat}
          long={this.state.long}
        />

        <PanoramaControls
          zoomLevel={this.state.zoomLevel}
          zoomIn={this.handleZoomIn}
          zoomOut={this.handleZoomOut}
          onZoomUpdate={this.onZoomUpdate}
        />

        <div
          className={`toggle-accelerometer button ${this.state.status}`}
          onClick={this.handleAccelerometerToggle}
        >
          AC
        </div>

      </div>
    );
  }
}
