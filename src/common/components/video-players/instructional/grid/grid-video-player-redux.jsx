import React from 'react';
import { findDOMNode } from 'react-dom';
import GridVideoPlayer from './grid-video-player.jsx'
import * as actionCreators from '../instructional-video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from 'common/store.js';
import _ from 'lodash';
import ConnectTransitionWrapper from 'common/components/ConnectTransitionWrapper';

@ConnectTransitionWrapper()
@connect(state => ({ videos: state.instructionalVideos}), null, null, { withRef: true })
class GridVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
  }

  componentWillMount () {
    const slug = this.props.slug || this.props.params.slug;

    this.boundActionCreators.setVideo(slug, { useFullControls: false, isPlaying: true });
  }

  render () {
    const { videos, className } = this.props;

    return <GridVideoPlayer
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
      prevVideo={videos.prevVideo}
      nextVideo={videos.nextVideo}
      {...videos.currentVideo}
      {...this.props}
    />
  }
}

export default GridVideoPlayerRedux;
