import React from 'react';
import { findDOMNode } from 'react-dom';
import Packery from 'packery';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.layout = new Packery(this.containerEl, {
      itemSelector: '.grid-item',
      transitionDuration: 0,
      masonry: {}
    });
  }

  render() {
    return (
      <div className={`grid grid-1`}>

        <div className={`grid-item width-2 height-3 no-margin right-padding`}>
          <div className={`width-full height-1 red`}></div>
          <div className={`width-full height-2 top-margin gray`}></div>
        </div>
        <div className={`grid-item width-3 height-3 no-margin orange`}></div>

        <div className={`grid-item width-3 height-2`}>
          <div className={`width-full height-full light-blue`}></div>
        </div>
        <div className={`grid-item width-2 height-2 left-padding`}>
          <div className={`width-2 height-1 right-margin red`}></div>
        </div>

        <div className={`grid-item width-2 height-3`}></div>
        <div className={`grid-item width-3 height-3 light-blue`}></div>

        <div className={`grid-item width-3 height-2 light-blue`}></div>
        <div className={`grid-item width-2 height-2 gray`}></div>

        <div className={`grid-item width-3 height-3 gray`}></div>
        <div className={`grid-item width-2 height-2`}></div>

        <div className={`grid-item width-3 height-2`}></div>
        <div className={`grid-item width-2 height-3 gray`}></div>

      </div>
    );
  }
}
