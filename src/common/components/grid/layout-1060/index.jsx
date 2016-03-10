import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

export default class Layout1060 extends GridBase {

  state = {
    baseHeight: 0,
    oneThirdHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * 0.5 - 10;
    const oneThirdHeight = containerWidth / 6 - 15;
    const twoThirdHeight = containerWidth / 3 - 17;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-1060');
  };

  render() {
    const three = this.state.baseHeight;
    const one = this.state.oneThirdHeight;
    const two = this.state.twoThirdHeight;

    return (
      <div className={`grid layout-1060 ${this.state.status}`}>

        <div className={`grid-item first-row width-3 right-margin`} style={{height: two}}>
          <div className={`width-66-less-10 height-100 grey`}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
            />
          </div>
          <div className={`filler width-33-less-10 height-100 left-margin red`}></div>
        </div>

        <div className={`grid-item width-3 first-row sand`} style={{height: three}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
          />
        </div>

        <div className={`grid-item width-3 right-margin`} style={{height: two}}>
          <div className={`full-size light-blue`}>
            <GridTile
              ref="tile2"
              chapter={`literacy`}
            />
          </div>
        </div>

        <div className={`grid-item width-3`} style={{height: two}}>
          <div className={`full-size light-blue`}>
            <GridTile
              ref="tile3"
              chapter={`math`}
            />
          </div>
        </div>

        <div className={`grid-item width-3 right-margin light-blue`} style={{height: three}}>
          <GridTile
            ref="tile4"
            chapter={`electives`}
          />
        </div>

        <div className={`grid-item width-3 grey`} style={{height: three}}>
          <GridTile
            ref="tile5"
            chapter={`computer`}
          />
        </div>

        <div className={`grid-item width-3`} style={{height: two+10}}>
          <div className={`width-66-less-10 height-100 grey`}>
            <GridTile
              ref="tile6"
              chapter={`investment`}
            />
          </div>
          <div className={`filler width-33-less-10 height-50-less-10 left-margin dark-blue`}></div>
          <div className={`filler width-33-less-10 height-50-less-10 top-margin left-margin dark-blue`}></div>
        </div>

        <div className={`grid-item width-1 left-margin`} style={{height: one}}>
          <div className={`filler full-size dark-blue`}></div>
        </div>

        <div className={`grid-item width-2 left-padding`} style={{height: three+5}}>
          <div className={`full-size grey`}>
            <GridTile
              ref="tile7"
              chapter={`history`}
            />
          </div>
        </div>

        <div className={`grid-item width-2 right-padding`} style={{height: two+7}}>
          <div className={`filler width-50-less-10 height-50-less-10 dark-blue`}></div>
          <div className={`filler width-50-less-10 height-50-less-10 left-margin dark-blue`}></div>
          <div className={`filler width-100 height-50-less-10 top-margin red`}></div>
        </div>

        <div className={`grid-item width-2-less-15 grey`} style={{height: two+7}}>
          <GridTile
            ref="tile8"
            chapter={`development`}
          />
        </div>

      </div>
    );
  }
}
