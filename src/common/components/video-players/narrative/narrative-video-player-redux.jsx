import React from 'react';
import { findDOMNode } from 'react-dom';
import NarrativeVideoPlayer from './narrative-video-player.jsx'
import * as actionCreators from './narrative-video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from 'common/store.js';
import { getCurrentChapter } from 'common/store.js';
import chaptersModel from 'common/models/chapters-model';
import _ from 'lodash';

const allChapters = chaptersModel.getAll();
console.log('asdfsadfsdaf');

@connect(state => ({ video: state.narrativeVideo}) )
class NarrativeVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
  }

  componentWillMount () {
    const startTime = this.props.startTime || 0;
    this.boundActionCreators.hideFullControls();
    this.boundActionCreators.setVideoTime(startTime);
  }

  render () {
    const video = this.props.video;

    return <NarrativeVideoPlayer
      onVideoTimeChange={this.boundActionCreators.setVideoTime}
      onVideoPlay={this.boundActionCreators.playVideo}
      onVideoPause={this.boundActionCreators.pauseVideo}
      showFullControls={this.boundActionCreators.showFullControls}
      hideFullControls={this.boundActionCreators.hideFullControls}
      setCircleCTA={this.boundActionCreators.setCircleCTA}
      onVideoMetadataLoaded={this.boundActionCreators.setVideoDuration}
      mute={this.boundActionCreators.setVideoOptions.bind(null, { isMuted: true })}
      unmute={this.boundActionCreators.setVideoOptions.bind(null, { isMuted: false })}
      currentChapter={getCurrentChapter()}
      chapters={allChapters}
      {...this.props}
      {...video}
    />
  }
}

export default NarrativeVideoPlayerRedux
