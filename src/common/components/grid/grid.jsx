import React from 'react';
import { findDOMNode } from 'react-dom';
import Packery from 'packery';

const states = {
  LOADING: 'loading',
  READY: 'ready'
};

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    screenWidth: React.PropTypes.number
  };

  calculateSizes = () => {
    // this is overridden in derived classes
  };

  componentWillReceiveProps(newProps) {
    if (newProps.screenWidth !== this.screenWidth) {
      this.calculateSizes();
      this.screenWidth = newProps.screenWidth;
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.packery = new Packery(this.containerEl, {
      initLayout: false,
      itemSelector: '.grid-item',
      transitionDuration: 0
    });
    setTimeout(() => this.packery.layout());  // KEEP timeout, otherwise doesn't work!

    this.packery.on('layoutComplete', () => {
      this.setState({status: states.READY});
    });

    this.calculateSizes();
  }

  componentWillUnmount() {
    this.packery.destroy();
  }
}
