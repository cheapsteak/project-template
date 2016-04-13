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
    isShortDelay: React.PropTypes.bool,
    isFiltered: React.PropTypes.bool,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    className: ''
  };

  state = {
    status: states.LOADING
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFiltered !== this.lastFilteredState) {
      nextProps.isFiltered ? this.applyFilter() : this.removeFilter();
      this.lastFilteredState = nextProps.isFiltered;
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.initializeLayout();

    this.tiles = this.getTiles();
    this.fillers = document.querySelectorAll('.grid-page .filler');
    animate.set(this.fillers, {autoAlpha: 0, scale: 1.05});

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
        const delay = (0.15 * index) + (this.props.isShortDelay ? 0.3 : 0.7);
        tile.animateIn(delay, index)
      });
      this.animateFillers(this.props.isShortDelay ? 0.5 : 0.9);
    });
  };

  animateFillers = (delay = 0.5) => {

    setTimeout(() => {
      this.fillers.animatedIn = true;
    }, delay * 1000);

    return animate.all([
      animate.staggerTo(this.fillers, 0.8, {autoAlpha: this.props.isFiltered ? 0.1 : 1, delay: delay}, 0.1),
      animate.staggerTo(this.fillers, 1.2, {
        scale: this.props.isFiltered ? 0.9 : 1,
        delay: delay,
        ease: ViniEaseOut
      }, 0.1)
    ])
  };
  randomizeArray = (arr) => {
    arr = Array.prototype.slice.call(arr);
    arr.sort(() => 0.5 - Math.random()); // shuffle
  };

  applyFilter = () => {
    if (!this.fillers.animatedIn) {
      return;
    }
    const fillers = [...this.fillers];
    this.randomizeArray(fillers);
    animate.staggerTo(fillers, 0.4, {scale: 0.9, autoAlpha: 0.1, ease: ViniEaseOut}, 0.05);
  };

  removeFilter = () => {
    if (!this.fillers.animatedIn) {
      return;
    }
    const fillers = [...this.fillers];
    this.randomizeArray(fillers);
    animate.staggerTo(fillers, 0.4, {scale: 1, autoAlpha: 1, ease: ViniEaseOut}, 0.05);
  };
}
