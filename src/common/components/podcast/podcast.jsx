import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import PlayButton from '../play-button/play-button';

export default class GridManager extends React.Component {

  static propTypes = {
    src: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  };

  state = {
    duration: 0,
    progress: 0
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.mediaEl = this.refs.mediaEl;

    this.mediaEl.addEventListener('loadedmetadata', () => {
      const duration = this.mediaEl.duration;
      this.setState({duration});
    });

    this.mediaEl.addEventListener('timeupdate', () => {
      const currTime = this.mediaEl.currentTime;
      const progress = currTime / this.state.duration;
      this.setState({progress});
    });
  }

  componentWillUnmount() {
  }

  play = () => {
    this.mediaEl.play();
  };

  pause = () => {
    this.mediaEl.pause();
  };

  render() {

    return (
      <div className={`podcast ${this.props.className || ''}`}>

        <video ref="mediaEl" preload={true}>
          <source src={this.props.src}/>
        </video>

        <PlayButton
          progress={this.state.progress}
          onPlay={this.play}
          onPause={this.pause}
        />

        <div className={`text-container`}>
          <h2>Podcast</h2>
          <p>
            The field studies program is a vital part of Success Academy’s school design because it connects classroom
            curriculum to real world experiences, infuses additional. Joy into the school day.
          </p>
        </div>
      </div>
    );
  }
}
