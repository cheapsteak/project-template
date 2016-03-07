import React from 'react';
import { findDOMNode } from 'react-dom';
import GridBase from '../grid.jsx';
import GridTile from '../grid-tile/grid-tile';

const gridItemsMargin = 20;


export default class Layout1060 extends GridBase {

  state = {
    baseHeight: 0,
    oneThirdHeight: 0,
    twoThirdHeight: 0
  };

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * 0.5 - gridItemsMargin / 2;
    const oneThirdHeight = containerWidth / 6 - 15;
    const twoThirdHeight = containerWidth / 3 - 17;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    console.log('resize 1060');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const oneThird = this.state.oneThirdHeight;
    const twoThird = this.state.twoThirdHeight;
    const mouseCoordinates = this.props.mouseCoordinates;
    const scrollTop = this.props.scrollTop;

    return (
      <div className={`grid layout-1060 ${this.state.status}`}>

        <div className={`grid-item id-1 first-row width-3 right-margin`} style={{height: twoThird}}>
          <div className={`nested-cube-width-66-extra-10 grey`}>
            <GridTile
              title={'welcome'}
              photo={'../images/test-kid.png'}
              baseHeight={baseHeight}
              scrollTop={scrollTop}
              mouseCoordinates={mouseCoordinates}
            />
          </div>
          <div className={`nested-bar-width-33-height-100-less-10 left-margin red`}></div>
        </div>

        <div className={`grid-item id-2 width-3 first-row sand`} style={{height: baseHeight}}>
          <GridTile
            title={'science'}
            photo={'../images/test-kid.png'}
            baseHeight={baseHeight}
            scrollTop={scrollTop}
            mouseCoordinates={mouseCoordinates}
          />
        </div>

        <div className={`grid-item id-3 width-3 right-margin`} style={{height: twoThird}}>
          <div className={`full-size light-blue`}>
            <GridTile
              title={'literacy & writing'}
              photo={'../images/test-kid.png'}
              baseHeight={baseHeight}
              scrollTop={scrollTop}
              mouseCoordinates={mouseCoordinates}
            />
          </div>
        </div>

        <div className={`grid-item id-4 width-3`} style={{height: twoThird}}>
          <div className={`full-size light-blue`}>
            <GridTile
              title={'math'}
              photo={'../images/test-kid.png'}
              baseHeight={baseHeight}
              scrollTop={scrollTop}
              mouseCoordinates={mouseCoordinates}
            />
          </div>
        </div>

        <div className={`grid-item id-5 width-3 right-margin light-blue`} style={{height: baseHeight}}>
          <GridTile
            title={'electives'}
            photo={'../images/test-kid.png'}
            baseHeight={baseHeight}
            scrollTop={scrollTop}
            mouseCoordinates={mouseCoordinates}
          />
        </div>

        <div className={`grid-item id-6 width-3 grey`} style={{height: baseHeight}}>
          <GridTile
            title={'computer science'}
            photo={'../images/test-kid.png'}
            baseHeight={baseHeight}
            scrollTop={scrollTop}
            mouseCoordinates={mouseCoordinates}
          />
        </div>

        <div className={`grid-item id-7 width-3`} style={{height: twoThird+10}}>
          <div className={`nested-cube-width-66-extra-10 grey`}>
            <GridTile
              title={'parental investment'}
              baseHeight={baseHeight}
              scrollTop={scrollTop}
              mouseCoordinates={mouseCoordinates}
            />
          </div>
          <div className={`nested-cube-33-width-extra-10 left-margin dark-blue`}></div>
          <div className={`nested-cube-33-width-extra-10 top-margin left-margin dark-blue`}></div>
        </div>

        <div className={`grid-item id-8 width-1 left-margin`} style={{height: oneThird}}>
          <div className={`full-size dark-blue`}></div>
        </div>

        <div className={`grid-item id-9 width-2 left-padding`} style={{height: baseHeight+5}}>
          <div className={`full-size grey`}>
            <GridTile
              title={'history'}
              photo={'../images/test-kid.png'}
              baseHeight={baseHeight}
              scrollTop={scrollTop}
              mouseCoordinates={mouseCoordinates}
            />
          </div>
        </div>

        <div className={`grid-item id-10 width-2 right-padding`} style={{height: twoThird+7}}>
          <div className={`nested-cube-50 dark-blue`}></div>
          <div className={`nested-cube-50 left-margin dark-blue`}></div>
          <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item id-11 width-2-less-15 grey`} style={{height: twoThird+7}}>
          <GridTile
            title={'character development'}
            baseHeight={baseHeight}
            scrollTop={scrollTop}
            mouseCoordinates={mouseCoordinates}
          />
        </div>

      </div>
    );
  }
}
