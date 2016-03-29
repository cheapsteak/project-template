import React from 'react';
import { findDOMNode } from 'react-dom';
import ChapterVideoPlayer from './chapter-video-player.jsx'
import * as actionCreators from '../instructional-video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from 'common/store.js';
import _ from 'lodash';

@connect(state => ({ videos: state.instructionalVideos}), null, null, { withRef: true })
class ChapterVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);

    if(!props.videos.currentVideo || props.videos.currentVideo.slug !== props.slug) {
      this.boundActionCreators.setVideo(props.slug);
    }
  }

  render () {
    const { videos, className } = this.props;
    
    return <ChapterVideoPlayer
      ref="wrappedInstance"
      className={className}
      onVideoTimeChange={this.boundActionCreators.setVideoTime}
      onVideoPlay={this.boundActionCreators.playVideo}
      onVideoPause={this.boundActionCreators.pauseVideo}
      onVideoMetadataLoaded={this.boundActionCreators.setVideoDuration}
      showFullControls={this.boundActionCreators.setVideoOptions.bind(null, { useFullControls: true })}
      hideFullControls={this.boundActionCreators.setVideoOptions.bind(null, { useFullControls: false })}
      mute={this.boundActionCreators.setVideoOptions.bind(null, { isMuted: true })}
      unmute={this.boundActionCreators.setVideoOptions.bind(null, { isMuted: false })}
      {...this.props}
      {...videos.currentVideo}
    />
  }
}

export default ChapterVideoPlayerRedux;