import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';

export default class TransitionItem extends React.Component {

  static propTypes = {
    childProps: React.PropTypes.object,
    beforeEnter: React.PropTypes.any.isRequired,
    idle: React.PropTypes.any.isRequired,
    afterLeave: React.PropTypes.any.isRequired,
    duration: React.PropTypes.any,
    ease: React.PropTypes.shape({
      enter: React.PropTypes.object,
      leave: React.PropTypes.object,
    }),
    shouldTransitionParentNodeHeight: React.PropTypes.bool
  };

  static defaultProps = {
    duration: 0.3,
    ease: {
      enter: Sine.easeIn,
      leave: Sine.easeOut,
    },
    shouldTransitionParentNodeHeight: false,
  };

  componentDidMount () {
    const el = findDOMNode(this);
  }


  componentWillAppear(callback) {
    const timeline = this.getTimeline();
    timeline.seek('idle');
    callback();
  }

  componentWillEnter (callback) {
    const timeline = this.getTimeline();

    const el = findDOMNode(this);
    const duration = this.getDuration('enter');
    TweenMax.killTweensOf(timeline);

    timeline.seek('beforeEnter');
    TweenMax.to(
      timeline,
      duration,
      {
        time: timeline.getLabelTime('idle'),
        onComplete: callback,
        ease: this.props.ease.enter,
      }
    );

    if (this.props.shouldTransitionParentNodeHeight && el.getBoundingClientRect().height) {
      TweenMax.killTweensOf(el.parentNode);
      TweenMax.to(el.parentNode, duration, {
        height: el.getBoundingClientRect().height,
        ease: this.props.ease.enter,
      });
    }
  }

  componentWillLeave (callback) {
    const timeline = this.getTimeline();
    const el = findDOMNode(this);
    const duration = this.getDuration('leave');
    TweenMax.killTweensOf(timeline);

    timeline.seek('idle');
    TweenMax.to(
      timeline,
      duration,
      {
        time: timeline.getLabelTime('afterLeave'),
        onComplete: callback,
        ease: this.props.ease.leave,
      }
    );
  }

  getDuration = (transitionName) => {
    return this.props.duration[transitionName] || this.props.duration;
  };

  getUIState = (stateName) => {
    return _.isFunction(this.props[stateName]) ? this.props[stateName]() : this.props[stateName];
  };

  getTimeline = () => {
    const el = findDOMNode(this);
    return new TimelineMax()
      .pause()
      .add(TweenMax.to(el, 1, Object.assign({}, this.getUIState('beforeEnter'))))
      .add('beforeEnter')
      .add(TweenMax.to(el, 1, Object.assign({}, this.getUIState('idle'))))
      .add('idle')
      .add(TweenMax.to(el, 1, Object.assign({}, this.getUIState('afterLeave'))))
      .add('afterLeave');
  }

  render () {
    return React.cloneElement(
      this.props.children || <div/>,
      Object.assign({}, this.props.childProps, { ref: 'child' }),
      )
  }
}