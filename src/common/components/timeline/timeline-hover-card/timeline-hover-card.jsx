import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';
import { Link } from 'react-router';

const animationStates = {
  out: { display: 'none', opacity: 0, x: '-50%', y: -220, height: '208px' },
  in: { display: 'block', opacity: 1, y: -240 }
}

export default class TimelineHoverCard extends React.Component {

  componentDidMount() {
    const el = findDOMNode(this);
    animate.set(el, animationStates.out);
  }

  componentWillEnter (callback) {
    const el = findDOMNode(this);
    animate
      .to(el, 0.5, animationStates.in)
      .then(callback);
  }

  componentWillLeave (callback) {
    const el = findDOMNode(this);
    animate
      .to(el, 0.5, animationStates.out)
      .then(callback);
  }

  handleMouseEnter = (e) => {
    this.props.onMouseEnter();
  };

  handleMouseLeave = (e) => {
    this.props.onMouseLeave();
  };

  handleClick = (e) => {
    this.props.onClick && this.props.onClick();
  };

  render() {
    const { style, src, route } = this.props; 
    return (
        <div
          className="timeline-hover-card"
          style={style}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        >
          <Link to={route}>
              <img ref="image" src={src} />
          </Link>
        </div>
    )
  }
}