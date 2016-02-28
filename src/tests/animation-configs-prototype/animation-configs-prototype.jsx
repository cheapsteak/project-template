import React from 'react';
import Box from './box/box.jsx';

import TransitionGroup from 'react-transition-group-plus';


export default class AnimationConfigsPrototype extends React.Component {
  render () {
    return <div className="animation-configs-prototype">
      <Box />
      <Box />
      <Box />
      <Box />
    </div>;
  }
}