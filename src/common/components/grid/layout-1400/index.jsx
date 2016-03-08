import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

export default class Layout1400 extends GridBase {

  state = {
    baseHeight: 0,
    oneThirdHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * (3 / 8) - 8;
    const oneThirdHeight = containerWidth / 8 - 15;
    const twoThirdHeight = containerWidth / 4 + 8;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-1400');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const oneThird = this.state.oneThirdHeight;
    const twoThird = this.state.twoThirdHeight;

    return (
      <div className={`grid layout-1400 ${this.state.status}`}>

        <div className={`grid-item first-row width-2 right-padding`} style={{height: baseHeight}}>
          <div className={`filler nested-bar-width-100-height-33-less-10 red`}></div>
          <div className={`nested-cube-width-100-height-66 top-margin grey`}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
            />
          </div>
        </div>

        <div className={`grid-item first-row width-3 sand`} style={{height: baseHeight}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
          />
        </div>

        <div className={`grid-item first-row width-3 left-margin`} style={{height: baseHeight}}>
          <div className={`nested-bar-width-100-height-33-less-10`}>
            <div className={`filler nested-bar-width-66-height-100-extra-5 right-margin red`}></div>
            <div className={`filler nested-cube-33-height-100 dark-blue`}></div>
          </div>
          <div className={`width-full top-padding light-blue`} style={{height: twoThird}}>
            <GridTile
              ref="tile2"
              chapter={`literacy`}
            />
          </div>
        </div>

        <div className={`grid-item width-3`} style={{height: baseHeight}}>
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

        <div className={`grid-item width-2 left-padding`} style={{height: baseHeight}}>
          <div className={`filler nested-bar-width-100-height-33-less-10 light-blue`}></div>
          <div className={`nested-cube-width-100-height-66 top-margin red`}>
            <GridTile
              ref="tile4"
              chapter={`development`}
            />
          </div>
        </div>

        <div className={`grid-item width-3 left-margin dark-blue`} style={{height: baseHeight}}>
          <GridTile
            ref="tile5"
            chapter={`electives`}
          />
        </div>

        <div className={`grid-item width-3 grey`} style={{height: baseHeight}}>
          <GridTile
            ref="tile6"
            chapter={`computer`}
          />
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: baseHeight}}>
          <div className={`nested-bar-width-33-height-100-less-5 right-margin`}>
            <div className={`filler nested-bar-width-100-height-66 dark-blue`}></div>
            <div className={`filler nested-cube-height-33 top-margin sand`}></div>
          </div>
          <div className={`width-22 height-full light-blue`}>
            <GridTile
              ref="tile7"
              chapter={`development`}
            />
          </div>
        </div>

        <div className={`grid-item width-2 left-padding`} style={{height: baseHeight}}>
          <div className={`nested-cube-width-100-height-66 dark-blue`}>
            <GridTile
              ref="tile8"
              chapter={`investment`}
            />
          </div>
          <div className={`nested-bar-width-100-height-33-less-10 top-margin`}>
            <div className={`filler nested-cube-50-height-100 sand`}></div>
            <div className={`filler nested-cube-50-height-100 left-margin red`}></div>
          </div>
        </div>

      </div>
    );
  }
}
