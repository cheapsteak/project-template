import React from 'react';
import { findDOMNode } from 'react-dom';
import Packery from 'packery';

const states = {
  LOADING: 'loading',
  READY: 'ready'
};

const gridItemsMargin = 20;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING
    }
  }

  static propTypes = {};
  static defaultProps = {};

  handleWindowResize = () => {
    this.updateLayout();
  };

  updateLayout = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * 0.6;
    const twoThirdHeight = containerWidth * 0.4 - gridItemsMargin;

    this.setState({baseHeight, twoThirdHeight});
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.packery = new Packery(this.containerEl, {
      initLayout: false,
      itemSelector: '.grid-item',
      transitionDuration: 0.4
    });
    this.updateLayout();
    setTimeout(() => this.packery.layout());

    this.packery.on('layoutComplete', () => {
      this.setState({status: states.READY});
    });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    this.packery.destroy();
    window.removeEventListener('resize', this.handleWindowResize);
  }
}
