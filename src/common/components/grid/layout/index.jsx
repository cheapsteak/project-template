import React from 'react';
import {findDOMNode} from 'react-dom';
import Packery from 'packery';
import animate from 'gsap-promise';

const states = {
  LOADING: 'loading',
  READY: 'ready'
};

export default class Layout extends React.Component {

  static propTypes = {
    isFiltered: React.PropTypes.bool,
    className: ''
  };

  static defaultProps = {
    className: ''
  };

  state = {
    status: states.LOADING
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.initializeLayout();

    this.tiles = this.getTiles();
    this.fillers = document.querySelectorAll('.grid-page .filler');
    animate.set(this.fillers, {autoAlpha: 0, scale: 1.15});

    this.animateIn();
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

  animateIn = () => {
    setTimeout(() => {
      this.tiles.forEach((tile, index) => {
        const delay = (0.1 * index) + 0.7;
        tile.animateIn(delay)
      });
      this.animateFillers(0.9);
    });
  };

  animateFillers = (delay = 0.5) => {
    return animate.all([
      animate.staggerTo(this.fillers, 0.8, {autoAlpha: 1, delay: delay}, 0.1),
      animate.staggerTo(this.fillers, 1.2, {scale: 1, delay: delay, ease: Expo.easeOut}, 0.1)
    ])
  };
}
