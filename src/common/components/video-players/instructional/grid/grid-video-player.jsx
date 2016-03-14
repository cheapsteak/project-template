import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from '../../../../../assets/video-play-button.svg';
import BackButtonSvg from '../../../../../assets/video-back-button.svg';
import ForwardButtonSvg from '../../../../../assets/video-forward-button.svg';
import { Link } from 'react-router';
import animate from 'gsap-promise';

export default class GridVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  componentDidMount() {
    const { learnMore, videoReplay, replayButton } = this.refs;
    const offsetX = 20;
    const offsetY = 60;

    animate.set(learnMore, { 
      x: window.innerWidth/2 - learnMore.offsetWidth - offsetX,
      y: window.innerHeight/2 - learnMore.offsetHeight/2 - offsetY
    });

    animate.set(videoReplay, {
      x: window.innerWidth/2 + offsetX,
      y: window.innerHeight/2 - videoReplay.offsetHeight/2 - offsetY
    });

    animate.set(replayButton, {
      x: window.innerWidth/2 - replayButton.offsetWidth/2,
      y: window.innerHeight/1.25 - replayButton.offsetHeight/2
    });
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  handleMetadataLoaded = () => {
    this.video.currentTime = this.props.currentTime;
    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);
  };

  handleTimeUpdate = () => {
    this.props.onVideoTimeChange(this.video.currentTime);
  };

  handleVideoPlayPause = () => {
    if(this.props.isPlaying) {
      this.video.pause();
      this.props.onVideoPause();
    } else {
      this.video.play();
      this.props.onVideoPlay();
    }
  };

  handlePrevClick = (e) => {

  };

  handleNextClick = (e) => {

  };

  handleEnded = (e) => {
    this.handleVideoPlayPause();
    this.animateInEndOverlay();
  };

  animateInEndOverlay = () => {
  };

  render() {
    const { style, modelSlug } = this.props;
    const tempPauseStyle = this.props.isPlaying ? {fill: 'black'} : undefined;
    
    // console.log('PROPS:', this.props);
        
    return (
      <div className="instructional-video-player grid-player" style={style}>
        <video
          id={this.videoId}
          preload="metadata"
          ref={(node) => this.video = node }
          src={this.props.src}
          onLoadedMetadata={this.handleMetadataLoaded}
          onEnded={this.handleEnded}
          onTimeUpdate={this.handleTimeUpdate}
        >
        </video>
        <div className="controls" ref="controls">
          <div className="control-group">
            <span
              className="button"
              style={tempPauseStyle}
              dangerouslySetInnerHTML={{__html: PlayButtonSvg}}
              onClick={this.handleVideoPlayPause}
            >
            </span>
            <span
              className="button"
              dangerouslySetInnerHTML={{__html: BackButtonSvg}}
              onClick={this.handlePrevClick}
            >
            </span>
            <span
              className="button"
              dangerouslySetInnerHTML={{__html: ForwardButtonSvg}}
              onClick={this.handleNextClick}
            >
            </span>
          </div>
          <Timeline
            currentTime={this.props.currentTime || 0}
            duration={this.props.duration || 0}
            onTimeChange={this.changeVideoTime}
            items={[]}
          />
        </div>
        <div className="end-overlay">
          <div ref="learnMore" className="learn-more-cta">
            <h3>Science</h3>
          </div>
          <div ref="videoReplay" className="next-video-cta">
            <h2>Parental Investment</h2>
          </div>
          <div ref="replayButton" className="replay-button"></div>
        </div>
      </div>
    )
  }
}
