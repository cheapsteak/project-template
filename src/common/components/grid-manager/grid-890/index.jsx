import React from 'react';
import { findDOMNode } from 'react-dom';
import Packery from 'packery';

const states = {
  LOADING: 'loading',
  READY: 'ready'
};

const gridItemsMargin = 20;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING
    }
  }

  static propTypes = {};
  static defaultProps = {};

  handleWindowResize = () => {
    this.updateLayout();
  };

  updateLayout = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * 0.6;
    const twoThirdHeight = containerWidth * 0.4 - gridItemsMargin;

    this.setState({baseHeight, twoThirdHeight});
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.packery = new Packery(this.containerEl, {
      initLayout: false,
      itemSelector: '.grid-item',
      transitionDuration: 0.4
    });
    this.updateLayout();
    setTimeout(() => this.packery.layout());

    this.packery.on('layoutComplete', () => {
      this.setState({status: states.READY});
    });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    this.packery.destroy();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    return (
      <div className={`grid grid-890 ${this.state.status}`}>

        <div className={`grid-item first-row width-2 right-padding`} style={{height: this.state.baseHeight}}>
          <div className={`nested-bar-width-100-height-33 red`}></div>
          <div className={`nested-cube-height-66 top-margin grey`}></div>
        </div>
        <div className={`grid-item first-row width-3 height-full orange`} style={{height: this.state.baseHeight}}></div>

        <div className={`grid-item width-3`} style={{height: this.state.twoThirdHeight}}>
          <div className={`full-size light-blue`}></div>
        </div>
        <div className={`grid-item width-2 left-padding`} style={{height: this.state.twoThirdHeight}}>
          <div className={`nested-cube-50 red`}></div>
          <div className={`nested-cube-50 left-margin red`}></div>
          <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item width-2 right-padding`} style={{height: this.state.baseHeight}}>
          <div className={`nested-bar-width-100-height-33 dark-blue`}></div>
          <div className={`nested-bar-width-50-height-66 top-margin red`}></div>
          <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
          <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
        </div>
        <div className={`grid-item width-3 light-blue`} style={{height: this.state.baseHeight}}></div>

        <div className={`grid-item width-3 height-2 light-blue`} style={{height: this.state.twoThirdHeight}}></div>
        <div className={`grid-item width-2 height-2 left-padding `} style={{height: this.state.twoThirdHeight}}>
          <div className={`full-size grey`}></div>
        </div>

        <div className={`grid-item width-3 grey`} style={{height: this.state.baseHeight}}></div>
        <div className={`grid-item width-2 left-padding`} style={{height: this.state.twoThirdHeight}}>
          <div className={`nested-cube-50 dark-blue`}></div>
          <div className={`nested-cube-50 left-margin dark-blue`}></div>
          <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item width-3`} style={{height: this.state.twoThirdHeight}}>
          <div className={`nested-bar-width-33-height-100 red`}></div>
          <div className={`nested-cube-width-66 left-margin grey`}></div>
        </div>
        <div className={`grid-item width-2 left-padding`} style={{height: this.state.baseHeight}}>
          <div className={`full-size grey`}></div>
        </div>

      </div>
    );
  }
}
