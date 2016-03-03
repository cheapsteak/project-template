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

    this.state = {
      status: states.LOADING
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.packery = new Packery(this.containerEl, {
      initLayout: false,
      itemSelector: '.grid-item',
      transitionDuration: "0"
    });
    setTimeout(() => this.packery.layout());

    this.packery.on('layoutComplete', () => {
      this.setState({status: states.READY});
    });
  }

  componentWillUnmount() {
    this.packery.destroy();
  }

  render() {
    return (
      <div className={`grid-content ${this.state.status}`}>
        {React.cloneElement(this.props.children || <div />, {ref: 'child'})}
      </div>
    );
  }
}
