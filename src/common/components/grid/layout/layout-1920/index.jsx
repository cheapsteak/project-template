import React from 'react';
import Layout from '../index.jsx';
import GridTile from '../../grid-tile';

export default class Layout1920 extends Layout {
  
  render() {
    const containerWidth = window.innerWidth - 60;
    const one = containerWidth / 11 - 10;
    const two = containerWidth * 2 / 11 - 19;
    const three = containerWidth * 3 / 11 - 8;
    const four = three + one;

    return (
      <div className={`grid layout-1920 ${this.state.status} ${this.props.className}`}>

        <div className={`grid-item first-row width-3 grey`} style={{height: two-2}}>
          <GridTile
            ref="tile0"
            chapter={`welcome`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item first-row width-4 left-margin sand`} style={{height: four-1}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 first-row left-margin`} style={{height: two}}>
          <div className={`filler width-25-less-15 height-100 grey`}></div>
          <div className={`filler width-50-less-10 height-50-less-10 left-margin sand`}></div>
          <div className={`filler width-25-less-15 height-50-less-10 left-margin red`}></div>
          <div className={`filler width-75-less-5 height-50-less-10 top-margin left-margin dark-blue`}></div>
        </div>

        <div className={`grid-item width-4 left-margin light-blue`} style={{height: two}}>
          <GridTile
            ref="tile2"
            chapter={`literacy`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3`} style={{height: two}}>
          <div className={`filler width-33-less-15 height-100 dark-blue`}></div>
          <div className={`filler width-33-less-10 height-50-less-10 left-margin sand`}></div>
          <div className={`filler width-33-less-15 height-50-less-10 left-margin red`}></div>
          <div className={`filler width-66-less-5 height-50-less-10 top-margin left-margin light-blue`}></div>
        </div>

        <div className={`grid-item width-4 dark-blue`} style={{height: four}}>
          <GridTile
            ref="tile3"
            chapter={`electives`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: two}}>
          <GridTile
            ref="tile4"
            chapter={`math`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 left-margin dark-blue`} style={{height: two}}>
          <GridTile
            ref="tile5"
            chapter={`investment`}
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

        <div className={`grid-item width-2 left-margin light-blue`} style={{height: four}}>
          <GridTile
            ref="tile7"
            chapter={`history`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-1 left-margin`} style={{height: four}}>
          <div className={`filler width-100 height-25-less-15 red`}></div>
          <div className={`filler width-100 height-50-less-10 top-margin red`}></div>
          <div className={`filler width-100 height-25-less-15 top-margin sand`}></div>
        </div>

        <div className={`grid-item width-3 red`} style={{height: two}}>
          <GridTile
            ref="tile8"
            chapter={`development`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-11 left-margin`} style={{height: two}}>
          <div className={`filler full-size sand`}></div>
        </div>

      </div>
    );
  }
}