import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';

const animationStates = {
  enter: { x: window.innerWidth },
  idle: { delay: 0.1, x: 0 },
  out: { delay: 0.1, x: -window.innerWidth }
};

const easeType = Expo;

function makeTransitionedPage (Component, options = {}) {
  return class TransitionedPage extends React.Component {
    static defaultProps = Component.defaultProps;
    static propTypes = Component.defaultProps;

    animationStates = _.extend({}, !options.isModal ? animationStates : {
      enter: animationStates.out,
      idle: animationStates.idle,
      out: animationStates.out
    });

    animateIn () {
      const el = findDOMNode(this);
      TweenMax.killTweensOf(el);
      animate.set(el, { css: {zIndex: 100 }});
      return animate.fromTo(el,
        0.3,
        this.animationStates.enter,
        _.extend({},
          this.animationStates.idle,
          { ease: easeType.easeOut, clearProps: 'transform' })
        );
    }

    animateOut () {
      const el = findDOMNode(this);
      TweenMax.killTweensOf(el);
      animate.set(el, { css: {zIndex: 10 }});
      return animate.to(el, 0.3, this.animationStates.out )
    }

    componentWillAppear(callback) {
      callback();
    }

    componentWillEnter(callback) {
      const el = findDOMNode(this);
      this.animateIn().then(callback);
      this.refs.child.componentWillEnter && this.refs.child.componentWillEnter();
    }

    componentDidEnter() {
      const el = findDOMNode(this);
      this.refs.child.componentDidEnter && this.refs.child.componentDidEnter();
    }

    componentWillLeave(callback) {
      const el = findDOMNode(this);
      this.refs.child.componentWillLeave && this.refs.child.componentWillLeave();
      this.animateOut().then(callback);
    }

    componentDidLeave() {
      const el = findDOMNode(this);
      TweenMax.killTweensOf(el);
      this.refs.child.componentDidLeave && this.refs.child.componentDidLeave();
    }

    render() {
      return <Component ref="child" {...this.props} />;
    }

  }
}

export default function pageTransitions () {
  return typeof arguments[0] === 'function'
    ? makeTransitionedPage(arguments[0])
    : Component => makeTransitionedPage(Component, arguments[0]);
}