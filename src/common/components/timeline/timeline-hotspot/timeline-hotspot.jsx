import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';
import TransitionGroup from 'react-transition-group-plus';

export default class TimelineHotspot extends React.Component {

  state = {
    hasUserInteraction: false,
    shouldShowCTA: false
  };
 
  timeOutIds = [];

  componentWillReceiveProps(nextProps) {
    if(this.props.withinCurrentTime !== nextProps.withinCurrentTime) {
      if(nextProps.withinCurrentTime) {
        this.clearAnimations();
        this.timeOutIds.push(setTimeout(this.showCTA, 100));
        this.timeOutIds.push(setTimeout(this.hideCTA, 3000));
      } else if(!this.state.hasUserInteraction){
        this.clearAnimations();
        this.timeOutIds.push(setTimeout(this.hideCTA, 300));
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.shouldShowCTA !== nextState.shouldShowCTA) {
      if(nextState.shouldShowCTA) {
        this.expandDot();
      } else {
        this.collapseDot();
      }
    }
  }

  clearAnimations = () => {
    this.timeOutIds.forEach(id => clearTimeout(id));
    this.timeOutIds = [];
  };

  handleClick = (e) => {
    e.stopPropagation();
    this.props.onClick && this.props.onClick();
  };

  handleMouseEnter = (e) => {
    this.clearAnimations();
    this.setState({ shouldShowCTA: true, hasUserInteraction: true });
  };

  handleMouseLeave = (e) => {
    this.clearAnimations();
    this.timeOutIds.push(setTimeout(() => {
      this.setState({ shouldShowCTA: false, hasUserInteraction: false });
    }, 300));
  };

  showCTA = () => {
    this.setState({ shouldShowCTA: true });
  };

  hideCTA = () => {
    this.setState({ shouldShowCTA: false });
  };

  expandDot = () => {
    const { dot, dotBg } = this.refs;

    animate.to(dot, 0.1, { borderWidth: 5, borderColor: 'rgba(255,255,255,0.45)' });
    animate.to(dotBg, 0.3, { scale: 1 });
  };

  collapseDot = () => {
    const { dot, dotBg } = this.refs;

    animate.to(dot, 0.1, { borderWidth: 3, borderColor: 'rgba(255,255,255,1)' });
    animate.to(dotBg, 0.3, { scale: 0 });
  };

  render() {
    const { style, image, route } = this.props; 

    return (
      <div className="timeline-hotspot" style={style}>
        <TransitionGroup
          >
          { 
            this.state.shouldShowCTA && React.cloneElement(this.props.children, {
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave,
              hasUserInteraction: this.hasUserInteraction,
              route: route
            }) 
          }
        </TransitionGroup>
        <div
          ref="dot"
          className="dot"
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <span ref="dotBg"></span>
        </div>
      </div>
    )
  }
}