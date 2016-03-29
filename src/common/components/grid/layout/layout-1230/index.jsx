import React from 'react';
import Layout from '../index.jsx';
import GridTile from '../../grid-tile';
import scrollbarSize from 'common/utils/scrollbar-size';

export default class Layout1230 extends Layout {

  render() {
    const containerWidth = window.innerWidth - 60 - scrollbarSize.get();
    const one = containerWidth / 7 - 15;
    const two = containerWidth / 3.5 - 15;
    const three = containerWidth * (3 / 7) - 10;

    return (
      <div className={`grid layout-1230 ${this.state.status} ${this.props.className}`}>

        <div className={`grid-item first-row width-3`} style={{height: two}}>
          <div className={`width-11 right-padding`} style={{height: two}}>
            <div className={`filler width-100 height-50-less-10 light-blue`}></div>
            <div className={`filler width-100 height-50-less-10 top-margin sand`}></div>
          </div>
          <div className={`width-66-less-20 height-100 grey`}>
            <GridTile
              ref="tile0"
              slug={`welcome`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item first-row width-1`} style={{height: three}}>
          <div className={`filler width-100 height-33-less-10 dark-blue`}></div>
          <div className={`filler width-100 height-66-less-10 top-margin red`}></div>
        </div>

        <div className={`grid-item first-row width-3 left-padding sand`} style={{height: three}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile1"
              slug={`science`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3 right-padding light-blue`} style={{height: two}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile2"
              slug={`literacy-and-writing`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3 right-padding dark-blue`} style={{height: two}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile3"
              slug={`math`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-1`} style={{height: two}}>
          <div className={`filler full-size light-blue`}></div>
        </div>

        <div className={`grid-item width-3 right-padding grey`} style={{height: three}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile4"
              slug={`electives`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-1`} style={{height: two+1}}>
          <div className={`filler full-size sand`}></div>
        </div>

        <div className={`grid-item width-3 light-blue`} style={{height: three}}>
          <div className={`full-size left-padding`}>
            <GridTile
              ref="tile5"
              slug={`computer-science`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-2 sand`} style={{height: two}}>
          <div className={`full-size`}>
            <GridTile
              ref="tile6"
              slug={`parental-investment`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-2 left-margin`} style={{height: three-6}}>
          <div className={`filler width-50-less-10 height-33-less-10 dark-blue`}></div>
          <div className={`filler width-50-less-10 height-33-less-10 left-margin grey`}></div>
          <div className={`width-100 height-66-less-5 top-margin grey`}>
            <GridTile
              ref="tile7"
              slug={`character-development`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3 left-padding`} style={{height: three}}>
          <div className={`width-66-less-10 height-100 red`}>
            <GridTile
              ref="tile8"
              slug={`history`}
              isFiltered={this.props.isFiltered}
            />
          </div>
          <div className={`filler width-33-less-10 height-66 left-margin sand`}></div>
          <div className={`filler width-33-less-10 height-33 top-margin left-margin grey`}></div>
        </div>

        <div className={`grid-item width-2`} style={{height: two+5}}>
          <div className={`filler width-50-less-10 height-50-less-10 light-blue`}></div>
          <div className={`filler width-50-less-10 height-50-less-10 left-margin dark-blue`}></div>
          <div className={`filler width-100 height-50-less-10 top-margin red`}></div>
        </div>

        <div className={`grid-item width-2 left-margin`} style={{height: one, marginTop: 25}}>
          <div className={`filler width-50-less-10 height-100 dark-blue`}></div>
          <div className={`filler width-50-less-10 height-100 left-margin light-blue`}></div>
        </div>

      </div>
    );
  }
}
