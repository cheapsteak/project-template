import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Timeline extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    currentTime: React.PropTypes.number.isRequired,
    duration: React.PropTypes.number.isRequired,
    onTimeChange: React.PropTypes.func,
    items: React.PropTypes.array
  };

  constructor(props) {
    super(props)

    this.state = {
      currentTime: props.currentTime
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

  render () {
    const { width, height, duration, items, style } = this.props;
    return (
      <div className="timeline" style={style}>
        <div className="timeline-container" onClick={this.handleContainerClick}>
          <div
            className="timeline-cover"
            style={{ width: (this.state.currentTime/duration * 100) + '%' }}
            data-time={this.secondsToMinutes(this.state.currentTime)}
          >
          </div>
          { 
            items.map(plot => {
              const style = { left: (plot.time / duration * 100) + '%' }; 
              const className = this.state.currentTime === plot.time ? ' selected' : '';

              return (
                <div
                  key={plot.id}
                  style={style}
                  className={`plot${className}`}
                  onClick={this.handlePlotClick.bind(null, plot.time)}
                >
                  <span className="image-wrapper">
                    <img src={plot.img} />
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}