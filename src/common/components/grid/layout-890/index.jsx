import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import ParallaxCell from '../grid-tile/grid-tile';

const gridItemsMargin = 20;


export default class Layout890 extends GridBase {

  state = {
    baseHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * 0.6;
    const twoThirdHeight = containerWidth * 0.4 - gridItemsMargin;

    this.setState({baseHeight, twoThirdHeight});
    console.log('resize 890');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const twoThirdHeight = this.state.twoThirdHeight;

    return (
      <div className={`grid layout-890 ${this.state.status}`}>

        <div className={`grid-item id-1 first-row width-2 right-padding`} style={{height: baseHeight}}>
          <div className={`nested-bar-width-100-height-33 red`}></div>
          <div className={`nested-cube-height-66 top-margin grey`}></div>
        </div>
        <div className={`grid-item id-2 first-row width-3 sand`} style={{height: baseHeight}}></div>

        <div className={`grid-item id-3 width-3`} style={{height: twoThirdHeight}}>
          <div className={`full-size light-blue`}></div>
        </div>
        <div className={`grid-item id-4 width-2 left-padding`} style={{height: twoThirdHeight}}>
          <div className={`nested-cube-50 red`}></div>
          <div className={`nested-cube-50 left-margin red`}></div>
          <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item id-5 width-2 right-padding`} style={{height: baseHeight}}>
          <div className={`nested-bar-width-100-height-33 dark-blue`}></div>
          <div className={`nested-bar-width-50-height-66 top-margin red`}></div>
          <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
          <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
        </div>
        <div className={`grid-item id-6 width-3 light-blue`} style={{height: baseHeight}}></div>

        <div className={`grid-item id-7 width-3 height-2 light-blue`} style={{height: twoThirdHeight}}></div>
        <div className={`grid-item id-8 width-2 height-2 left-padding `} style={{height: twoThirdHeight}}>
          <div className={`full-size grey`}></div>
        </div>

        <div className={`grid-item id-9 width-3 grey`} style={{height: baseHeight}}></div>
        <div className={`grid-item id-10 width-2 left-padding`} style={{height: twoThirdHeight}}>
          <div className={`nested-cube-50 dark-blue`}></div>
          <div className={`nested-cube-50 left-margin dark-blue`}></div>
          <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item id-11 width-3`} style={{height: twoThirdHeight}}>
          <div className={`nested-bar-width-33-height-100 red`}></div>
          <div className={`nested-cube-width-66 left-margin grey`}></div>
        </div>
        <div className={`grid-item id-12 width-2 left-padding`} style={{height: baseHeight}}>
          <div className={`full-size grey`}></div>
        </div>

      </div>
    );
  }
}
