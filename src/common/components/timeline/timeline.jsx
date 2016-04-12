import React from 'react';
import { findDOMNode } from 'react-dom';
import HotSpot from './timeline-hotspot/timeline-hotspot.jsx';
import HoverCard from './timeline-hover-card/timeline-hover-card.jsx';
import animate from 'gsap-promise';
import _ from 'lodash';
import detect from '../../utils/detect/';

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

  componentDidMount() {
    const { hoveredTimeStampDot } = this.refs;

    animate.set(hoveredTimeStampDot, { scale: 0 });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ time: nextProps.currentTime });
  }

  changeTimeOnMouseEvent = (e) => {
    const { hoveredTimeStampContainer } = this.refs;
    const newTime = this.getCurrentTime(e)
    this.changeCurrentTime(newTime);
  };

  getCurrentTime(e) {
    // Gets current time based on the mouses positionX on the timeline
    const el = findDOMNode(this)
    const coordX = (detect.isMobile) ? e.targetTouches[0].clientX : e.clientX;
    const positionX = coordX - el.getBoundingClientRect().left;

    return positionX >= 0 ? positionX / el.offsetWidth * this.props.duration : 0;
  }

  handleMouseDown = (e) => {
    const { hoveredTimeStampContainer } = this.refs;
    this.changeTimeOnMouseEvent(e);
    animate.to(hoveredTimeStampContainer, 0.1, { opacity: 0 });
    this.mouseDown = true;
  };

  handleMouseEnter = (e) => {
    if (detect.isMobile) return;
    const { hoveredTimeStampContainer, hoveredTimeStamp, hoveredTimeStampDot } = this.refs;

    animate.to(hoveredTimeStamp, 0.3, { top: -22});
    animate.to(hoveredTimeStampContainer, 0.3, { opacity: 1 });
    animate.to(hoveredTimeStampDot, 0.3, { delay: 0.1, scale: 1 });
  };

  handleMouseLeave = (e) => {
    if (detect.isMobile) return;
    const { hoveredTimeStampContainer, hoveredTimeStamp, hoveredTimeStampDot } = this.refs;

    this.mouseDown = false;

    animate.to(hoveredTimeStamp, 0.3, { top: -12 });
    animate.to(hoveredTimeStampContainer, 0.3, { opacity: 0 });
    animate.to(hoveredTimeStampDot, 0.3, { scale: 0 });
  };

  handleMouseMove = (e) => {
    const el = findDOMNode(this)
    const { hoveredTimeStampContainer, progressHead } = this.refs;
    const componentClientRect = el.getBoundingClientRect();
    const coordX = (detect.isMobile) ? e.targetTouches[0].clientX : e.clientX;
    const positionX = coordX - componentClientRect.left;
    const mousePositionTime = this.getCurrentTime(e);
    const styledTime = this.secondsToMinutes(mousePositionTime);
    const progressHeadX = progressHead.getBoundingClientRect().left;
    const pointEls = el.querySelectorAll('.timeline-hotspot');

    if (!detect.isMobile) {
      this.styledCurrentTime !== this.state.hoveredTime && this.setState({ hoveredTime: styledTime });
      animate.set(hoveredTimeStampContainer, { x: coordX - componentClientRect.left - hoveredTimeStampContainer.clientWidth/2 });

      if(_.some(pointEls, (point) => this.isWithinVariance(coordX, point.getBoundingClientRect().left, 12))
        || this.isWithinVariance(coordX, progressHeadX, 40)
        || this.isWithinVariance(coordX, componentClientRect.left, 15)
        || this.isWithinVariance(coordX, componentClientRect.right, 50)
      ) {
        animate.to(hoveredTimeStampContainer, 0.1, { opacity: 0 });
      } else {
        animate.to(hoveredTimeStampContainer, 0.3, { opacity: 1 });
      }
    }

    if(this.mouseDown) {
      this.changeTimeOnMouseEvent(e);
    }
  };

  handlePointClick = (time) => {
    if (detect.isMobile) return;
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

  getTimelineNode = () => {
    return this.refs.timeline;
  };

  render () {
    const { style, duration, items } = this.props;
    const progress = duration ? (this.state.time/duration * 100) : 0;
    const hideTimeStamp = this.state.time/duration > 0.945;

    return (
      <div ref="timeline" className="timeline" style={style}>
        <div
          className="timeline-container"
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          onTouchMove={this.handleMouseMove}
          onTouchStart={this.handleMouseDown}
          onTouchEnd={this.handleMouseUp}
        >
          { /* The Scrubber / The element to appears when mouse hovers over the timeline */ }
          <div
            ref="hoveredTimeStampContainer"
            className="hovered-time-stamp"
          >
            <span ref="hoveredTimeStamp" className="hovered-bar">{this.state.hoveredTime}</span>
            <span ref="hoveredTimeStampDot" className="hovered-dot"></span>
          </div>

          { /* The progress indicator */}
          <div
            className={`timeline-cover ${hideTimeStamp ? 'hide-time' : ''}`}
            style={{ width: `${progress}%` }}
            data-time={this.secondsToMinutes(this.state.time)}
          >
            <span ref="progressHead"></span>
          </div>
          {
            /* Check if there is a duration before setting the dots for the case of video metadata currently loading */
            duration
              ? items.map(point => {
                  const style = { left: (point.time / duration * 100) + '%' };
                  const className = this.state.time === point.time ? ' selected' : '';
                  const isActive = false;

                  return (
                    <HotSpot
                      style={style}
                      key={point.time}
                      withinCurrentTime={isActive}
                      route={point.route}
                      onClick={this.handlePointClick.bind(this, point.time)}
                    >
                      <HoverCard src={point.img} ctaText={point.title} getContainer={this.getTimelineNode} />
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
