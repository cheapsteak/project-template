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

    this.cardHeight = this.refs.rect.offsetHeight;
    const height = this.refs.rect.offsetHeight;

    animate.set(this.refs.line, { x: '-50%', y: -(container.offsetHeight/2), scaleY: 0, transformOrigin: '0 1' });
    animate.set(this.refs.rect, { display: 'none', x: '-50%', y: -(container.offsetHeight/2 + 35) });
    animate.set(this.refs.background, { scaleY: 0, y: height, transformOrigin: '0 0' });
    animate.set(this.refs.text, { y: 50, opacity: 0 });
  }

  componentWillAppear(callback) {
    const el = findDOMNode(this);
    const container = this.props.getContainer();

    this.cardHeight = this.refs.rect.offsetHeight;
    const height = this.refs.rect.offsetHeight;

    animate.set(this.refs.line, { y: -(container.offsetHeight/2 + 35), scaleY: 1, transformOrigin: '0 0', ease: ViniEaseOut });
    animate.set(this.refs.rect, { display:'inline-block', y: -(container.offsetHeight/2 + 70 + this.cardHeight), ease: ViniEaseOut });
    animate.set(this.refs.background, { delay: 0.18, scaleY: 1, y: 0, transformOrigin: '0 1', ease: ViniEaseOut });
    animate.set(this.refs.text, { delay: 0.3, y: 0, opacity: 1, ease: ViniEaseOut });

    callback();
  }

  componentWillEnter (callback) {
    const el = findDOMNode(this);
    const container = this.props.getContainer();
    const lineAnimTime = 0.3;

    Promise.all([
      animate.to(this.refs.line, lineAnimTime, { y: -(container.offsetHeight/2 + 35), scaleY: 1, transformOrigin: '0 0', ease: ViniEaseOut }),
      animate.to(this.refs.rect, 0.3, { display:'inline-block', y: -(container.offsetHeight/2 + 35 + this.cardHeight), ease: ViniEaseOut }),
      animate.to(this.refs.background, 0.3, { delay: 0.18, scaleY: 1, y: 0, transformOrigin: '0 1', ease: ViniEaseOut }),
      animate.to(this.refs.text, 0.3, { delay: 0.3, y: 0, opacity: 1, ease: ViniEaseOut }),
    ])
    .then(callback)
  }

  componentWillLeave (callback) {
    const el = findDOMNode(this);
    const container = this.props.getContainer();
    const height = this.refs.rect.offsetHeight;

    Promise.all([
      animate.to(this.refs.line, 0.1, { delay: 0.13, y:  -(container.offsetHeight/2), scaleY: 0, transformOrigin: '0 1', ease: ViniEaseOut }),
      animate.to(this.refs.rect, 0.3, { delay: 0.13, display:'none', y: -(container.offsetHeight/2 + 35), ease: ViniEaseOut }),
      animate.to(this.refs.background, 0.3, { scaleY: 0, y: height, transformOrigin: '0 0', ease: ViniEaseOut }),
      animate.to(this.refs.text, 0.3, { y: 50, opacity: 0, ease: ViniEaseOut }),
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
        <div ref="rect" className="rect">
          <div ref="background" className="background"></div>
          <div ref="text" className="cta-text" dangerouslySetInnerHTML={{ __html: this.props.ctaText.replace(/ /g, '&nbsp;') }}></div>
        </div>
        <div ref="line" className="line"></div>
      </div>
    )
  }
}
