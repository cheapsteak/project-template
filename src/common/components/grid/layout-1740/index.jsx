import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

export default class Layout1740 extends GridBase {

  state = {
    baseHeight: 0,
    oneThirdHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth / 3 - 13;
    const oneThirdHeight = containerWidth / 10 - 49;
    const twoThirdHeight = containerWidth / 5 - 16;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-1740');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const oneThird = this.state.oneThirdHeight;
    const twoThird = this.state.twoThirdHeight;
    const fourParts = baseHeight + oneThird;

    return (
      <div className={`grid layout-1740 ${this.state.status}`}>

        <div className={`grid-item first-row width-3 grey`} style={{height: twoThird}}>
          <GridTile
            ref="tile0"
            chapter={`welcome`}
          />
        </div>

        <div className={`grid-item first-row width-3 left-margin`} style={{height: twoThird}}>
          <div className={`filler width-66-less-5 height-50-less-10 red`}></div>
          <div className={`filler width-33-less-15 height-50-less-10 left-margin light-blue`}></div>
          <div className={`filler width-33-less-15 height-50-less-10 top-margin sand`}></div>
          <div className={`filler width-66-less-5 height-50-less-10 top-margin left-margin dark-blue`}></div>
        </div>

        <div className={`grid-item first-row width-4 left-margin sand`} style={{height: fourParts}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
          />
        </div>

        <div className={`grid-item width-2`} style={{height: twoThird}}>
          <div className={`filler width-50-less-10 height-100 red`}></div>
          <div className={`filler width-50-less-10 height-100 left-margin dark-blue`}></div>
        </div>

        <div className={`grid-item width-4 left-margin light-blue`} style={{height: twoThird}}>
          <GridTile
            ref="tile2"
            chapter={`literacy`}
          />
        </div>

        <div className={`grid-item width-4 dark-blue`} style={{height: fourParts}}>
          <GridTile
            ref="tile3"
            chapter={`electives`}
          />
        </div>

        <div className={`grid-item width-2 left-margin light-blue`} style={{height: fourParts}}>
          <GridTile
            ref="tile4"
            chapter={`history`}
          />
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: twoThird}}>
          <GridTile
            ref="tile5"
            chapter={`math`}
          />
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: fourParts}}>
          <GridTile
            ref="tile6"
            chapter={`computer`}
          />
        </div>

        <div className={`grid-item width-3 dark-blue`} style={{height: twoThird}}>
          <GridTile
            ref="tile7"
            chapter={`investment`}
          />
        </div>

        <div className={`grid-item width-3 left-margin red`} style={{height: twoThird}}>
          <GridTile
            ref="tile8"
            chapter={`development`}
          />
        </div>

      </div>
    );
  }
}
