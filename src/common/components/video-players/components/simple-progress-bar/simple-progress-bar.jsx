import React from 'react';
import {findDOMNode} from 'react-dom';
import _ from 'lodash';
import animate from 'gsap-promise';

export default class SimpleProgressBar extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    currentTime: React.PropTypes.number,
    duration: React.PropTypes.number
  };

  componentDidMount() {
    animate.set(this.refs.progressBar, { y: 100 });
  }

  componentWillAppear(callback) {
    animate.set(this.refs.progressBar, { y: 0 });
    callback()
  }

  componentWillEnter(callback) {
    animate.to(this.refs.progressBar, 0.7, { y: 0, ease: ViniEaseOut })
      .then(callback);
  }

  componentWillLeave(callback) {
    animate.to(this.refs.progressBar, 1, { y: 100, ease: ViniEaseOut })
      .then(callback);
  }

  render () {
    const progressWidth = (this.props.currentTime / this.props.duration * 100 : 0) + '%';

    return (
      <div
        ref="progressBar"
        className="simple-progress-bar"
      >
        <span style={{ width: progressWidth }}></span>
      </div>
    )
  }
}
