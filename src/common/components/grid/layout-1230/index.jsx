import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

export default class Layout1230 extends GridBase {

  state = {
    baseHeight: 0,
    oneThirdHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * (3 / 7) - 10;
    const oneThirdHeight = containerWidth / 7 - 15;
    const twoThirdHeight = containerWidth / 3.5 - 15;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-1230');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const oneThird = this.state.oneThirdHeight;
    const twoThird = this.state.twoThirdHeight;

    return (
      <div className={`grid layout-1230 ${this.state.status}`}>

        <div className={`grid-item first-row width-3`} style={{height: twoThird}}>
          <div className={`width-11 right-padding`} style={{height: twoThird}}>
            <div className={`filler width-100 height-50-less-10 light-blue`}></div>
            <div className={`filler width-100 height-50-less-10 top-margin sand`}></div>
          </div>
          <div className={`width-66-less-20 height-100 grey`}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
            />
          </div>
        </div>

        <div className={`grid-item first-row width-1`} style={{height: baseHeight}}>
          <div className={`filler width-100 height-33-less-10 dark-blue`}></div>
          <div className={`filler width-100 height-66-less-10 top-margin red`}></div>
        </div>

        <div className={`grid-item first-row width-3 left-padding sand`} style={{height: baseHeight}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile1"
              chapter={`science`}
            />
          </div>
        </div>

        <div className={`grid-item width-3 right-padding light-blue`} style={{height: twoThird}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile2"
              chapter={`literacy`}
            />
          </div>
        </div>

        <div className={`grid-item width-3 right-padding dark-blue`} style={{height: twoThird}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile3"
              chapter={`math`}
            />
          </div>
        </div>

        <div className={`grid-item width-1`} style={{height: twoThird}}>
          <div className={`filler full-size light-blue`}></div>
        </div>

        <div className={`grid-item width-3 right-padding grey`} style={{height: baseHeight}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile4"
              chapter={`electives`}
            />
          </div>
        </div>

        <div className={`grid-item width-1`} style={{height: twoThird+1}}>
          <div className={`filler full-size sand`}></div>
        </div>

        <div className={`grid-item width-3 light-blue`} style={{height: baseHeight}}>
          <div className={`full-size left-padding`}>
            <GridTile
              ref="tile5"
              chapter={`computer`}
            />
          </div>
        </div>

        <div className={`grid-item width-2 sand`} style={{height: twoThird}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile6"
              chapter={`investment`}
            />
          </div>
        </div>

        <div className={`grid-item width-2 left-margin`} style={{height: baseHeight-6}}>
          <div className={`filler width-50-less-10 height-33-less-10 dark-blue`}></div>
          <div className={`filler width-50-less-10 height-33-less-10 left-margin grey`}></div>
          <div className={`width-100 height-66-less-5 top-margin grey`}>
            <GridTile
              ref="tile7"
              chapter={`development`}
            />
          </div>
        </div>

        <div className={`grid-item width-3 left-padding`} style={{height: baseHeight}}>
          <div className={`width-66-less-10 height-100 red`}>
            <GridTile
              ref="tile8"
              chapter={`history`}
            />
          </div>
          <div className={`filler width-33-less-10 height-66 left-margin sand`}></div>
          <div className={`filler width-33-less-10 height-33 top-margin left-margin grey`}></div>
        </div>

        <div className={`grid-item width-2`} style={{height: twoThird+5}}>
          <div className={`filler width-50-less-10 height-50-less-10 light-blue`}></div>
          <div className={`filler width-50-less-10 height-50-less-10 left-margin dark-blue`}></div>
          <div className={`filler width-100 height-50-less-10 top-margin red`}></div>
        </div>

        <div className={`grid-item width-2 left-margin`} style={{height: oneThird, marginTop: 25}}>
          <div className={`filler width-50-less-10 height-100 dark-blue`}></div>
          <div className={`filler width-50-less-10 height-100 left-margin light-blue`}></div>
        </div>

      </div>
    );
  }
}
