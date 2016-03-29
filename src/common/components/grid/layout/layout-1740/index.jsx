import React from 'react';
import Layout from '../index.jsx';
import GridTile from '../../grid-tile';
import scrollbarSize from 'common/utils/scrollbar-size';

export default class Layout1740 extends Layout {

  render() {
    const containerWidth = window.innerWidth - 60 - scrollbarSize.get();
    const one = containerWidth / 10 - 49;
    const two = containerWidth / 5 - 16;
    const three = containerWidth / 3 - 13;
    const four = three + one;

    return (
      <div className={`grid layout-1740 ${this.state.status} ${this.props.className}`}>

        <div className={`grid-item first-row width-3 grey`} style={{height: two}}>
          <GridTile
            ref="tile0"
            slug={`welcome`}
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
            slug={`science`}
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
            slug={`literacy-and-writing`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 dark-blue`} style={{height: four}}>
          <GridTile
            ref="tile3"
            slug={`electives`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-2 left-margin light-blue`} style={{height: four}}>
          <GridTile
            ref="tile4"
            slug={`history`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: two}}>
          <GridTile
            ref="tile5"
            slug={`math`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: four}}>
          <GridTile
            ref="tile6"
            slug={`computer-science`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 dark-blue`} style={{height: two}}>
          <GridTile
            ref="tile7"
            slug={`parental-investment`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 left-margin red`} style={{height: two}}>
          <GridTile
            ref="tile8"
            slug={`character-development`}
            isFiltered={this.props.isFiltered}
          />
        </div>

      </div>
    );
  }
}
