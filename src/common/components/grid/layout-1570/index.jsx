import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

export default class Layout1570 extends GridBase {

  state = {
    baseHeight: 0,
    oneThirdHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth / 3 - 13;
    const oneThirdHeight = containerWidth / 8 - 15;
    const twoThirdHeight = containerWidth / 4 + 8;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-1570');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const oneThird = this.state.oneThirdHeight;
    const twoThird = this.state.twoThirdHeight;

    return (
      <div className={`grid layout-1570 ${this.state.status}`}>

        <div className={`grid-item first-row width-3`} style={{height: baseHeight}}>
          <div className={`width-full bottom-padding grey`} style={{height: twoThird-1}}>
            <GridTile
              ref="tile3"
              chapter={`math`}
            />
          </div>
          <div className={`nested-bar-width-100-height-33-less-10`}>
            <div className={`filler nested-cube-33-height-100 sand`}></div>
            <div className={`filler nested-bar-width-66-height-100-extra-5 left-margin light-blue`}></div>
          </div>
        </div>

        <div className={`grid-item first-row width-3 sand`} style={{height: baseHeight}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
          />
        </div>

      </div>
    );
  }
}
