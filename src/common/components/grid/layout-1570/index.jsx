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
    const oneThirdHeight = containerWidth / 9 - 19;
    const twoThirdHeight = containerWidth * 2 / 9 - 15;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-1570');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const oneThird = this.state.oneThirdHeight;
    const twoThird = this.state.twoThirdHeight;
    const fourParts = baseHeight + oneThird + 20;

    return (
      <div className={`grid layout-1570 ${this.state.status}`}>

        <div className={`grid-item first-row width-3`} style={{height: baseHeight}}>
          <div className={`width-100 bottom-margin grey`} style={{height: twoThird}}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
            />
          </div>
          <div className={`width-100 height-33-less-15`}>
            <div className={`filler width-33-less-15 height-100 red`}></div>
            <div className={`filler width-66-less-5 height-100 left-margin sand`}></div>
          </div>
        </div>

        <div className={`grid-item first-row width-3 left-margin sand`} style={{height: baseHeight}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
          />
        </div>

        <div className={`grid-item first-row width-3 left-margin`} style={{height: fourParts}}>
          <div className={`width-100 height-25-less-15`}>
            <div className={`filler width-66-less-5 height-100 red`}></div>
            <div className={`filler width-33-less-15 height-100 left-margin light-blue`}></div>
          </div>
          <div className={`width-100 top-margin dark-blue`} style={{height: baseHeight}}>
            <GridTile
              ref="tile2"
              chapter={`electives`}
            />
          </div>
        </div>

        <div className={`grid-item width-4 light-blue`} style={{height: twoThird}}>
          <GridTile
            ref="tile3"
            chapter={`literacy`}
          />
        </div>

        <div className={`grid-item width-1 left-margin`} style={{height: twoThird}}>
          <div className={`filler full-size red`}></div>
        </div>

        <div className={`grid-item width-11 left-margin`} style={{height: oneThird}}>
          <div className={`filler full-size dark-blue`}></div>
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: twoThird}}>
          <GridTile
            ref="tile4"
            chapter={`math`}
          />
        </div>

        <div className={`grid-item width-3 grey`} style={{height: baseHeight}}>
          <GridTile
            ref="tile5"
            chapter={`computer`}
          />
        </div>

        <div className={`grid-item width-2 left-margin top-margin light-blue`} style={{height: fourParts}}>
          <GridTile
            ref="tile6"
            chapter={`history`}
          />
        </div>

        <div className={`grid-item width-1 left-margin`} style={{height: baseHeight}}>
          <div className={`filler full-size sand`} style={{height: oneThird}}></div>
          <div className={`filler top-margin width-100 grey`} style={{height: twoThird}}></div>
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: baseHeight+5}}>
          <div className={`width-100 height-33-less-15`}>
            <div className={`filler width-66-less-5 height-100 red`}></div>
            <div className={`filler width-33-less-15 height-100 left-margin dark-blue`}></div>
            <div className={`width-100 top-margin dark-blue`} style={{height: twoThird, float: 'left'}}>
              <GridTile
                ref="tile7"
                chapter={`math`}
              />
            </div>
          </div>
        </div>

        <div className={`grid-item width-3 red`} style={{height: twoThird}}>
          <GridTile
            ref="tile8"
            chapter={`development`}
          />
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: oneThird}}>
          <div className={`filler full-size sand`}></div>
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: oneThird}}>
          <div className={`full-size`}>
            <div className={`filler width-33-less-10 height-100 red`}></div>
            <div className={`filler width-66-less-10 height-100 left-margin grey`}></div>
          </div>
        </div>

      </div>
    );
  }
}
