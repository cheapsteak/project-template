import React from 'react';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from '../../../assets/video-play-button.svg';
import BackButtonSvg from '../../../assets/video-back-button.svg';
import ForwardButtonSvg from '../../../assets/video-forward-button.svg';

export default class NarrativeVideoPlayer extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    this.video.currentTime = nextProps.currentTime;
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  pauseVideo = () => {
    this.video.pause();
  };

  handleMetadataLoaded = () => {
    this.setState({isVideoLoaded: true});
    this.video.currentTime = this.props.currentTime;
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
    const { style } = this.props;
    const tempPauseStyle = this.state.isPlaying ? {fill: 'black'} : undefined;

    return <div className="narrative-video-player" style={style}>
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
          currentTime={this.state.time}
          duration={ this.state.isVideoLoaded ? this.video.duration : 0 }
          onTimeChange={this.changeVideoTime}
          items={this.props.timeline}
        />
      </div>
    </div>
  }
}
