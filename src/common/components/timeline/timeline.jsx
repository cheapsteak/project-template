import React from 'react';
import { findDOMNode } from 'react-dom';
import HotSpot from './timeline-hotspot/timeline-hotspot.jsx';
import HoverCard from './timeline-hover-card/timeline-hover-card.jsx';
import animate from 'gsap-promise';
import _ from 'lodash';

export default class Timeline extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    currentTime: React.PropTypes.number.isRequired,
    duration: React.PropTypes.number.isRequired,
    onTimeChange: React.PropTypes.func,
    items: React.PropTypes.array
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  state = { hoveredTime: 0, time: 0 };

  changeCurrentTime(time) {
    this.props.onTimeChange(time)

    // Using state to store time instead of using the store's currentTime because
    // the flow does not update the scrubbing fast enough
    this.setState({ time: time });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ time: nextProps.currentTime });
  }

  changeTimeOnMouseEvent = (e) => {
    const { hoveredTimeStampContainer } = this.refs;
    const newTime = this.getCurrentTime(e)
    this.changeCurrentTime(newTime);
  };

  getCurrentTime(mouseEvent) {
    // Gets current time based on the mouses positionX on the timeline
    const el = findDOMNode(this)
    const positionX = mouseEvent.clientX - el.getBoundingClientRect().left;

    return positionX >= 0 ? positionX / el.offsetWidth * this.props.duration : 0;
  }

  handleMouseDown = (e) => {
    const { hoveredTimeStampContainer } = this.refs;
    this.changeTimeOnMouseEvent(e);
    animate.to(hoveredTimeStampContainer, 0.1, { opacity: 0 });
    this.mouseDown = true;
  };

  handleMouseEnter = (e) => {
    const { hoveredTimeStampContainer, hoveredTimeStamp} = this.refs;

    animate.to(hoveredTimeStamp, 0.3, { top: -22});
    animate.to(hoveredTimeStampContainer, 0.3, { opacity: 1 });
  };

  handleMouseLeave = (e) => {
    const { hoveredTimeStampContainer, hoveredTimeStamp} = this.refs;
    
    this.mouseDown = false;

    animate.to(hoveredTimeStamp, 0.3, { top: -12 });
    animate.to(hoveredTimeStampContainer, 0.3, { opacity: 0 });
  };

  handleMouseMove = (e) => {
    const el = findDOMNode(this)
    const { hoveredTimeStampContainer, progressHead } = this.refs;
    const componentClientRect = el.getBoundingClientRect();
    const positionX = e.clientX - componentClientRect.left;
    const mousePositionTime = this.getCurrentTime(e);
    const styledTime = this.secondsToMinutes(mousePositionTime);
    const progressHeadX = progressHead.getBoundingClientRect().left;
    const pointEls = el.querySelectorAll('.timeline-hotspot');

    this.styledCurrentTime !== this.state.hoveredTime && this.setState({ hoveredTime: styledTime });

    animate.set(hoveredTimeStampContainer, { x: e.clientX - componentClientRect.left - hoveredTimeStampContainer.clientWidth/2 });

    if(_.any(pointEls, (point) => this.isWithinVariance(e.clientX, point.getBoundingClientRect().left, 8))
      || this.isWithinVariance(e.clientX, progressHeadX, 40)
      || this.isWithinVariance(e.clientX, componentClientRect.left, 15)
      || this.isWithinVariance(e.clientX, componentClientRect.right, 50)
      ) {
      animate.to(hoveredTimeStampContainer, 0.1, { opacity: 0 });
    } else {
      animate.to(hoveredTimeStampContainer, 0.3, { opacity: 1 });
    }

    if(this.mouseDown) {
      this.changeTimeOnMouseEvent(e);
    }
  };

  handlePointClick = (time) => {
    this.changeCurrentTime(time);
  };

  handleMouseUp = (e) => {
    this.mouseDown = false;
  };

  secondsToMinutes (totalSeconds) {
    const totalSecondsFloat = parseFloat(totalSeconds);
    let minutes = Math.floor(totalSecondsFloat / 60);
    let seconds = Math.round(totalSecondsFloat - (minutes * 60));

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    const time = minutes + ':' + seconds;

    return time;
  }

  isWithinVariance(srcNumber, targetNumber, variance, lowerRangeOnly) {
    return srcNumber >= targetNumber - variance && srcNumber <= targetNumber + (lowerRangeOnly ? 0 : variance);
  }

  render () {
    const { style, currentTime, duration, items } = this.props;
    const progress = duration ? (this.state.time/duration * 100) : 0;

    return (
      <div className="timeline" style={style}>
        <div
          className="timeline-container"
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
        >
          { /* The element to appears when mouse hovers over the timeline */ }
          <div
            ref="hoveredTimeStampContainer"
            className="hovered-time-stamp"
          >
            <span ref="hoveredTimeStamp">{this.state.hoveredTime}</span>
          </div>

          { /* The progress indicator */}
          <div
            className="timeline-cover"
            style={{ width: `${progress}%` }}
            data-time={this.secondsToMinutes(currentTime)}
          >
            <span ref="progressHead"></span>
          </div>
          { 
            /* Check if there is a duration before setting the dots for the case of video metadata currently loading */
            duration 
              ? items.map(point => {
                  const style = { left: (point.time / duration * 100) + '%' }; 
                  const className = currentTime === point.time ? ' selected' : '';
                  const isActive = this.isWithinVariance(currentTime, point.time, 0.3, true)

                  return (
                    <HotSpot
                      style={style}
                      key={point.time}
                      withinCurrentTime={isActive}
                      route={point.route}
                      onClick={this.handlePointClick.bind(this, point.time)}
                    >
                      <HoverCard src={point.img} />
                    </HotSpot>
                  )
                })
              : undefined
          }
        </div>
      </div>
    )
  }
}