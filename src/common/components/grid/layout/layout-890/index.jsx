import React from 'react';
import Layout from '../index.jsx';
import GridTile from '../../grid-tile';
import scrollbarSize from 'common/utils/scrollbar-size';

export default class Layout890 extends Layout {

  render() {
    const containerWidth = window.innerWidth - 60 - scrollbarSize.get();
    const two = containerWidth * 0.4 - 10;
    const three = containerWidth * 0.6 - 10;

    return (
      <div className={`grid layout-890 ${this.state.status} ${this.props.className}`}>

        <div className={`grid-item first-row width-2`} style={{height: three}}>
          <div className={`filler width-100 height-33-less-15 red`}></div>
          <div className={`width-100 height-66-less-5 top-margin grey`}>
            <GridTile
              ref="tile0"
              slug={`welcome`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>
        <div className={`grid-item first-row width-3 left-margin sand`} style={{height: three}}>
          <GridTile
            ref="tile1"
            slug={`science`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3`} style={{height: two}}>
          <div className={`full-size light-blue`}>
            <GridTile
              ref="tile2"
              slug={`literacy-and-writing`}
              isFiltered={this.props.isFiltered}
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
            slug={`electives`}
            isFiltered={this.props.isFiltered}
          />
        </div>

        <div className={`grid-item width-3 height-2 light-blue`} style={{height: two}}>
          <GridTile
            ref="tile4"
            slug={`math`}
            isFiltered={this.props.isFiltered}
          />
        </div>
        <div className={`grid-item width-2 height-2 left-margin`} style={{height: two}}>
          <div className={`full-size grey`}>
            <GridTile
              ref="tile5"
              slug={`character-development`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

        <div className={`grid-item width-3 grey`} style={{height: three}}>
          <GridTile
            ref="tile6"
            slug={`computer-science`}
            isFiltered={this.props.isFiltered}
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
              slug={`parental-investment`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>
        <div className={`grid-item width-2 left-margin`} style={{height: three}}>
          <div className={`full-size grey`}>
            <GridTile
              ref="tile8"
              slug={`history`}
              isFiltered={this.props.isFiltered}
            />
          </div>
        </div>

      </div>
    );
  }
}
