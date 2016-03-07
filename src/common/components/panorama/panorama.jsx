import React from 'react';
import { findDOMNode } from 'react-dom';
import PhotoSphere from 'photo-sphere-viewer';
import THREE from 'three';
import raf from 'raf';
import deviceOrientation from '../../utils/three-device-orientation';

import PanoramaCompass from './panorama-compass/panorama-compass';
import PanoramaControls from './panorama-controls/panorama-controls';

const states = {
  LOADING: 'loading',
  INIT: 'init',
  ACCELEROMETER: 'accelerometer-on'
};

const minZoomNum = 0;    // 1x
const maxZoomNum = 60;   // 2x
const initZoomLevel = 0; // from 0 to 1, corresponds to minZoomNum and maxZoomNum
const zoomStep = 0.1;

const zoomRangeNum = maxZoomNum + minZoomNum;

export default class Panorama extends React.Component {

  static propTypes = {
    src: React.PropTypes.string.isRequired,
    initLong: React.PropTypes.number,
    initLat: React.PropTypes.number
  };

  static defaultProps = {
    initLong: 0,
    initLat: 0
  };

  state = {
    status: states.LOADING,
    zoomLevel: initZoomLevel,
    long: undefined,
    lat: undefined,
    rotation: {x: 0, y: 0}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.src !== this.props.src) {
      this.setPanorama(newProps.src, newProps.initLong, newProps.initLat);
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.setPanorama();

    //this.containerEl.addEventListener('mousewheel', this.handleMouseWheel);
    //this.containerEl.addEventListener('DOMMouseScroll', this.handleMouseWheel);
  }

  componentWillUnmount() {
    this.panorama.destroy();
    this.orientationControls.disconnect();
  }

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

  //handleMouseWheel = (e) => {
  //  const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  //  (delta > 0) ? this.zoomIn() : this.zoomOut();
  //};

  setOrientationControls = () => {
    this.orientationControls = new THREE.DeviceOrientationControls(this.panorama.camera);

    const _this = this;

    raf(function tick() {
      if (!_this.panorama.renderer) return;
      _this.orientationControls.update();

      _this.panorama.renderer.render(_this.panorama.scene, _this.panorama.camera);

      if (_this.state.status === states.ACCELEROMETER) {
        const x = -_this.orientationControls.getRotation().x;
        const y = -_this.orientationControls.getRotation().y;

        if (_this.state.rotation.x !== x) {
          const rotation = {x, y};
          _this.setState({rotation});
        }
      }
      //console.log('raf loop');
      raf(tick);
    });
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
      this.setOrientationControls();
    });

    this.panorama.on('zoom-updated', (zoomLevelNum) => {
      if (zoomLevelNum >= minZoomNum && zoomLevelNum <= maxZoomNum) {
        const zoomLevel = zoomLevelNum / zoomRangeNum;
        this.setState({zoomLevel});
      }
    });

    this.panorama.on('position-updated', (long, lat) => {
      var rotation = {x: long, y: lat};
      this.setState({long, lat, rotation});
    });
  };

  handleAccelerometerClick = () => {
    var status;
    if (this.state.status === states.ACCELEROMETER) {
      status = states.INIT;
      this.refs.controls.show();
      this.orientationControls.disconnect();
      this.panorama.rotate(this.props.initLong, this.props.initLat);
    } else {
      this.updateZoomLevel(0);
      status = states.ACCELEROMETER;
      this.refs.controls.hide();
      this.orientationControls.connect();
    }
    this.setState({status});
  };

  render() {
    return (
      <div className={`panorama ${this.state.status}`}>
        <PanoramaCompass
          ref="compass"
          long={this.state.rotation.x}
          lat={this.state.rotation.y}
        />

        <PanoramaControls
          ref="controls"
          zoomLevel={this.state.zoomLevel}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
          onZoomUpdate={this.onZoomUpdate}
        />

        <div className={`accelerometer button ${this.state.status}`} onClick={this.handleAccelerometerClick}>AC</div>
      </div>
    );
  }
}
