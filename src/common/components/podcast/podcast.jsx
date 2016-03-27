import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import PlayButton from '../play-button/play-button';
import _ from 'lodash';

export default class Podcast extends React.Component {

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
    this.circles = findDOMNode(this.refs.circlesContainer).children;

    this.mediaEl.addEventListener('loadedmetadata', () => {
      const duration = this.mediaEl.duration;
      this.setState({duration});
    });

    this.mediaEl.addEventListener('timeupdate', () => {
      const currTime = this.mediaEl.currentTime;
      const progress = currTime / this.state.duration;
      this.setState({progress});
    });

    this.resize();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  resize = () => {
    this.handleWindowResize();
  };

  play = () => {
    this.mediaEl.play();
  };

  pause = () => {
    this.mediaEl.pause();
  };

  handleWindowResize = () => {
    const containerSize = this.refs.playContainer.offsetWidth;

    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      const size = containerSize / (20 - i) * (i + 1);
      animate.set(circle, {width: size, height: size});
    }
  };

  render() {

    return (
      <div className={`podcast ${this.props.className || ''}`}>

        <video ref="mediaEl" preload={true} src={this.props.src}></video>

        <div ref="playContainer" className={`play-container`}>
          <div ref="circlesContainer" className={`circles-container`}>
            {
              _.range(10).map(index => {
                return <div key={index} className={`circle index-${index}`}></div>
              })
            }
          </div>

          <PlayButton
            progress={this.state.progress}
            onPlay={this.play}
            onPause={this.pause}
          />
        </div>

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
