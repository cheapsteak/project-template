import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';

const EaseType = Quad;

export default class TimelineHoverCard extends React.Component {

  componentDidMount() {
    const el = findDOMNode(this);
    const container = this.props.getContainer();

    this.cardHeight = this.refs.background.offsetHeight;

    animate.set(this.refs.line, { x: '-50%', y: -(container.offsetHeight/2), scaleY: 0, transformOrigin: '0 1' });
    animate.set(this.refs.background, { display: 'none', x: '-50%', y: -(container.offsetHeight/2 + 35), scaleY: 0, transformOrigin: '0 1' });
  }

  componentWillEnter (callback) {
    const el = findDOMNode(this);
    const container = this.props.getContainer();
    const lineAnimTime = 0.3;

    Promise.all([
      animate.to(this.refs.line, lineAnimTime, { y: -(container.offsetHeight/2 + 35), scaleY: 1, transformOrigin: '0 0', ease: EaseType.easeOut }),
      animate.to(this.refs.background, 0.3, { delay: lineAnimTime - 0.12, display: 'inline-block', y: -(container.offsetHeight/2 + 35 + this.cardHeight), scaleY: 1, transformOrigin: '0 0', ease: EaseType.easeOut }),
    ])
    .then(callback)
  }

  componentWillLeave (callback) {
    const el = findDOMNode(this);
    const container = this.props.getContainer();

    Promise.all([
      animate.to(this.refs.line, 0.1, { delay: 0.2, y:  -(container.offsetHeight/2), scaleY: 0, transformOrigin: '0 1', ease: EaseType.easeIn }),
      animate.to(this.refs.background, 0.2, { display: 'none', x: '-50%', y: -(container.offsetHeight/2 + 35), scaleY: 0, transformOrigin: '0 1', ease: EaseType.easeIn })
    ])
    .then(callback)
  }

  componentWillUnmount() {
    TweenMax.killTweensOf([ this.refs.line, this.refs.background ]);
  }

  render() {
    return (
        <div
          className="timeline-hover-card"
          style={this.props.style}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          onClick={this.props.onClick}
        >
          <div ref="background" className="background">
            <span ref="ctaText" className="cta-text">{this.props.ctaText}</span>
          </div>
          <div ref="line" className="line"></div>
        </div>
    )
  }
}
