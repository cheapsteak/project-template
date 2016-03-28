import React from 'react';
import Layout from '../index.jsx';
import GridTile from '../../grid-tile';
import scrollbarSize from 'common/utils/scrollbar-size';

export default class Layout1060 extends Layout {

  render() {
    const containerWidth = window.innerWidth - 60 - scrollbarSize.get();
    const one = containerWidth / 6 - 15;
    const two = containerWidth / 3 - 17;
    const three = containerWidth * 0.5 - 10;

    return (
      <div className={`grid layout-1060 ${this.state.status} ${this.props.className}`}>

        <div className={`grid-item first-row width-3 right-margin`} style={{height: two}}>
          <div className={`width-66-less-10 height-100 grey`}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
              isFiltered={this.props.isFiltered}
            />
          </div>
          <div className={`filler width-33-less-10 height-100 left-margin red`}></div>
        </div>

        <div className={`grid-item width-3 first-row sand`} style={{height: three}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 right-margin`} style={{height: two}}>
          <div className={`full-size light-blue`}>
            <GridTile
              ref="tile2"
              chapter={`literacy`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3`} style={{height: two}}>
          <div className={`full-size light-blue`}>
            <GridTile
              ref="tile3"
              chapter={`math`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3 right-margin light-blue`} style={{height: three}}>
          <GridTile
            ref="tile4"
            chapter={`electives`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 grey`} style={{height: three}}>
          <GridTile
            ref="tile5"
            chapter={`computer`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3`} style={{height: two+10}}>
          <div className={`width-66-less-10 height-100 grey`}>
            <GridTile
              ref="tile6"
              chapter={`investment`}
              isFiltered={this.props.isFiltered}
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
              isFiltered={this.props.isFiltered}
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
            isFiltered={this.props.isFiltered}
          />
        </div>

      </div>
    );
  }
}