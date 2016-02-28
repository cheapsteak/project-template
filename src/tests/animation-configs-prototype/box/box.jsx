import React from 'react';
import { findDOMNode } from 'react-dom';
import animations from './box-animations.js';

import animatableRegistry from 'common/animatable-registry.js';

export default class Box extends React.Component {


  componentDidMount () {
    animatableRegistry.register(this, animations);
  }

  componentWillUnmount () {
    animatableRegistry.deregister(this);
  }

  render () {
    return <div className="test-box">box</div>;
  }
}

window.Box = Box;