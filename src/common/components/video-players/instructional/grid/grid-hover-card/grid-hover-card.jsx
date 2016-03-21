import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';

export default class TimelineHoverCard extends React.Component {

  componentDidMount() {
    const el = findDOMNode(this);
    const { card, image, label, line, ctaText, ctaLabel, frontOverlay, backOverlay } = this.refs;
    const staggerEls = el.querySelectorAll('.stagger-text');

    animate.set(line, { x: '-50%', y: -28, scaleY: 0, transformOrigin: '0 1' });
    animate.set(card, { display: 'none', x: '-50%', y: -50, height: 0 });
    animate.set(image, { scale: 1.5 });
    animate.set(frontOverlay, { y: 50 });
    animate.set(backOverlay, { y: 50 });
    _.forEach(staggerEls, (el) => animate.set(el, { display: 'none', x: '-50%', y: 50 }));
  }

  componentWillEnter (callback) {
    const el = findDOMNode(this);
    const { card, image, label, line, ctaText, ctaLabel, frontOverlay, backOverlay } = this.refs;
    const staggerEls = el.querySelectorAll('.stagger-text');
    const lineAnimTime = 0.3;
    const baseDelay = 0.2;
    
    this.stopAnimations();

    Promise.all([
      animate.to(line, lineAnimTime, { delay: baseDelay, y: -63, scaleY: 1, transformOrigin: '0 0' }),
      animate.to(card, 0.5, { delay: baseDelay + lineAnimTime - 0.2, display: 'block', height: 210, y: -260 }),
      animate.to(image, 1.2, { delay: baseDelay + lineAnimTime, scale: 1 }),
      animate.to(frontOverlay, 0.5, { delay: baseDelay + lineAnimTime + 0.4, y: 0 }),
      animate.to(backOverlay, 0.4, { delay: baseDelay + lineAnimTime + 0.2, y: 0 }),
      animate.staggerTo(staggerEls, 0.5, { delay: baseDelay + lineAnimTime + 0.6, display: 'block', opacity: 1, y: 8 }, 0.2)
    ])
    .then(callback)
  }

  componentWillLeave (callback) {
    const el = findDOMNode(this);
    const { card, image, label, line, ctaText, ctaLabel, frontOverlay, backOverlay } = this.refs;
    const staggerEls = el.querySelectorAll('.stagger-text');
    const baseDelay = 0.5;

    this.stopAnimations();

    Promise.all([
      animate.to(line, 0.1, { delay: 0.2, y: -28, scaleY: 0, transformOrigin: '0 1' }),
      animate.to(card, 0.3, { display: 'none', y: -50, height: 0 }),
      animate.to(frontOverlay, 0.2, { y: 50 }),
      animate.to(backOverlay, 0.3, { y: 50 }),
    ]
    .concat(_.map(staggerEls, el => animate.to(el, 0.1, { opacity: 0, y: 100}))))
    .then(callback)
  }

  stopAnimations = () => {
    TweenMax.killTweensOf(_.map(this.refs, val => val));
  };

  render() {
    return (
        <div
          className="grid-hover-card"
          style={this.props.style}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          onClick={this.props.onClick}
        >
          <Link to={'/'}>
            <div ref="card" className="card" >
              <div ref="image" className="image" style={{ backgroundImage: `url(${this.props.src})` }}></div>
              <label ref="label" className="card-label stagger-text">{ this.props.label }</label>
              <span ref="ctaText" className="cta-text stagger-text">{this.props.ctaText}</span>
              {
              /*
                To be demo'ed to client and decide if they want to remove it                

                <span ref="ctaLabel" className="cta-label stagger-text">Explore</span>
              */
              }
              <div ref="frontOverlay" className="front-label-bg"></div>
              <div ref="backOverlay" className="back-label-bg"></div>
            </div>
          </Link>
          <div ref="line" className="line"></div>
        </div>
    )
  }
}