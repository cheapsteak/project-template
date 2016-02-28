function noop () {}

export const states = {
  idle: {
    yPercent: 0,
    opacity: 1,
    scale: 1
  },
  beforeEnter: {
    yPercent: 100,
    opacity: 0
  },
  afterLeave: {
    yPercent: -100,
    opacity: 0
  },
  rollover: {
    scale: 1.1
  }
};

export const transitions = {
  enter: {
    duration: 0.5,
    delay: 0.1,
    ease: Expo.easeOut,
  },
  leave: {
    duration: 0.5,
    delay: 0.1,
    ease: Expo.easeIn,
  },
  rollover: {
    duration: 0.5,
    ease: Expo.easeIn,
  },
  rollout: {
    duration: 0.5,
    ease: Expo.easeOut,
  }
};

export const animations = {

  enter (el, callback) {
    const {duration, delay} = transitions.enter;
    animate.fromTo(el, duration, states.beforeEnter, Object.assign({delay}, states.idle)).then(callback || noop);
  },

  leave: function (el, callback) {
    const {duration, delay} = transitions.leave;
    animate.fromTo(el, duration, states.idle, Object.assign({delay}, states.afterLeave)).then(callback || noop);
  },

  rollover: function (el, callback) {
    const {duration, delay} = transitions.rollover;
    animate.fromTo(el, duration, states.idle, Object.assign({delay}, states.rollover)).then(callback || noop);
  },

  rollout: function (el, callback) {
    const {duration, delay} = transitions.rollover;
    animate.fromTo(el, duration, states.rollover, Object.assign({delay}, states.idle)).then(callback || noop);
  },
};

export default {
  name: 'Box Animation',
  path: __filename,
  states,
  transitions,
  animations,
};