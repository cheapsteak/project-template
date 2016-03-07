import React from 'react';
import { findDOMNode } from 'react-dom';
import InstructionalVideoPlayer from './instructional-video-player.jsx'
import * as actionCreators from './instructional-video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store.js';

@connect(state => ({ videos: state.instructionalVideos}) )
class InstructionalVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);

    if(!props.videos[props.modelSlug]) {
      this.boundActionCreators.setVideo(props.modelSlug);
    }
  }

  render () {
    const videos = this.props.videos;

    return <InstructionalVideoPlayer
      {...this.props}
      {...videos[this.props.modelSlug]}
    />
  }
}

export default InstructionalVideoPlayerRedux