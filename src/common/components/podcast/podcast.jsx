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
    this.circles = [].slice.call(this.circles);

    this.timelines = [];

    const containerSize = this.refs.playContainer.offsetWidth;
    this.circles.forEach((circle, i) => {
      const size = containerSize / (40 - i) * (i + 1);

      const timeline = new TimelineMax({repeat: -1});
      timeline.add(
        TweenLite.fromTo(circle, 18,
          {width: '0%', height: '0%'},
          {
            width: '100%',
            height: '100%',
            autoAlpha: 0,
            ease: Quint.easeIn,
            //delay: (i - 1) / 10
          })
      );

      timeline.pause();
      const progress = size * 5 / window.innerWidth * 0.5;
      timeline.progress(progress);

      this.timelines.push(timeline);
    });

    //this.resize();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  resize = () => {
    this.handleWindowResize();
  };

  handleLoadedMetadata = () => {
    const duration = this.mediaEl.duration;
    this.setState({duration});
  };

  handleTimeUpdate = () => {
    const currTime = this.mediaEl.currentTime;
    const progress = currTime / this.state.duration;
    this.setState({progress});
  };

  play = () => {
    this.mediaEl.play();
    this.timelines.forEach(t => t.play());
  };

  pause = () => {
    this.mediaEl.pause();
    this.timelines.forEach(t => t.pause())
  };

  handleWindowResize = () => {
    return
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

        <video
          ref="mediaEl"
          preload={true}
          src={this.props.src}
          onLoadedMetadata={this.handleLoadedMetadata}
          onTimeUpdate={this.handleTimeUpdate}
        ></video>

        <div ref="playContainer" className={`play-container`}>
          <div ref="circlesContainer" className={`circles-container`}>
            {
              _.range(15).map(index => {
                return <div key={index} className={`circle index-${index}`}></div>
              })
            }
          </div>

          <PlayButton
            shouldHideHalo={true}
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
