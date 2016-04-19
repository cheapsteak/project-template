import React from 'react';
import { findDOMNode } from 'react-dom';
import ChapterVideoPlayer from './chapter-video-player.jsx'
import * as actionCreators from './chapter-video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from 'common/store.js';
import _ from 'lodash';

@connect(state => ({ videos: state.chapterVideos}), null, null, { withRef: true })
class ChapterVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
  }

  componentWillMount() {
    if(this.props.slug && !this.props.isFullBrowser) {
      this.boundActionCreators.setVideo(this.props.slug);
    }
  }

  render () {
    const { videos, className } = this.props;
    
    return <ChapterVideoPlayer
      ref="wrappedInstance"
      className={className}
      onVideoTimeChange={this.boundActionCreators.setVideoTime.bind(null, this.props.slug)}
      onVideoPlay={this.boundActionCreators.playVideo.bind(null, this.props.slug)}
      onVideoPause={this.boundActionCreators.pauseVideo.bind(null, this.props.slug)}
      onVideoMetadataLoaded={this.boundActionCreators.setVideoDuration.bind(null, this.props.slug)}
      showFullControls={this.boundActionCreators.setVideoOptions.bind(null, this.props.slug, { useFullControls: true })}
      hideFullControls={this.boundActionCreators.setVideoOptions.bind(null, this.props.slug, { useFullControls: false })}
      toggleFullBrowser={this.boundActionCreators.toggleFullBrowser.bind(null, this.props.slug)}
      mute={this.boundActionCreators.setVideoOptions.bind(null, this.props.slug, { isMuted: true })}
      unmute={this.boundActionCreators.setVideoOptions.bind(null, this.props.slug, { isMuted: false })}
      {...this.props}
      {...videos[this.props.slug]}
    />
  }
}

export default ChapterVideoPlayerRedux;