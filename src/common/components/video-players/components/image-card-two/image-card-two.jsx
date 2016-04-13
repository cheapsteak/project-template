import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import IconExplore from 'svgs/icon-explore.svg';
import animate from 'gsap-promise';
import scale from 'common/utils/scaleAt1400';
import clamp from 'clamp';

function calculateAnimationStates(els) {
  return {
    out: {
      card: {
        opacity: 0,
        y: 110,
      },
      icon: {
        opacity: 0,
        y: 50
      },
      label: {
        opacity: 0,
        y: 50
      },
      title: {
        opacity: 0,
        y: 50
      }
    },
    idle: {
      card: {
        delay: 0.3,
        opacity: 1,
        y: 0,
      },
      icon: {
        delay: 0.6,
        opacity: 1,
        y: 0
      },
      label: {
        delay: 0.75,
        opacity: 1,
        y: 0
      },
      title: {
        delay: 0.9,
        opacity: 1,
        y: 0
      }
    }
  };
};

export default class ImageCardTwo extends React.Component {

  static propTypes = {
    routes: React.PropTypes.string,
    image: React.PropTypes.string,
    label: React.PropTypes.string,
    title: React.PropTypes.string,
  };

  componentDidMount() {
    this.animationStates = calculateAnimationStates(this.refs);

    animate.set(this.refs.card, this.animationStates.out.card);
    animate.set(this.refs.icon, this.animationStates.out.title);
    animate.set(this.refs.label, this.animationStates.out.label);
    animate.set(this.refs.title, this.animationStates.out.title);
  }

  componentWillEnter (callback) {
    Promise.all([
      animate.to(this.refs.card, 0.3, this.animationStates.idle.card),
      animate.to(this.refs.icon, 0.3, this.animationStates.idle.icon),
      animate.to(this.refs.label, 0.3, this.animationStates.idle.label),
      animate.to(this.refs.title, 0.3, this.animationStates.idle.title)
    ])
    .then(callback);
  }

  componentWillLeave (callback) {
    Promise.all([
      animate.to(this.refs.card, 0.3, this.animationStates.out.card),
      animate.to(this.refs.icon, 0.3, this.animationStates.out.icon),
      animate.to(this.refs.label, 0.3, this.animationStates.out.label),
      animate.to(this.refs.title, 0.3, this.animationStates.out.title)
    ])
    .then(callback);
  }

  render() {
    return (
      <a
        to={this.props.route}
        href={this.props.href}
        ref={ node => this.refs.card = findDOMNode(node) }
        className="ending-card image-card-two"
        target={this.props.target}
      >
        <img src={this.props.image} />
        <div ref="icon" className="icon">></div>
        <label ref="label">{this.props.label}</label>
        <h3 ref="title" dangerouslySetInnerHTML={{ __html: this.props.title }}></h3>
      </a>
    )
  }
}