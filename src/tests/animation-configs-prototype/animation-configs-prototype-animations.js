function noop () {}

const states = {
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

const animationConfigs = {
  enter: {
    duration: 0.5,
    delay: 0.5
  },
  leave: {
    duration: 0.5,
    delay: 0.5
  },
  rollover: {
    duration: 0.5
  },
  rollout: {
    duration: 0.5
  }
};

const animations = {
  enter (el, callback) {
    const {duration, delay} = animationConfigs.enter;
    animate.fromTo(el, duration, states.beforeEnter, Object.assign({delay}, states.idle)).then(callback || noop);
  },

  leave: function (el, callback) {
    const {duration, delay} = animationConfigs.leave;
    animate.fromTo(el, duration, states.idle, Object.assign({delay}, states.afterLeave)).then(callback || noop);
  },

  rollover: function (el, callback) {
    const {duration, delay} = animationConfigs.rollover;
    animate.fromTo(el, duration, states.idle, Object.assign({delay}, states.rollover)).then(callback || noop);
  },

  rollout: function (el, callback) {
    const {duration, delay} = animationConfigs.rollover;
    animate.fromTo(el, duration, states.idle, Object.assign({delay}, states.rollover)).then(callback || noop);
  }
};

export default animations;