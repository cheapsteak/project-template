import React from 'react';
import Layout from '../index.jsx';
import GridTile from '../../grid-tile';
import scrollbarSize from 'common/utils/scrollbar-size';

export default class Layout1400 extends Layout {

  render() {
    const containerWidth = window.innerWidth - 60 - scrollbarSize.get();
    const two = containerWidth / 4 + 8;
    const three = containerWidth * (3 / 8) - 12;

    return (
      <div className={`grid layout-1400 ${this.state.status} ${this.props.className}`}>

        <div className={`grid-item first-row width-2 right-padding`} style={{height: three}}>
          <div className={`filler width-100 height-33-less-15 red`}></div>
          <div className={`width-100 height-66-less-5 top-margin grey`}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item first-row width-3 sand`} style={{height: three}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item first-row width-3 left-margin`} style={{height: three}}>
          <div className={`width-100 height-33-less-15`}>
            <div className={`filler width-66-less-10 height-100 right-margin red`}></div>
            <div className={`filler width-33-less-10 height-100 dark-blue`}></div>
          </div>
          <div className={`width-100 top-padding light-blue`} style={{height: two}}>
            <GridTile
              ref="tile2"
              chapter={`literacy`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3`} style={{height: three}}>
          <div className={`width-100 bottom-padding grey`} style={{height: two-1}}>
            <GridTile
              ref="tile3"
              chapter={`math`}
              isFiltered={this.props.isFiltered}
            />
          </div>
          <div className={`width-100 height-33-less-15`}>
            <div className={`filler width-33-less-15 height-100 sand`}></div>
            <div className={`filler width-66-less-5 height-100 left-margin light-blue`}></div>
          </div>
        </div>

        <div className={`grid-item width-2 left-padding`} style={{height: three}}>
          <div className={`filler width-100 height-33-less-15 light-blue`}></div>
          <div className={`width-100 height-66-less-5 top-margin red`}>
            <GridTile
              ref="tile4"
              chapter={`development`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3 left-margin dark-blue`} style={{height: three}}>
          <GridTile
            ref="tile5"
            chapter={`electives`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 grey`} style={{height: three}}>
          <GridTile
            ref="tile6"
            chapter={`computer`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: three}}>
          <div className={`width-33-less-10 height-100 right-margin`}>
            <div className={`filler width-100 height-66-less-5 dark-blue`}></div>
            <div className={`filler width-100 height-33-less-10 top-margin sand`}></div>
          </div>
          <div className={`width-22 height-100 light-blue`}>
            <GridTile
              ref="tile7"
              chapter={`history`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-2 left-padding`} style={{height: three}}>
          <div className={`width-100 height-66-less-5 dark-blue`}>
            <GridTile
              ref="tile8"
              chapter={`investment`}
              isFiltered={this.props.isFiltered}
            />
          </div>
          <div className={`width-100 height-33-less-15 top-margin`}>
            <div className={`filler width-50-less-10 height-100 sand`}></div>
            <div className={`filler width-50-less-10 height-100 left-margin red`}></div>
          </div>
        </div>

      </div>
    );
  }
}
