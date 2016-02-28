import React from 'react';
import animatableRegistry from 'common/animatable-registry.js';

/**
Animation: {
  name: String,
  path: String,
  animations: [
    Function
  ],
  states: {
    stateName: {}
  },
  animationConfigs: {
    animationName: {}
  },
}

Animatable: {
  id: Number,
  el: HTMLElement,
  component: Component,
  animation: Animation,
}
**/

class Animatable extends React.Component {
  static propTypes = {
    animatable: React.PropTypes.object.isRequired,
  };
  render () {
    const {id, el, component, animations} = this.props.animatable;

    return <div>
      {animations.name}
      {id}
      {
        _.map(animations.animations, (animation, animationName) => {
          return <div key={animationName} onClick={() => animation(el)}>
            {animationName}
          </div>;
        })
      }
    </div>;
  };
}

export default class AnimationEditor extends React.Component {

  state = {
    registry: animatableRegistry.registry
  };

  updateRegistry = () => {
    this.setState({registry: animatableRegistry.registry});
  };

  componentWillMount () {
    animatableRegistry.on('update', this.updateRegistry);
  }

  componentWillUnmount () {
    animatableRegistry.off('update', this.updateRegistry);
  }

  render () {
    const registry = this.state.registry;

    console.log(registry);

    return <div className="animation-editor">
      {
        registry.map((animatable, i) => {
          return <Animatable
            animatable={animatable}
            key={animatable.id}
          />;
        })
      }
    </div>;
  };
};