import React from 'react';
import {findDOMNode} from 'react-dom';
import ProgressBar from 'progressbar.js';
import IconPlay from 'svgs/icon-play.svg';
import IconPause from 'svgs/icon-pause.svg';

export default class PlayButton extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    progress: React.PropTypes.number,
    circleColor: React.PropTypes.string,
    label: React.PropTypes.string,
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onEnd: React.PropTypes.func,
    isCountDown: React.PropTypes.bool
  };

  static defaultProps = {
    circleColor: '#6d7880',
    onPlay: () => console.log('PlayButton.onPlay()'),
    onPause: () => console.log('PlayButton.onPause()'),
    onUpdate: (progress) => console.log('PlayButton.onUpdate() progress:', progress),
    onEnd: () => console.log('PlayButton.onEnd')
  };

  state = {
    isPlaying: false,
    playProgress: undefined,
    isHovered: false
  };

  componentWillReceiveProps(newProps) {
    if (newProps.progress !== this.state.playProgress) {

      if (newProps.progress) {
        this.setState({playProgress: newProps.progress});
        this.props.onUpdate(newProps.progress);
      }


      if (this.state.isHovered && this.props.isCountDown) {

      } else {
        this.colorCircle.animate(newProps.progress, () => {
          (newProps.progress === 1) && this.handleProgressEnd()
        });
      }
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.colorCircle = new ProgressBar.Circle(this.refs.iconContainer, {
      color: this.props.circleColor,
      strokeWidth: 6,
      duration: 500
    });

    this.whiteCircle = new ProgressBar.Circle(this.refs.iconContainer, {
      color: '#fff',
      strokeWidth: 8
    });
  }

  componentWillUnmount() {
    this.colorCircle.destroy();
    this.whiteCircle.destroy();
  }

  resetProgress = () => {
    this.setState({playProgress: undefined});
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
    if (this.props.isCountDown) return;

    this.setState({isHovered: false});

    if (!this.state.playProgress) {
      this.setState({playProgress: 0});
      this.drawWhiteCircle(this.togglePlay);
    } else {
      this.togglePlay();
    }
  };

  handleMouseEnter = () => {
    if (this.props.isCountDown || this.state.playProgress === undefined) {
      this.setState({isHovered: true});
      this.colorCircle.animate(1, {
        duration: 300 * (1 - this.state.playProgress),
        easing: 'easeOut'
      });
    }
  };

  handleMouseLeave = () => {
    const easing = 'easeInOut';
    const progress = this.state.playProgress;

    if (this.props.isCountDown) {
      this.setState({isHovered: false});
      
      // animate circle back to progress
      this.colorCircle.animate(progress, {
        duration: 400 * (1 - progress),
        easing: easing
      });
    } else if (progress === undefined) {
      // animate circle back to 0
      this.colorCircle.animate(0, {duration: 300, easing: easing}, () => {
        this.setState({isHovered: false});
      });
    }
  };

  handleProgressEnd = () => {
    this.setState({isPlaying: false});
    this.drawWhiteCircle(() => {
      this.props.onEnd();
      this.resetProgress();
    });
  };

  render() {
    const icon = this.state.isPlaying ? IconPause : IconPlay;
    const isRoundLineCap = this.state.isHovered || this.state.playProgress;
    const componentClassName = (isRoundLineCap ? 'round-line-cap ' : ' ' ) + (this.props.className || '');

    return (
      <div className={`progress-play-button ${componentClassName}`}>
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
