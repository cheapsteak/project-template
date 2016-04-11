import React from 'react';
import {findDOMNode} from 'react-dom';
import PhotoSphere from 'photo-sphere-viewer-sa';
import raf from 'raf';
import deviceOrientation from '../../utils/three-device-orientation';
import animate from 'gsap-promise';
import detect from '../../utils/detect';
import TransitionGroup from 'react-addons-transition-group';
import IconClose from 'svgs/icon-close.svg';
import RectangularButton from 'common/components/rectangular-button/rectangular-button.jsx';
import PanoramaCompass from './panorama-compass/panorama-compass';
import PanoramaControls from './panorama-controls/panorama-controls';
import PanoramaMenu from './panorama-menu/panorama-menu';
import PanoramaCursor from './panorama-cursor/panorama-cursor';
import PanoramaLoader from './panorama-loader/panorama-loader';

const states = {
  LOADING: 'loading',
  INIT: 'init',
  ACCELEROMETER: 'accelerometer-on'
};

const modes = {
  ENTER_IDLE: 'ENTER_IDLE',
  LEAVE_IDLE: 'LEAVE_IDLE',
  ENTER_FB: 'ENTER_FB',
  LEAVE_FB: 'LEAVE_FB'
};

const minZoomNum = 0;    // 1x
const maxZoomNum = 60;   // 2x
const initZoomLevel = 0; // from 0 to 1, corresponds to minZoomNum and maxZoomNum
const zoomStep = 0.1;

const zoomRangeNum = maxZoomNum + minZoomNum;

export default class Panorama extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    src: React.PropTypes.string,
    initLong: React.PropTypes.number,
    initLat: React.PropTypes.number,
    hasMenu: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    initLong: 0,
    initLat: 0
  };

  state = {
    status: undefined,
    zoomLevel: initZoomLevel,
    long: undefined,
    lat: undefined,
    rotation: {x: 0, y: 0},
    mode: modes.ENTER_IDLE,
    cursorPos: {x: 0, y: 0},
    cursorIsVisible: true,
    isMobile: detect.isMobile
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(newProps) {
    if (newProps.src && newProps.src !== this.props.src) {
      this.setPanorama(newProps.src, newProps.initLong, newProps.initLat);
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.props.src && this.setPanorama();

    this.context.eventBus.on('zoomUpdate', this.onZoomUpdate);
    this.context.eventBus.on('zoomIn', this.zoomIn);
    this.context.eventBus.on('zoomOut', this.zoomOut);

    this.context.eventBus.on('leaveIdle', this.handleLeaveIdle);
    this.context.eventBus.on('enterFullBrowser', this.handleEnterFullBrowser);
    this.context.eventBus.on('leaveFullBrowser', this.handleLeaveFullBrowser);

    //this.containerEl.addEventListener('mousewheel', this.handleMouseWheel);
    //this.containerEl.addEventListener('DOMMouseScroll', this.handleMouseWheel);
  }

  componentWillUnmount() {
    try {
      this.panorama.destroy();
      this.orientationControls.disconnect();
    } catch (e) {
      console.log('couldnt properly destroy panorama');
    }

    this.context.eventBus.off('zoomUpdate', this.onZoomUpdate);
    this.context.eventBus.off('zoomIn', this.zoomIn);
    this.context.eventBus.off('zoomOut', this.zoomOut);

    this.context.eventBus.off('leaveIdle', this.handleLeaveIdle);
    this.context.eventBus.off('enterFullBrowser', this.handleEnterFullBrowser);
    this.context.eventBus.off('leaveFullBrowser', this.handleLeaveFullBrowser);

    //this.containerEl.removeEventListener('mousewheel', this.handleMouseWheel);
    //this.containerEl.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
  }

  handleCloseClick = () => {
    this.setState({mode: modes.LEAVE_FB});
    animate.to(this.refs.closeButton, 0.5, {y: '-100%', autoAlpha: 0, ease: Expo.easeOut});
  };

  handleLeaveIdle = () => {
    this.setState({mode: modes.LEAVE_IDLE});
  };

  handleEnterFullBrowser = () => {
    const clientRect = this.containerEl.getBoundingClientRect();
    animate.set(this.containerEl, {
      position: 'fixed',
      top: clientRect.top,
      left: clientRect.left,
      width: clientRect.width,
      height: clientRect.height,
      zIndex: 1000
    });

    animate.to(this.containerEl, 0.4, {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        ease: Expo.easeOut,
        onUpdate: () => this.panorama.resize(this.refs.psvInjectTarget.offsetWidth, this.refs.psvInjectTarget.offsetHeight)
      })
      .then(() => {
        this.setState({mode: modes.ENTER_FB});
        animate.to(this.refs.closeButton, 0.5, {y: '0%', autoAlpha: 1, ease: Expo.easeOut});
      })
  };

  handleLeaveFullBrowser = () => {
    const clientRect = this.containerEl.parentNode.getBoundingClientRect();
    animate.to(this.containerEl, 0.4, {
        top: clientRect.top,
        left: clientRect.left,
        width: clientRect.width,
        height: clientRect.height,
        ease: Expo.easeOut,
        onUpdate: () => this.panorama.resize(this.refs.psvInjectTarget.offsetWidth, this.refs.psvInjectTarget.offsetHeight)
      })
      .then(() => {
        animate.set(this.containerEl, {clearProps: 'all'});
        this.setState({mode: modes.ENTER_IDLE});
        if (detect.isMobile) animate.set(this.refs.touchOverlay, {autoAlpha: 1});
      })
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

  // handleMouseWheel = (e) => {
  //   const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  //   (delta > 0) ? this.zoomIn() : this.zoomOut();
  // };

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
      raf(tick);
    });
  };

  setPanorama = (src = this.props.src, long = this.props.initLong, lat = this.props.initLat) => {
    if (this.panorama) this.panorama.destroy();

    this.setState({status: states.LOADING});

    this.panorama = PhotoSphere.PhotoSphereViewer({
      container: this.refs.psvInjectTarget,
      panorama: src,
      time_anim: false,
      min_fov: minZoomNum,
      max_fov: maxZoomNum,
      mousewheel: false,
      mousemove: true
    });

    this.panorama.on('ready', () => {
      this.setState({status: states.INIT, long: long, lat: lat});
      this.panorama.rotate(long, lat);
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
      const rotation = {
        x: long - this.props.initLong,
        y: lat - this.props.initLat
      };
      this.setState({long, lat, rotation});
    });
  };

  handleAccelerometerClick = () => {
    var status;
    if (this.state.status === states.ACCELEROMETER) {
      status = states.INIT;
      this.orientationControls.disconnect();
      this.panorama.rotate(this.props.initLong, this.props.initLat);
      if (detect.isMobile) animate.set(this.refs.touchOverlay, {autoAlpha: 1});
    } else {
      this.updateZoomLevel(0);
      status = states.ACCELEROMETER;
      this.orientationControls.connect();
      if (detect.isMobile) animate.set(this.refs.touchOverlay, {autoAlpha: 0});
    }
    this.setState({status});
  };

  handleMouseMove = (e) => {
    const target = e.target;
    const targetClassName = target.className;

    if (targetClassName !== 'psv-hud') {
      this.setState({cursorIsVisible: false});
      return;
    }

    if (!this.state.cursorIsVisible) this.setState({cursorIsVisible: true});
    this.setState({
      cursorPos: {
        x: e.clientX - target.getBoundingClientRect().left,
        y: e.clientY - target.getBoundingClientRect().top
      }
    });
  };

  handleMobileOverlayClick = () => {
    if (detect.isMobile && this.state.mode === modes.ENTER_IDLE) {
      animate.set(this.refs.touchOverlay, {autoAlpha: 0});
      this.handleLeaveIdle();
      setTimeout(() => {
        this.handleEnterFullBrowser();
      }, 300);
    }
  };

  render() {
    const isMobile = this.state.isMobile;

    const controls = /*isMobile ? null :*/ (
      <PanoramaControls
        zoomLevel={this.state.zoomLevel}
        modes={{...modes}}
        currMode={this.state.mode}
      />
    );

    const accelerometerToggle = !isMobile ? null : (
      <div
        className={`accelerometer button ${this.state.status}`}
        onClick={this.handleAccelerometerClick}
      >
        <span>AC</span>
      </div>
    );

    const closeButton = /*isMobile ? null :*/ (
      <div
        ref="closeButton"
        className={`close-btn`}
        onClick={this.handleCloseClick}
      >
        <RectangularButton
          style={{width: '100%', height: '100%'}}
          text={`Close`}
          color={`#fff`}
          svgIcon={IconClose}
          backgroundColor={`#f7910b`}
          hoverBackgroundColor={`#de8209`}
        />
      </div>
    );

    const menu = this.props.hasMenu ? (
      <PanoramaMenu
        modes={{...modes}}
        currMode={this.state.mode}
        setPanorama={this.props.setPanorama}
        className={isMobile?'is-mobile':''}
      />
    ) : null;

    return (
      <div
        className={`panorama ${this.state.status} ${this.props.className} ${isMobile ? 'is-mobile' : ''}`}
        onMouseMove={this.handleMouseMove}
      >
        <PanoramaCompass
          rotation={this.state.rotation.x * 180 / Math.PI}
          modes={{...modes}}
          currMode={this.state.mode}
        />

        <PanoramaCursor
          isVisible={this.state.cursorIsVisible}
          cursorPos={this.state.cursorPos}
        />

        <TransitionGroup>
          {
            this.state.status === states.LOADING && <PanoramaLoader />
          }
        </TransitionGroup>

        {menu}
        {controls}
        {accelerometerToggle}
        {closeButton}

        <div className="parallax-target-wrapper psv-inject-target-wrapper">
          <div ref="psvInjectTarget" className="parallax-target psv-inject-target">
          </div>
        </div>

        {isMobile && <div
          ref="touchOverlay"
          className={`touch-overlay`}
          onClick={this.handleMobileOverlayClick}
        >
          Click to interact
        </div>
        }

      </div>
    );
  }
}
