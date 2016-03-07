import React from 'react';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from '../../../assets/video-play-button.svg';
import FullBrowserButtonSvg from '../../../assets/photo-essay-fullscreen-button.svg';
import { Link } from 'react-router';

export default class InstructionalVideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      isPlaying: false,
      isVideoLoaded: false
    };
  }

  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  pauseVideo = () => {
    this.video.pause();
  };

  handleMetadataLoaded = () => {
    this.setState({isVideoLoaded: true});
    this.video.currentTime = this.props.startTime;
  };

  handleTimeUpdate = (e) => {
    this.setState({time: e.target.currentTime});
  };

  handleVideoPlayPause = () => {
    this.state.isPlaying
      ? this.video.pause()
      : this.video.play();

    this.setState({isPlaying: !this.state.isPlaying})
  };

  handlePrevClick = (e) => {

  };

  handleNextClick = (e) => {

  };

  handleFullBrowserClick = (e) => {
    this.props.onFullBrowserClick && this.props.onFullBrowserClick(this.state.time);
  };

  render() {
    const { style, modelSlug, basePath } = this.props;
    const tempPauseStyle = this.state.isPlaying ? {fill: 'black'} : undefined;

    let route = `${basePath}`;

    if(!this.props.isFullBrowser) {
      route = route + `/instructional-videos/${modelSlug}`;
    }

    return <div className="instructional-video-player" style={style}>
      <video
        ref={(node) => this.video = node }
        src={this.props.src}
        preload="metadata"
        onLoadedMetadata={this.handleMetadataLoaded}
        onEnded={this.handleVideoPlayPause}
        onTimeUpdate={this.handleTimeUpdate}
      >
      </video>
      <div className="controls">
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
        <Timeline
          currentTime={this.state.time}
          duration={ this.state.isVideoLoaded ? this.video.duration : 0 }
          onTimeChange={this.changeVideoTime}
          items={[]}
        />
      </div>
    </div>
  }
}
