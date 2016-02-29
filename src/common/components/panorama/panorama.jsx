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
const deg2rad = Math.PI / 180;

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

  zoomIn = () => {
    if (this.state.zoomLevel < 1) {
      this.updateZoomLevel(this.state.zoomLevel + zoomStep);
    }
  };

  zoomOut = () => {
    if (this.state.zoomLevel > 0) {
      this.updateZoomLevel(this.state.zoomLevel - zoomStep);
    }
  };

  onZoomUpdate = (zoomLevel) => {
    this.panorama.zoom(zoomRangeNum * zoomLevel);
  };

  handleMouseWheel = (e) => {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    (delta > 0) ? this.zoomIn() : this.zoomOut();
  };

  handleDeviceOrientation = (e) => {
    if (this.state.status === states.ACCELEROMETER) {
      const landscape = window.innerWidth > window.innerHeight;
      var long, lat;

      if (landscape) {
        long = -(e.alpha) * deg2rad;
        lat = -(e.gamma + 90) * deg2rad;
      } else {
        long = -e.alpha * deg2rad;
        lat = (e.beta - 90) * deg2rad;
      }

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

  handleAccelerometerClick = () => {
    var status;
    if (this.state.status === states.ACCELEROMETER) {
      status = states.INIT;
      this.panorama.rotate(this.props.initLong, this.props.initLat);
    } else {
      status = states.ACCELEROMETER;
    }
    this.setState({status});
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.setPanorama();

    this.containerEl.addEventListener('mousewheel', this.handleMouseWheel);
    this.containerEl.addEventListener('DOMMouseScroll', this.handleMouseWheel);
    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  componentWillUnmount() {
    this.panorama.destroy();
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  render() {
    return (
      <div className={`panorama ${this.state.status}`}>
        <PanoramaCompass
          long={this.state.long}
          lat={this.state.lat}
        />

        <PanoramaControls
          zoomLevel={this.state.zoomLevel}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
          onZoomUpdate={this.onZoomUpdate}
        />

        <div className={`accelerometer button ${this.state.status}`} onClick={this.handleAccelerometerClick}>
          AC
        </div>

      </div>
    );
  }
}
