import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';

export default class TimelineHoverCard extends React.Component {

  componentDidMount() {
    const el = findDOMNode(this);
    const { card, image, line, ctaText, ctaLabel, frontOverlay, backOverlay } = this.refs;
    const staggerEls = el.querySelectorAll('.stagger-text');

    animate.set(line, { x: '-50%', y: -20, scaleY: 0, transformOrigin: '0 1' });
    animate.set(card, { display: 'none', x: '-50%', y: -50, height: 0 });
    animate.set(image, { scale: 1.5 });
    animate.set(frontOverlay, { y: 50 });
    animate.set(backOverlay, { y: 50 });
    _.forEach(staggerEls, (el) => animate.set(el, { display: 'none', x: '-50%', y: 50 }));
  }

  componentWillEnter (callback) {
    const el = findDOMNode(this);
    const { card, image, line, ctaText, ctaLabel, frontOverlay, backOverlay } = this.refs;
    const staggerEls = el.querySelectorAll('.stagger-text');
    const lineAnimTime = 0.3;

    Promise.all([
      animate.to(line, lineAnimTime, { y: -55, scaleY: 1, transformOrigin: '0 0' }),
      animate.to(card, 0.5, { delay: lineAnimTime, display: 'block', height: 210, y: -260 }),
      animate.to(image, 0.75, { delay: lineAnimTime + 0.2, scale: 1 }),
      animate.to(frontOverlay, 0.5, { delay: lineAnimTime + 0.4, y: 0 }),
      animate.to(backOverlay, 0.5, { delay: lineAnimTime + 0.2, y: 0 }),
      animate.staggerTo(staggerEls, 0.5, { delay: lineAnimTime + 0.7, display: 'block', opacity: 1, y: 8 }, 0.2)
    ])
    .then(callback)
  }

  componentWillLeave (callback) {
    const el = findDOMNode(this);
    const { card, image, line, ctaText, ctaLabel, frontOverlay, backOverlay } = this.refs;
    const staggerEls = el.querySelectorAll('.stagger-text');

    Promise.all([
      animate.to(line, 0.1, { delay: 0.2, y: -20, scaleY: 0, transformOrigin: '0 1' }),
      animate.to(card, 0.4, { display: 'none', y: -50, height: 0 }),
      animate.to(frontOverlay, 0.3, { y: 50 }),
      animate.to(backOverlay, 0.4, { y: 50 }),
      animate.staggerTo(staggerEls, 0.1, { opacity: 0, y: 50 }, 0.1)
    ])
    .then(callback)
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
          <Link to={this.props.route}>
            <div ref="card" className="card" >
              <div ref="image" className="image" style={{ backgroundImage: `url(${this.props.src})` }}></div>
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