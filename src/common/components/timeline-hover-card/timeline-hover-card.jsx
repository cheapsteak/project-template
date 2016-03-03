import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';

export default class TimelineHoverCard extends React.Component {

  componentWillMount() {
    
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
    const { style, src } = this.props; 
    return (
      <div
        className="timeline-hover-card" style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <img ref="image" src={src} />
      </div>
    )
  }
}