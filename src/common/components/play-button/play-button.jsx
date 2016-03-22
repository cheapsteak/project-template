import React from 'react';
import {findDOMNode} from 'react-dom';
import ProgressBar from 'progressbar.js';
import IconPlay from 'svgs/icon-play.svg';
import IconPause from 'svgs/icon-pause.svg';

export default class PlayButton extends React.Component {

  static propTypes = {
    progress: React.PropTypes.number,
    circleColor: React.PropTypes.string,
    label: React.PropTypes.string,
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onEnd: React.PropTypes.func
  };

  static defaultProps = {
    circleColor: '#6d7880',
    onPlay: () => console.log('PlayButton.onPlay()'),
    onPause: () => console.log('PlayButton.onPause()'),
    onUpdate: (progress) => console.log('PlayButton.onUpdate() progress:', progress),
    onEnd: () => console.log('PlayButton.onEnd')
  };

  state = {
    isPlaying: false
  };

  componentWillReceiveProps(newProps) {
    if (newProps.progress !== this.progress) {

      if (newProps.progress) {
        this.progress = newProps.progress;
        this.props.onUpdate(newProps.progress);
      }

      this.colorCircle.animate(newProps.progress, () => {
        (newProps.progress === 1) && this.handleProgressEnd()
      });
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.colorCircle = new ProgressBar.Circle(this.refs.iconContainer, {
      color: this.props.circleColor,
      strokeWidth: 6,
      strokeLinecap: 'round',
      duration: 500
    });

    this.whiteCircle = new ProgressBar.Circle(this.refs.iconContainer, {
      color: '#fff',
      strokeWidth: 8,
      duration: 500
    });
  }

  componentWillUnmount() {
    this.colorCircle.destroy();
    this.whiteCrcle.destroy();
  }

  resetProgress = () => {
    this.progress = undefined;
  };

  drawWhiteCircle = (callback) => {
    this.whiteCircle.animate(1, {duration: 600, easing: 'easeOut'}, () => {
      this.colorCircle.set(0);
      this.whiteCircle.set(0);
      callback && callback();
    });
  };

  togglePlay = () => {
    const isPlaying = !this.state.isPlaying;
    this.setState({isPlaying});
    (isPlaying) ? this.props.onPlay() : this.props.onPause();
  };

  handleOnclick = () => {
    if (!this.progress) {
      // did not start progress yet (initial play click)
      this.progress = 0;
      this.drawWhiteCircle(this.togglePlay);
    } else {
      // toggle play/pause
      this.togglePlay();
    }
  };

  handleMouseEnter = () => {
    if (this.progress === undefined) {
      this.colorCircle.animate(1, {duration: 400, easing: 'easeOut'});
    }
  };

  handleMouseLeave = () => {
    if (this.progress === undefined) {
      this.colorCircle.animate(0, {duration: 400, easing: 'easeOut'});
    }
  };

  handleProgressEnd = () => {
    this.setState({isPlaying: false});
    this.drawWhiteCircle(() => {
      this.resetProgress();
      this.props.onEnd();
    });
  };

  render() {
    const icon = this.state.isPlaying ? IconPause : IconPlay;

    return (
      <div className={`play-progress-button`}>
        <div
          ref="iconContainer"
          className={`icon-container`}
          onClick={this.handleOnclick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div
            className={`icon ${!this.state.isPlaying?'play' : ''}`}
            dangerouslySetInnerHTML={{ __html: icon }}></div>
        </div>

        {
          this.props.label && <div className={`label`}>{this.props.label}</div>
        }
      </div>
    );
  }
}
