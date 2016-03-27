import React from 'react';
import Layout from '../index.jsx';
import GridTile from '../../grid-tile';
import scrollbarSize from 'common/utils/scrollbar-size';

export default class Layout1570 extends Layout {

  render() {
    const containerWidth = window.innerWidth - 60 - scrollbarSize.get();
    const one = containerWidth / 9 - 19;
    const two = containerWidth * 2 / 9 - 15;
    const three = containerWidth / 3 - 13;
    const four = three + one + 20;

    return (
      <div className={`grid layout-1570 ${this.state.status} ${this.props.className}`}>

        <div className={`grid-item first-row width-3`} style={{height: three}}>
          <div className={`width-100 bottom-margin grey`} style={{height: two}}>
            <GridTile
              ref="tile0"
              chapter={`welcome`}
              isFiltered={this.props.isFiltered}
            />
          </div>
          <div className={`width-100 height-33-less-15`}>
            <div className={`filler width-33-less-15 height-100 red`}></div>
            <div className={`filler width-66-less-5 height-100 left-margin sand`}></div>
          </div>
        </div>

        <div className={`grid-item first-row width-3 left-margin sand`} style={{height: three}}>
          <GridTile
            ref="tile1"
            chapter={`science`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item first-row width-3 left-margin`} style={{height: four}}>
          <div className={`width-100 height-25-less-15`}>
            <div className={`filler width-66-less-5 height-100 red`}></div>
            <div className={`filler width-33-less-15 height-100 left-margin light-blue`}></div>
          </div>
          <div className={`width-100 top-margin dark-blue`} style={{height: three}}>
            <GridTile
              ref="tile2"
              chapter={`electives`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-4 light-blue`} style={{height: two}}>
          <GridTile
            ref="tile3"
            chapter={`literacy`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-1 left-margin`} style={{height: two+1}}>
          <div className={`filler full-size red`}></div>
        </div>

        <div className={`grid-item width-11 left-margin`} style={{height: one+1}}>
          <div className={`filler full-size dark-blue`}></div>
        </div>

        <div className={`grid-item width-4 left-margin grey`} style={{height: two}}>
          <GridTile
            ref="tile4"
            chapter={`math`}
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

        <div className={`grid-item width-22 left-margin top-margin light-blue`} style={{height: four}}>
          <GridTile
            ref="tile6"
            chapter={`history`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-12 left-margin`}>
          <div className={`filler full-size sand`} style={{height: one}}></div>
          <div className={`filler top-margin width-100 grey`} style={{height: two}}></div>
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: three+3}}>
          <div className={`width-100 height-33-less-15`}>
            <div className={`filler width-66-less-5 height-100 red`}></div>
            <div className={`filler width-33-less-15 height-100 left-margin dark-blue`}></div>
            <div className={`width-100 top-margin dark-blue`} style={{height: two, float: 'left'}}>
              <GridTile
                ref="tile7"
                chapter={`investment`}
                isFiltered={this.props.isFiltered}
              />
            </div>
          </div>
        </div>

        <div className={`grid-item width-3 red`} style={{height: two}}>
          <GridTile
            ref="tile8"
            chapter={`development`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: one}}>
          <div className={`filler full-size sand`}></div>
        </div>

        <div className={`grid-item width-3 left-margin`} style={{height: one}}>
          <div className={`full-size`}>
            <div className={`filler width-33-less-10 height-100 red`}></div>
            <div className={`filler width-66-less-10 height-100 left-margin grey`}></div>
          </div>
        </div>

      </div>
    );
  }
}
