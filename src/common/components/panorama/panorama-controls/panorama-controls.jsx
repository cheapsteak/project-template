import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import Promise from 'bluebird';
import detector from '../../../utils/detect';

import IconFullBrowser from 'svgs/icon-fullscreen.svg';
import IconArrowLeft from 'svgs/icon-zoom-arrow-left.svg';
import IconArrowRight from 'svgs/icon-zoom-arrow-right.svg';

export default class PanoramaControls extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    zoomLevel: React.PropTypes.number,
    modes: React.PropTypes.object,
    currMode: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {
    sliderPos: 0,
    progressWidth: null,
    isDraggingSlider: false,
    isFullBrowser: false,
    enableMasking: false
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(newProps) {
    if (newProps.zoomLevel !== this.props.zoomLevel) {
      this.setIndicatorPos(newProps.zoomLevel);
    }

    if (newProps.currMode !== this.currMode) {
      this.currMode = newProps.currMode;

      switch (newProps.currMode) {
        case this.props.modes.ENTER_IDLE:
          this.animateOnEnterIdle();
          break;
        case this.props.modes.LEAVE_IDLE:
          this.animateOnLeaveIdle();
          break;
        case this.props.modes.ENTER_FB:
          this.animateOnEnterFullBrowser();
          break;
        case this.props.modes.LEAVE_FB:
          this.animateOnLeaveFullBrowser();
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.setIndicatorPos();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.doDrag);
    document.removeEventListener('touchmove', this.doDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchend', this.stopDrag);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setIndicatorPos();
  };

  doDrag = (e) => {
    const coordX = (detector.isMobile) ? e.targetTouches[0].clientX : e.clientX;
    if (this.state.isDraggingSlider) {
      const pos = coordX - this.refs.slider.getBoundingClientRect().left;
      const zoomLevel = Math.min(pos / this.refs.slider.offsetWidth, 1);
      this.context.eventBus.emit('zoomUpdate', zoomLevel);
    }
  };

  stopDrag = () => {
    if (this.state.isDraggingSlider) {
      this.setState({isDraggingSlider: false});
      audio.play('button-click');
    }
  };

  handleSliderDrag = () => {
    audio.play('button-click');
    this.setState({isDraggingSlider: true});

    document.addEventListener('mousemove', this.doDrag);
    document.addEventListener('touchmove', this.doDrag);

    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('touchend', this.stopDrag);
  };

  setIndicatorPos = (zoomLevel = this.props.zoomLevel) => {
    const sliderPos = this.refs.slider.offsetWidth * zoomLevel - this.refs.indicator.offsetWidth * 0.5;

    const sliderMargin = parseFloat(window.getComputedStyle(this.refs.slider).getPropertyValue('margin-left'));
    const progressWidth = this.refs.slider.offsetWidth * zoomLevel + sliderMargin;
    this.setState({sliderPos, progressWidth});
  };

  handleMouseEnter = () => {
    audio.play('button-rollover');
  };

  handleZoomIn = () => {
    this.context.eventBus.emit('zoomIn');
    audio.play('button-click');
  };

  handleZoomOut = () => {
    this.context.eventBus.emit('zoomOut');
    audio.play('button-click');
  };

  resetUI = () => {
    return animate.set([
      this.containerEl,
      this.refs.zoomLine,
      this.refs.zoomValue,
      this.refs.zoomControls,
      this.refs.fullBrowserButton,
      this.refs.bottomBar
    ], {clearProps: 'all'});
  };

  animateOnEnterIdle = () => {
    const ui = [this.refs.zoomOutButton, this.refs.slider, this.refs.zoomInButton];
    const durBasedOnZoom = this.props.zoomLevel * 0.15;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setIndicatorPos();

        return animate.all([
            animate.to([this.refs.zoomControls, this.refs.fullBrowserButton], 0.8, {y: '0%', ease: Expo.easeOut}),
            animate.to(this.refs.bottomBar, 0.8, {y: '0%', ease: Expo.easeOut})
              .then(() => this.setState({enableMasking: false})),
            animate.from(this.refs.zoomProgress, durBasedOnZoom + 0.6, {width: 0, ease: Expo.easeOut, delay: 0.7}),
            animate.staggerFrom(ui, 0.7, {y: 20, autoAlpha: 0, ease: Expo.easeOut, delay: durBasedOnZoom + 0.9}, 0.1)
          ])
          .then(() => resolve())
      });
    });
  };

  animateOnLeaveIdle = () => {
    return animate
      .staggerTo([this.refs.zoomLine, this.refs.zoomValue], 0.15, {y: -10, autoAlpha: 0, ease: Expo.easeOut}, 0.1)
      .then(() => {
        this.setState({enableMasking: true});
        return animate.all([
          animate.to([this.refs.zoomControls, this.refs.fullBrowserButton], 0.6, {y: '100%', ease: Expo.easeOut}),
          animate.to(this.refs.bottomBar, 0.6, {y: '-100%', ease: Expo.easeOut})
        ])
      })
      .then(() => {
        this.context.eventBus.emit('enterFullBrowser');
      })
  };

  animateOnEnterFullBrowser = () => {
    const ui = [this.refs.zoomOutButton, this.refs.slider, this.refs.zoomInButton];
    const durBasedOnZoom = this.props.zoomLevel * 0.15;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({enableMasking: false, isFullBrowser: true});
        this.resetUI();
        this.setIndicatorPos();

        animate.all([
            animate.from(this.containerEl, 1, {y: '160%', ease: Expo.easeOut}),
            animate.from(this.refs.bottomBarWrapper, 0.8, {y: -100, ease: Expo.easeOut}),
            animate.from(this.refs.zoomProgress, durBasedOnZoom + 0.6, {width: 0, ease: Expo.easeOut, delay: 0.6}),
            animate.staggerFrom(ui, 0.7, {y: 20, autoAlpha: 0, ease: Expo.easeOut, delay: durBasedOnZoom + 0.8}, 0.1)
          ])
          .then(() => resolve())
      });
    });
  };

  animateOnLeaveFullBrowser = () => {
    return animate.all([
        animate.to(this.refs.bottomBar, 0.5, {y: '-100%', ease: Expo.easeOut}),
        animate.to(this.containerEl, 0.7, {y: '160%', ease: Expo.easeOut})
      ])
      .then(() => {
        this.resetUI();
        this.setState({enableMasking: true, isFullBrowser: false});
        animate.set([this.refs.zoomControls, this.refs.fullBrowserButton], {y: '100%'});
        animate.set(this.refs.bottomBar, {y: '-100%'});
      })
      .then(() => {
        this.context.eventBus.emit('leaveFullBrowser');
      })
  };

  handleFullBrowserClick = () => {
    audio.play('button-click');
    this.context.eventBus.emit('leaveIdle');
  };

  render() {
    const fullBrowserMode = this.state.isFullBrowser ? 'full-browser-mode' : '';
    const maskState = this.state.enableMasking ? 'mask' : '';

    return (
      <div className={`panorama-controls ${fullBrowserMode} ${this.props.className}`}>

        <div className={`zoom-controls-wrapper ${maskState}`}>
          <div ref="zoomControls" className={`zoom-controls`}>
            <div
              ref="zoomProgress"
              className={`zoom-progress`}
              style={{width: this.state.progressWidth}}
            >
              <div ref="zoomLine" className={`zoom-line`}></div>
            </div>

            <div
              ref="zoomOutButton"
              className={`zoom-out button`}
              onClick={this.handleZoomOut}
              onMouseEnter={this.handleMouseEnter}
            >
              <span>-</span>
            </div>

            <div
              ref="zoomInButton"
              className={`zoom-in button`}
              onClick={this.handleZoomIn}
              onMouseEnter={this.handleMouseEnter}
            >
              <span>+</span>
            </div>

            <div ref="slider" className={`slider`}>
              <div
                ref="indicator"
                className={`slider-indicator button`}
                style={{
                transform: 'translateX(' + this.state.sliderPos + 'px)',
                WebkitTransform: 'translateX(' + this.state.sliderPos + 'px)'
              }}
                onMouseDown={this.handleSliderDrag}
                onTouchStart={this.handleSliderDrag}
                onMouseEnter={this.handleMouseEnter}
              >
                <div className={`arrow left`} dangerouslySetInnerHTML={{ __html: IconArrowLeft }}></div>
                <div className={`circle`}></div>
                <div className={`arrow right`} dangerouslySetInnerHTML={{ __html: IconArrowRight }}></div>
                <div ref="zoomValue" className={`zoom-value`}>
                  {parseFloat(this.props.zoomLevel + 1).toPrecision(2)}x
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`full-browser-button-wrapper`}>
          <div
            ref="fullBrowserButton"
            className={`full-browser button`}
            onMouseEnter={this.handleMouseEnter}
            onClick={this.handleFullBrowserClick}
            dangerouslySetInnerHTML={{ __html: IconFullBrowser }}
          ></div>
        </div>

        <div ref="bottomBarWrapper" className={`bottom-bar-wrapper`}>
          <div ref="bottomBar" className={`bottom-bar`}></div>
        </div>
      </div>
    );
  }
}
