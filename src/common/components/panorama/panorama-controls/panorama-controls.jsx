import React from 'react';
import {findDOMNode} from 'react-dom';
import FullBrowserSvg from 'svgs/icon-fullscreen.svg';
import IconArrowLeft from 'svgs/icon-zoom-arrow-left.svg';
import IconArrowRight from 'svgs/icon-zoom-arrow-right.svg';
import animate from 'gsap-promise';

export default class PanoramaControls extends React.Component {

  static propTypes = {
    zoomLevel: React.PropTypes.number,
    zoomIn: React.PropTypes.func,
    zoomOut: React.PropTypes.func,
    onZoomUpdate: React.PropTypes.func
  };

  static defaultProps = {
    zoomLevel: 0,
    zoomIn: () => console.log('zoomIn'),
    zoomOut: () => console.log('zoomOut'),
    onZoomUpdate: (zoomLevel) => console.log('onZoomUpdate: zoomLevel:', zoomLevel)
  };

  state = {
    sliderPos: 0,
    progressWidth: null,
    isDraggingSlider: false,
    isFullBrowser: false,
    enableMasking: false
  };

  componentWillReceiveProps(newProps) {
    if (newProps.zoomLevel !== this.props.zoomLevel) {
      this.setIndicatorPos(newProps.zoomLevel);
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.setIndicatorPos();
  }

  doDrag = (coordX) => {
    if (this.state.isDraggingSlider) {
      const pos = coordX - this.refs.slider.getBoundingClientRect().left;
      const zoomLevel = Math.min(pos / this.refs.slider.offsetWidth, 1);
      this.props.onZoomUpdate(zoomLevel);
    }
  };

  stopDrag = () => {
    if (this.state.isDraggingSlider) {
      this.setState({isDraggingSlider: false});
    }
  };

  handleSliderDrag = () => {
    this.setState({isDraggingSlider: true});

    document.addEventListener('mousemove', (e) => this.doDrag(e.clientX));
    document.addEventListener('touchmove', (e) => this.doDrag(e.targetTouches[0].clientX));

    document.addEventListener('mouseup', () => this.stopDrag());
    document.addEventListener('touchend', () => this.stopDrag());
  };

  setIndicatorPos = (zoomLevel = this.props.zoomLevel) => {
    const sliderPos = this.refs.slider.offsetWidth * zoomLevel - this.refs.indicator.offsetWidth * 0.5;

    const sliderMargin = parseFloat(window.getComputedStyle(this.refs.slider).getPropertyValue('margin-left'));
    const progressWidth = this.refs.slider.offsetWidth * zoomLevel + sliderMargin;
    this.setState({sliderPos, progressWidth});
  };

  handleZoomIn = () => {
    this.props.zoomIn();
  };

  handleZoomOut = () => {
    this.props.zoomOut();
  };

  resetUI = () => {
    return animate.set([
      this.refs.zoomLine,
      this.refs.zoomValue,
      this.refs.zoomControls,
      this.refs.fullBrowserButton,
      this.refs.bottomBar
    ], {clearProps: 'all'});
  };

  animateOutBeforeFullBrowser = () => {
    return animate.staggerTo([this.refs.zoomLine, this.refs.zoomValue], 0.2, {
        y: -10,
        autoAlpha: 0,
        ease: Expo.easeOut
      }, 0.1)
      .then(() => {
        this.setState({enableMasking: true});
        return animate.all([
          animate.to([this.refs.zoomControls, this.refs.fullBrowserButton], 0.9, {y: '100%', ease: Expo.easeOut}),
          animate.to(this.refs.bottomBar, 0.9, {y: '-100%', ease: Expo.easeOut})
        ])
      });
  };

  animateInOnEnterFullBrowser = () => {
    const ui = [this.refs.zoomOutButton, this.refs.slider, this.refs.zoomInButton];
    const durBasedOnZoom = this.props.zoomLevel * 0.15;

    return animate.all([
      animate.from(this.containerEl, 1, {y: '160%', ease: Expo.easeOut}),
      animate.from(this.refs.bottomBarWrapper, 1.2, {y: '-200%', ease: Expo.easeOut}),
      animate.from(this.refs.zoomProgress, durBasedOnZoom + 0.5, {width: 0, ease: Expo.easeOut, delay: 0.6}),
      animate.staggerFrom(ui, 0.5, {y: 20, autoAlpha: 0, ease: Expo.easeOut, delay: durBasedOnZoom + 1}, 0.1)
    ]);

  };

  handleFullBrowserClick = () => {
    this.animateOutBeforeFullBrowser()
      .then(() => {
        this.setState({isFullBrowser: true});
        setTimeout(() => {
          this.setState({enableMasking: false});
          this.resetUI();
          this.setIndicatorPos();
          this.animateInOnEnterFullBrowser();
        });
      });
  };

  show = () => {
    this.containerEl.style.visibility = 'visible';
  };

  hide = () => {
    this.containerEl.style.visibility = 'hidden';
  };

  render() {
    const fullBrowserMode = this.state.isFullBrowser ? 'full-browser-mode' : '';
    const maskState = this.state.enableMasking ? 'mask' : '';

    return (
      <div className={`panorama-controls ${fullBrowserMode}`}>

        <div className={`zoom-controls-wrapper ${maskState}`}>
          <div ref="zoomControls" className={`zoom-controls`}>
            <div
              ref="zoomProgress"
              className={`zoom-progress`}
              style={{width: this.state.progressWidth}}
            >
              <div ref="zoomLine" className={`zoom-line`}></div>
            </div>

            <div ref="zoomOutButton" className={`zoom-out button`} onClick={this.handleZoomOut}>-</div>
            <div ref="zoomInButton" className={`zoom-in button`} onClick={this.handleZoomIn}>+</div>

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
            onClick={this.handleFullBrowserClick}
            dangerouslySetInnerHTML={{ __html: FullBrowserSvg }}
          ></div>
        </div>

        <div ref="bottomBarWrapper" className={`bottom-bar-wrapper`}>
          <div ref="bottomBar" className={`bottom-bar`}></div>
        </div>
      </div>
    );
  }
}
