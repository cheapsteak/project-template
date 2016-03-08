import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

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
    //console.log('calculateSizes: Grid-890');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const twoThirdHeight = this.state.twoThirdHeight;

    return (
      <div className={`grid layout-890 ${this.state.status}`}>

        <div className={`grid-item first-row width-2 right-padding`} style={{height: baseHeight}}>
          <div className={`filler nested-bar-width-100-height-33 red`}></div>
          <div className={`nested-cube-height-66 top-margin grey`}>
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

        <div className={`grid-item width-3`} style={{height: twoThirdHeight}}>
          <div className={`full-size light-blue`}>
            <GridTile
              ref="tile2"
              chapter={`literacy`}
            />
          </div>
        </div>
        <div className={`grid-item width-2 left-padding`} style={{height: twoThirdHeight}}>
          <div className={`filler nested-cube-50 red`}></div>
          <div className={`filler nested-cube-50 left-margin red`}></div>
          <div className={`filler nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item width-2 right-padding`} style={{height: baseHeight}}>
          <div className={`filler nested-bar-width-100-height-33 dark-blue`}></div>
          <div className={`filler nested-bar-width-50-height-66 top-margin red`}></div>
          <div className={`filler nested-cube-33 top-margin left-margin dark-blue`}></div>
          <div className={`filler nested-cube-33 top-margin left-margin dark-blue`}></div>
        </div>
        <div className={`grid-item width-3 light-blue`} style={{height: baseHeight}}>
          <GridTile
            ref="tile3"
            chapter={`electives`}
          />
        </div>

        <div className={`grid-item width-3 height-2 light-blue`} style={{height: twoThirdHeight}}>
          <GridTile
            ref="tile4"
            chapter={`math`}
          />
        </div>
        <div className={`grid-item width-2 height-2 left-padding `} style={{height: twoThirdHeight}}>
          <div className={`full-size grey`}>
            <GridTile
              ref="tile5"
              chapter={`development`}
            />
          </div>
        </div>

        <div className={`grid-item width-3 grey`} style={{height: baseHeight}}>
          <GridTile
            ref="tile6"
            chapter={`computer`}
          />
        </div>
        <div className={`grid-item width-2 left-padding`} style={{height: twoThirdHeight}}>
          <div className={`filler nested-cube-50 dark-blue`}></div>
          <div className={`filler nested-cube-50 left-margin dark-blue`}></div>
          <div className={`filler nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item width-3`} style={{height: twoThirdHeight}}>
          <div className={`filler nested-bar-width-33-height-100 red`}></div>
          <div className={`nested-cube-width-66 left-margin grey`}>
            <GridTile
              ref="tile7"
              chapter={`investment`}
            />
          </div>
        </div>
        <div className={`grid-item width-2 left-padding`} style={{height: baseHeight}}>
          <div className={`full-size grey`}>
            <GridTile
              ref="tile8"
              chapter={`history`}
            />
          </div>
        </div>

      </div>
    );
  }
}
