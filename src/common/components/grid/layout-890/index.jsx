import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

export default class Layout890 extends GridBase {

  state = {
    baseHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * 0.6 - 10;
    const twoThirdHeight = containerWidth * 0.4 - 10;

    this.setState({baseHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-890');
  };

  render() {
    const two = this.state.twoThirdHeight;
    const three = this.state.baseHeight;

    return (
      <div className={`grid layout-890 ${this.state.status}`}>

        <div className={`grid-item first-row width-2`} style={{height: three}}>
          <div className={`filler width-100 height-33-less-15 red`}></div>
          <div className={`width-100 height-66-less-5 top-margin grey`}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
            />
          </div>
        </div>
        <div className={`grid-item first-row width-3 left-margin sand`} style={{height: three}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
          />
        </div>

        <div className={`grid-item width-3`} style={{height: two}}>
          <div className={`full-size light-blue`}>
            <GridTile
              ref="tile2"
              chapter={`literacy`}
            />
          </div>
        </div>
        <div className={`grid-item width-2 left-margin`} style={{height: two}}>
          <div className={`filler width-50-less-10 height-50-less-10 red`}></div>
          <div className={`filler width-50-less-10 height-50-less-10 left-margin red`}></div>
          <div className={`filler width-100 height-50-less-10 top-margin red`}></div>
        </div>

        <div className={`grid-item width-2`} style={{height: three}}>
          <div className={`filler width-100 height-33-less-10 dark-blue`}></div>
          <div className={`filler width-50-less-10 height-66-less-10 top-margin red`}></div>
          <div className={`filler width-50-less-10 height-33-less-15 top-margin left-margin dark-blue`}></div>
          <div className={`filler width-50-less-10 height-33-less-15 top-margin left-margin dark-blue`}></div>
        </div>
        <div className={`grid-item width-3 left-margin light-blue`} style={{height: three}}>
          <GridTile
            ref="tile3"
            chapter={`electives`}
          />
        </div>

        <div className={`grid-item width-3 height-2 light-blue`} style={{height: two}}>
          <GridTile
            ref="tile4"
            chapter={`math`}
          />
        </div>
        <div className={`grid-item width-2 height-2 left-margin`} style={{height: two}}>
          <div className={`full-size grey`}>
            <GridTile
              ref="tile5"
              chapter={`development`}
            />
          </div>
        </div>

        <div className={`grid-item width-3 grey`} style={{height: three}}>
          <GridTile
            ref="tile6"
            chapter={`computer`}
          />
        </div>
        <div className={`grid-item width-2 left-margin`} style={{height: two}}>
          <div className={`filler width-50-less-10 height-50-less-10 dark-blue`}></div>
          <div className={`filler width-50-less-10 height-50-less-10 left-margin dark-blue`}></div>
          <div className={`filler width-100 height-50-less-10 top-margin red`}></div>
        </div>

        <div className={`grid-item width-3`} style={{height: two}}>
          <div className={`filler width-33-less-10 height-100 red`}></div>
          <div className={`width-66-less-10 height-100 left-margin grey`}>
            <GridTile
              ref="tile7"
              chapter={`investment`}
            />
          </div>
        </div>
        <div className={`grid-item width-2 left-margin`} style={{height: three}}>
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
