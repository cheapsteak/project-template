import React from 'react';
import { findDOMNode } from 'react-dom';
import HotSpot from 'common/components/timeline-hotspot/timeline-hotspot.jsx';
import TransitionGroup from 'react-addons-transition-group';

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

  constructor(props) {
    super(props)

    this.state = {
      currentTime: props.currentTime,
      items: props.items
    }
  }

  componentWillReceiveProps({ currentTime}) {
    this.setState({ currentTime });
  }

  changeCurrentTime(time) {
    this.props.onTimeChange
      ? this.props.onTimeChange(time)
      : this.setState({ currentTime: time });
  }

  handleContainerClick = (e) => {
    const el = findDOMNode(this)
    const positionX = e.clientX - el.getBoundingClientRect().left;
    const newTime = positionX / el.offsetWidth * this.props.duration;
    this.changeCurrentTime(newTime);
  }

  handlePlotClick = (time, e) => {
    e.stopPropagation();
    this.changeCurrentTime(time);
  };

  goToRoute = (route) => {
    this.context.router.push(route)
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


  isWithinVariance(srcNumber, targetNumber, variance) {
    return srcNumber >= targetNumber - variance && srcNumber <= targetNumber;
  }

  render () {
    const { width, height, duration, items, style } = this.props;
    const progress = duration ? (this.state.currentTime/duration * 100) : 0;

    return (
      <div className="timeline" style={style}>
        <div className="timeline-container" onClick={this.handleContainerClick}>
          <div
            className="timeline-cover"
            style={{ width: `${progress}%` }}
            data-time={this.secondsToMinutes(this.state.currentTime)}
          >
          </div>
          { 
            this.state.items.map(plot => {
              const style = { left: (plot.time / duration * 100) + '%' }; 
              const className = this.state.currentTime === plot.time ? ' selected' : '';
              const isActive = this.isWithinVariance(this.state.currentTime, plot.time, 0.3)
    
              return (
                <HotSpot
                  key={plot.id}
                  style={style}
                  image={plot.img}
                  onClick={plot.route && this.goToRoute.bind(this, plot.route)}
                  withinCurrentTime={isActive}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}