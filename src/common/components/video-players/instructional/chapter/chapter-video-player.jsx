import React from 'react';
import { findDOMNode } from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from '../../../../../assets/video-play-button.svg';
import FullBrowserButtonSvg from '../../../../../assets/photo-essay-fullscreen-button.svg';
import { Link } from 'react-router';

export default class ChapterVideoPlayer extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    className: React.PropTypes.string,
    poster: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  videoId = 'target-video';
  cloneId = 'clone-video';

  componentWillEnterFullBrowser = () => {
    const container = findDOMNode(this);
    const video = document.querySelector(`#${this.videoId}`);
    const videoParent = video.parentNode;
    const clone = video.cloneNode();
    const isPlaying = !video.paused;

    clone['data-reactid'] = new Date().getTime();
    clone.id = this.cloneId;

    videoParent.removeChild(video)
    videoParent.insertBefore(clone, videoParent.firstChild);
    container.insertBefore(video, container.firstChild);

    this.video = video;

    isPlaying && video.play();

    return Promise.resolve();
  };

  componentWillLeaveFullBrowser = () => { 
    const container = findDOMNode(this);
    const clone = document.querySelector('#clone-video');
    const cloneParent = clone.parentNode;
    const video = document.querySelector(`#${this.videoId}`);
    const isPlaying = !video.paused;

    cloneParent.removeChild(clone)
    cloneParent.insertBefore(video, cloneParent.firstChild);

    isPlaying && video.play();

    return Promise.resolve();
  };

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

  render() {
    const { style, modelSlug, basePath, isFullBrowser, fullBrowserRoute, fullBrowserExitRoute } = this.props;
    const tempPauseStyle = this.props.isPlaying ? {fill: 'black'} : undefined;
    let route = isFullBrowser 
      ? fullBrowserRoute 
      : fullBrowserExitRoute 
        ? fullBrowserExitRoute
        : '/';

    return <div className={`instructional-video-player chapter-player ${this.props.className}`} style={style}>
      {
        !isFullBrowser ? 
          <video
            id={this.videoId}
            preload="metadata"
            ref={(node) => this.video = node }
            src={this.props.src}
            onLoadedMetadata={this.handleMetadataLoaded}
            onEnded={this.handleVideoPlayPause}
            onTimeUpdate={this.handleTimeUpdate}
            poster={this.props.poster}
          >
          </video>
          : undefined
      }
      <div className="controls" ref="controls">
        <div className="control-group">
          <span
            className="button"
            style={tempPauseStyle}
            dangerouslySetInnerHTML={{__html: PlayButtonSvg}}
            onClick={this.handleVideoPlayPause}
          >
          </span>
          <Link className="button fullbrowser-button" to={route}>
            <span
              dangerouslySetInnerHTML={{__html: FullBrowserButtonSvg}}
            >
            </span>
          </Link>
        </div>
        {
          /* 
            The duration is put into the store and pass down to the component
            to account for the work around with moving around the video node 
          */
        }
        <Timeline
          currentTime={this.props.currentTime || 0}
          duration={this.props.duration || 0}
          onTimeChange={this.changeVideoTime}
          items={[]}
        />
      </div>
    </div>
  }
}
