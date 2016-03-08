import React from 'react';
import { findDOMNode } from 'react-dom';
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
    const oneThirdHeight = containerWidth / 9 - 19;
    const twoThirdHeight = containerWidth * 2 / 9 - 15;

    this.setState({baseHeight, oneThirdHeight, twoThirdHeight});
    //console.log('calculateSizes: Grid-17400');
  };

  render() {
    const baseHeight = this.state.baseHeight;
    const oneThird = this.state.oneThirdHeight;
    const twoThird = this.state.twoThirdHeight;
    const fourParts = baseHeight + oneThird + 20;

    const strayMargin = /*window.innerWidth < 1512 ? -oneThird : */20;

    return (
      <div className={`grid layout-1740 ${this.state.status}`}>


      </div>
    );
  }
}
