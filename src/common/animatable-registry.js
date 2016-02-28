import _ from 'lodash';
import { findDOMNode } from 'react-dom';
import { EventEmitter } from 'events';

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
  component: Component,
  animation: Animation,
}
**/

const registry = [];
const emitter = new EventEmitter();

window.rrr = registry;

function register (component, animations) {
  registry.push({
    id: _.uniqueId(),
    el: findDOMNode(component),
    component,
    animations
  });

  emitter.emit('update');
};

function deregister (component) {
  const index = _.findWhere(registry, { component });
  index !== -1 && registry.splice(index, 1);
  emitter.emit('update');
};

export default {
  registry,
  register,
  deregister,
  on: emitter.on.bind(emitter),
};