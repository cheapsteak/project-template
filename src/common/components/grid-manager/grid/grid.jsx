import React from 'react';
import {findDOMNode} from 'react-dom';
import Packery from 'packery';

const states = {
  LOADING: 'loading',
  READY: 'ready'
};

export default class Grid extends React.Component {

  static propTypes = {
    screenWidth: React.PropTypes.number,
    isFiltered: React.PropTypes.bool
  };

  componentWillReceiveProps(newProps) {
    if (newProps.screenWidth !== this.screenWidth) {
      this.calculateSizes();
      this.screenWidth = newProps.screenWidth;
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.initializeLayout();
    this.calculateSizes();

    this.tiles = this.getTiles();
    const fillers = document.querySelectorAll('.grid-manager .filler');
    this.tiles.forEach((tile, index) => {
      tile.animateIn(index, index === 0 ? fillers : null)
    });
  }

  componentWillUnmount() {
    this.packery.destroy();
  }

  getTiles = () => {
    const tiles = [];
    for (let i = 0; i < 9; i++) {
      const tile = this.refs['tile' + i];
      tiles.push(tile);
    }
    return tiles;
  };

  initializeLayout = () => {
    this.packery = new Packery(this.containerEl, {
      initLayout: false,
      itemSelector: '.grid-item',
      transitionDuration: 0,
      percentPosition: true
    });
    setTimeout(() => this.packery.layout());  // KEEP timeout, otherwise doesn't work!

    this.packery.on('layoutComplete', () => {
      this.setState({status: states.READY});
    });
  };

  calculateSizes = () => {
    // this is overridden in derived classes
  };
}
