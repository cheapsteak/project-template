import React from 'react';
import { findDOMNode } from 'react-dom';
import NarrativeVideoPlayer from './narrative-video-player.jsx'
import * as actionCreators from './narrative-video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store.js';
import _ from 'lodash';

@connect(state => ({ video: state.narrativeVideo}) )
class NarrativeVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
  }

  render () {
    const video = this.props.video;

    return <NarrativeVideoPlayer
      onVideoTimeChange={this.boundActionCreators.setVideoTime}
      onVideoPlay={this.boundActionCreators.playVideo}
      onVideoPause={this.boundActionCreators.pauseVideo}
      showFullControls={this.boundActionCreators.showFullControls}
      hideFullControls={this.boundActionCreators.hideFullControls}
      {...this.props}
      {...video}
    />
  }
}

export default NarrativeVideoPlayerRedux