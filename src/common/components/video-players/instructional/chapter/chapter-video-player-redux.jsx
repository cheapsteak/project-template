import React from 'react';
import { findDOMNode } from 'react-dom';
import ChapterVideoPlayer from './chapter-video-player.jsx'
import * as actionCreators from '../instructional-video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../../../store.js';
import _ from 'lodash';

@connect(state => ({ videos: state.instructionalVideos}), null, null, { withRef: true })
class ChapterVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);

    if(!props.videos[props.modelSlug]) {
      this.boundActionCreators.setVideo(props.modelSlug);
    }
  }

  render () {
    const { videos, modelSlug } = this.props;
    
    return <ChapterVideoPlayer
      ref="wrappedInstance"
      onVideoTimeChange={_.partial(this.boundActionCreators.setVideoTime, modelSlug)}
      onVideoPlay={_.partial(this.boundActionCreators.playVideo, modelSlug)}
      onVideoPause={_.partial(this.boundActionCreators.pauseVideo, modelSlug)}
      onVideoMetadataLoaded={_.partial(this.boundActionCreators.setVideoDuration, modelSlug)}
      {...this.props}
      {...videos[this.props.modelSlug]}
    />
  }
}

export default ChapterVideoPlayerRedux;