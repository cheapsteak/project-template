import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTime: props.currentTime,
      position: ''
    }
    // setInterval(() => {
    //   this.setState({ currentTime: (this.state.currentTime + 0.1) % props.duration }) 
    // }, 50)
  }

  componentWillReceiveProps({ currentTime}) {
    this.setState({ currentTime });
  }

  handleContainerClick = (e) => {
    const el = findDOMNode(this)
    const positionX = e.clientX - el.getBoundingClientRect().left;
    // this.setState({ currentTime: positionX / el.offsetWidth * this.props.duration })
    this.props.onTimeChange(positionX / el.offsetWidth * this.props.duration);
  };


  handlePlotClick = (time, e) => {
    e.stopPropagation();
    this.props.onTimeChange(time);
  };

  secondsToMinutes (totalSeconds) {
    const totSeconds = parseFloat(totalSeconds);
    var minutes = Math.floor(totSeconds / 60);
    var seconds = Math.round(totSeconds - (minutes * 60));

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    var time = minutes + ':' + seconds;

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