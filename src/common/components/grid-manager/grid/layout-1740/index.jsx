import React from 'react';
import {findDOMNode} from 'react-dom';
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
    const one = this.state.oneThirdHeight;
    const two = this.state.twoThirdHeight;
    const three = this.state.baseHeight;
    const four = three + one;

    return (
      <div className={`grid layout-1740 ${this.state.status}`}>

        <div className={`grid-item first-row width-3 grey`} style={{height: two}}>
          <GridTile
            ref="tile0"
            chapter={`welcome`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item first-row width-3 left-margin`} style={{height: two}}>
          <div className={`filler width-66-less-5 height-50-less-10 red`}></div>
          <div className={`filler width-33-less-15 height-50-less-10 left-margin light-blue`}></div>
          <div className={`filler width-33-less-15 height-50-less-10 top-margin sand`}></div>
          <div className={`filler width-66-less-5 height-50-less-10 top-margin left-margin dark-blue`}></div>
        </div>

        <div className={`grid-item first-row width-4 left-margin sand`} style={{height: four}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-2`} style={{height: two}}>
          <div className={`filler width-50-less-10 height-100 red`}></div>
          <div className={`filler width-50-less-10 height-100 left-margin dark-blue`}></div>
        </div>

        <div className={`grid-item width-4 left-margin light-blue`} style={{height: two}}>
          <GridTile
            ref="tile2"
            chapter={`literacy`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 dark-blue`} style={{height: four}}>
          <GridTile
            ref="tile3"
            chapter={`electives`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-2 left-margin light-blue`} style={{height: four}}>
          <GridTile
            ref="tile4"
            chapter={`history`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: two}}>
          <GridTile
            ref="tile5"
            chapter={`math`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: four}}>
          <GridTile
            ref="tile6"
            chapter={`computer`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 dark-blue`} style={{height: two}}>
          <GridTile
            ref="tile7"
            chapter={`investment`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 left-margin red`} style={{height: two}}>
          <GridTile
            ref="tile8"
            chapter={`development`}
            isFiltered={this.props.isFiltered}
          />
        </div>

      </div>
    );
  }
}
