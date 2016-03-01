import React from 'react';
import { findDOMNode } from 'react-dom';
import FullBrowserSvg from '../../../../assets/photo-essay-fullscreen-button.svg';


export default class PanoramaControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderPos: 0
    }
  }

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

  componentWillReceiveProps(newProps) {
    if (newProps.zoomLevel !== this.props.zoomLevel) {
      this.setIndicatorPos(newProps.zoomLevel);
    }
  }

  isDraggingSlider = false;

  doDrag = (coordX) => {
    if (this.isDraggingSlider) {
      const pos = coordX - this.refs.slider.getBoundingClientRect().left;
      const zoomLevel = Math.min(pos / this.refs.slider.offsetWidth, 1);
      this.props.onZoomUpdate(zoomLevel);
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

  setIndicatorPos = (zoomLevel = this.props.zoomLevel) => {
    const sliderPos = this.refs.slider.offsetWidth * zoomLevel - this.refs.indicator.offsetWidth * 0.5;
    this.setState({sliderPos});
  };

  handleZoomIn = () => {
    this.props.zoomIn();
  };

  handleZoomOut = () => {
    this.props.zoomOut();
  };

  handleFullBrowserClick = () => {
    console.log('go full-browser')
  };

  show = () => {
    this.containerEl.style.visibility = 'visible';
  };

  hide = () => {
    this.containerEl.style.visibility = 'hidden';
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.setIndicatorPos();
  }

  render() {
    return (
      <div className={`panorama-controls`}>
        <div className={`zoom-controls`}>
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
              {parseFloat(this.props.zoomLevel + 1).toPrecision(2)}x
            </div>
          </div>
        </div>
        <div
          className={`fullbrowser-button button`}
          onClick={this.handleFullBrowserClick}
          dangerouslySetInnerHTML={{ __html: FullBrowserSvg }}
        ></div>
      </div>
    );
  }
}
