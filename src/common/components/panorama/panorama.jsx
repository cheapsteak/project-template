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
import IconCursor from 'svgs/icon-360-cursor.svg';
import IconAccelerometer from 'svgs/icon-toggle.svg';

const parallaxAmplitude = 50;

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

    if (detect.isTablet) {
      animate.to(this.refs.accelerometerToggle, 0, {y: '100%', autoAlpha: 0, ease: Expo.easeOut});
    }

    animate.set(this.refs.placeholderContainer, {autoAlpha: 0});

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

    if (detect.isTablet) {
      animate.to(this.refs.accelerometerToggle, 0.5, {y: '100%', autoAlpha: 0, ease: Expo.easeOut});
      this.orientationControls.disconnect();
      this.setState({status: states.IDLE});
    }
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

        if (detect.isTablet) {
          animate.to(this.refs.accelerometerToggle, 0.5, {y: '0%', autoAlpha: 1, ease: Expo.easeOut});
        }
      })
  };

  handleLeaveFullBrowser = () => {
    const clientRect = this.containerEl.parentNode.getBoundingClientRect();

    if (detect.isMobile) {
      animate.to(this.refs.touchOverlay, 0.5, {autoAlpha: 1, delay: 0.1});
    }

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

  initNewPanorama = (src, long, lat) => {
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

      if (this.isShowingPlaceholder) {
        this.isShowingPlaceholder = false;
        this.setPosterToPanoramaTransition();
      }
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

  setPanoramaToPosterTransition = (src, long, lat) => {
    const scale = (this.refs.placeholder.offsetHeight - parallaxAmplitude) / this.refs.placeholder.offsetHeight;

    animate.set([this.refs.placeholderContainer, this.refs.placeholder], {autoAlpha: 1, scale: 1});
    animate.set(this.refs.psvInjectTarget, {autoAlpha: 0});

    animate.to(this.refs.placeholder, 0.6, {
        autoAlpha: 0.2,
        scale: scale,
        ease: ViniEaseOut
      })
      .then(() => {
        this.initNewPanorama(src, long, lat);
      });
  };

  setPosterToPanoramaTransition = () => {
    const canvasContainer = document.querySelector('.psv-canvas-container');
    const scale = (canvasContainer.offsetHeight + parallaxAmplitude) / canvasContainer.offsetHeight;

    // set timeout to improve transition performance
    setTimeout(() => {
      animate.set(this.refs.psvInjectTarget, {autoAlpha: 1});
      animate.set(canvasContainer, {scale, autoAlpha: 0});

      animate.to(this.refs.placeholderContainer, 0.4, {autoAlpha: 0});

      animate.to(canvasContainer, 0.8, {
        scale: 1,
        ease: ViniEaseOut,
      });
      animate.to(canvasContainer, 1, {
        autoAlpha: 1,
        ease: Linear.easeNone,
      })

    }, 200);
  };

  setPanorama = (src = this.props.src, long = this.props.initLong, lat = this.props.initLat) => {
    if (this.props.src && !detect.isPhone) {
      // draw current panorama to placeholder canvas before swapping source
      this.drawPlaceholderCanvas(src, long, lat);
    } else {
      this.initNewPanorama(src, long, lat);
    }
  };

  handleAccelerometerClick = () => {
    var status;
    if (this.state.status === states.ACCELEROMETER) {
      status = states.INIT;
      this.orientationControls.disconnect();
      this.panorama.rotate(this.props.initLong, this.props.initLat);
    } else {
      this.updateZoomLevel(0);
      status = states.ACCELEROMETER;
      this.orientationControls.connect();
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
      animate.to(this.refs.touchOverlay, 0.3, {autoAlpha: 0});
      this.handleLeaveIdle();
      setTimeout(() => {
        this.handleEnterFullBrowser();
      }, 300);
    }
  };

  drawPlaceholderCanvas = (src, long, lat) => {
    const sourceCanvas = document.querySelector('.psv-canvas-container canvas');

    var targetCanvas = this.refs.placeholder;
    var targetCanvasContext = targetCanvas.getContext('2d');
    targetCanvas.width = sourceCanvas.width;
    targetCanvas.height = sourceCanvas.height;

    var img = new Image();
    img.onload = () => {
      targetCanvasContext.drawImage(img, 0, 0, targetCanvas.width, targetCanvas.height);

      this.isShowingPlaceholder = true;
      this.setPanoramaToPosterTransition(src, long, lat);
    };

    img.src = sourceCanvas.toDataURL('image/png', 1);
  };

  render() {
    const isMobile = this.state.isMobile;
    const isTablet = detect.isTablet;
    const isPhone = detect.isPhone;

    const controls = (
      <PanoramaControls
        zoomLevel={this.state.zoomLevel}
        modes={{...modes}}
        currMode={this.state.mode}
      />
    );

    const accelerometerToggle = !isMobile ? null : (
      <div
        ref="accelerometerToggle"
        className={`accelerometer button ${this.state.status}`}
        onClick={this.handleAccelerometerClick}
      >
        <div className={`accelerometer-icon`} dangerouslySetInnerHTML={{ __html: IconAccelerometer }}></div>
      </div>
    );

    const menu = this.props.hasMenu ? (
      <PanoramaMenu
        modes={{...modes}}
        currMode={this.state.mode}
        setPanorama={this.props.setPanorama}
        className={isTablet?'is-tablet':''}
      />
    ) : null;

    return (
      <div
        className={`panorama ${this.state.status} ${this.props.className} ${isTablet ? 'is-tablet': (isPhone?'is-phone':'')}`}
        onMouseMove={this.handleMouseMove}
      >
        <PanoramaCompass
          rotation={this.state.rotation.x * 180 / Math.PI}
          modes={{...modes}}
          currMode={this.state.mode}
          className={isTablet ? 'is-tablet': (isPhone?'is-phone':'')}
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

        <PanoramaControls
          zoomLevel={this.state.zoomLevel}
          modes={{...modes}}
          currMode={this.state.mode}
        />

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

        {accelerometerToggle}

        <div className="parallax-target-wrapper psv-inject-target-wrapper">
          <div ref="psvInjectTarget" className="parallax-target psv-inject-target"></div>
          <div ref="placeholderContainer" className="panorama-placeholder-container parallax-target">
            <canvas ref="placeholder" className={`panorama-placeholder`}></canvas>
          </div>
        </div>

        {isTablet && <div
          ref="touchOverlay"
          className={`touch-overlay`}
          onClick={this.handleMobileOverlayClick}
        >
          <div className={`cta-container`}>
            <div className={`overlay-icon`} dangerouslySetInnerHTML={{ __html: IconCursor }}>
            </div>
            <p>Tap to interact</p>
          </div>
        </div>
        }

      </div>
    );
  }
}
