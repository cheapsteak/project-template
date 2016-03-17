import React from 'react';
import { findDOMNode } from 'react-dom';
import FullBrowserSvg from 'svgs/icon-fullscreen.svg';
import IconArrowLeft from 'svgs/icon-zoom-arrow-left.svg';
import IconArrowRight from 'svgs/icon-zoom-arrow-right.svg';

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
    isFullBrowser: false
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

  handleFullBrowserClick = () => {
    this.setState({isFullBrowser: true});
    setTimeout(() => this.setIndicatorPos());
    console.log('go full-browser')
  };

  show = () => {
    this.containerEl.style.visibility = 'visible';
  };

  hide = () => {
    this.containerEl.style.visibility = 'hidden';
  };

  render() {
    const fullBrowserMode = this.state.isFullBrowser ? 'full-browser-mode' : '';

    return (
      <div className={`panorama-controls ${fullBrowserMode}`}>

        <div className={`zoom-controls`}>
          <div className={`zoom-controls-wrapper`}>
            <div
              className={`zoom-progress`}
              style={{width: this.state.progressWidth}}
            >
              <div className={`zoom-line`}></div>
            </div>

            <div className={`zoom-out button`} onClick={this.handleZoomOut}>-</div>
            <div className={`zoom-in button`} onClick={this.handleZoomIn}>+</div>

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
                <div className={`zoom-value`}>
                  {parseFloat(this.props.zoomLevel + 1).toPrecision(2)}x
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`full-browser-button-wrapper`}>
          <div
            className={`full-browser button`}
            onClick={this.handleFullBrowserClick}
            dangerouslySetInnerHTML={{ __html: FullBrowserSvg }}
          ></div>
        </div>

        <div className={`bottom-bar-wrapper`}>
          <div className={`bottom-bar`}></div>
        </div>
      </div>
    );
  }
}
