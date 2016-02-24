import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import Pannellum from 'pannellum';

const maxZoomNum = 50;
const minZoomNum = 120;
const zoomRange = maxZoomNum + minZoomNum;
const defaultZoomLevel = 0.5;
const zoomStep = 0.05;

export default class Panorama extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomLevel: 0,
      sliderPosition: 0
    }
  }

  containerEl;
  panorama;

  static propTypes = {
    src: React.PropTypes.string
  };

  static defaultProps = {
    src: '../images/pan-test.jpg'
  };

  getZoomLevel = () => {
    var currLevel = this.panorama.getHfov();
    return currLevel / zoomRange;
  };

  updateZoomLevel = (zoomIn) => {
    var currLevel = this.getZoomLevel();
    var level = currLevel + (zoomStep * (zoomIn ? -1 : 1));

    var sliderPos = this.refs.slider.offsetWidth * (1 - level) - this.refs.indicator.offsetWidth * 0.5;
    console.log(level, sliderPos)

    this.panorama.setHfov(zoomRange * level);
    this.panorama.setUpdate(true);
    this.setState({zoomLevel: level, sliderPosition: sliderPos});
  };

  handleZoomIn = () => {
    var currLevel = this.getZoomLevel();
    if (currLevel * zoomRange > maxZoomNum) {
      this.updateZoomLevel(true);
      console.log('zoom in')
    }
  };

  handleZoomOut = () => {
    var currLevel = this.getZoomLevel();
    if (currLevel * zoomRange < minZoomNum) {
      this.updateZoomLevel();
      console.log('zoom out')
    }
  };


  handleSliderZoom = () => {
    console.log('wedwef')
    //var currLevel = this.getZoomLevel();
    //if (currLevel * zoomRange < minZoomNum) {
    //  this.updateZoomLevel();
    //  console.log('zoom out')
    //}
  };

  handleFullScreen = () => {
    console.log('go fullscreen')
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.panorama = pannellum.viewer(this.containerEl, {
      type: 'equirectangular',
      panorama: this.props.src,
      autoLoad: true,
      compass: true
    });

    var initZoomNum = zoomRange * defaultZoomLevel;
    var sliderPos = this.refs.slider.offsetWidth * (1 - defaultZoomLevel) - this.refs.indicator.offsetWidth * 0.5;
    console.log(sliderPos)

    this.setState({zoomLevel: initZoomNum, sliderPosition: sliderPos});
    this.panorama.setHfov(initZoomNum);

    window.pan = this.panorama;
  }

  componentWillUnmount() {
    this.panorama.destroy();
  }

  render() {
    return (
      <div className={`panorama`}>
        <div className={`panorama-controls`}>
          <div className={`zoom-controls`}>
            <div className={`zoom-out zoom`} onClick={this.handleZoomOut}></div>
            <div className={`zoom-in zoom`} onClick={this.handleZoomIn}></div>

            <div ref="slider" className={`slider`}>
              <div
                ref="indicator"
                className={`indicator`}
                style={ {transform: 'translateX(' + this.state.sliderPosition + 'px)'} }></div>
            </div>
          </div>
          <div className={`fs-controls`}>
            <div className={`fs-button`} onClick={this.handleFullScreen}></div>
          </div>
        </div>
      </div>

    );
  }
}
