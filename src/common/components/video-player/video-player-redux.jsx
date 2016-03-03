import React from 'react';
import { findDOMNode } from 'react-dom';
import VideoPlayer from './video-player.jsx'
import * as actionCreators from './video-player-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store.js';

@connect(state => ({ videos: state.videos}) )
class VideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);

    if(!props.videos[props.model]) {
      this.boundActionCreators.setVideo(props.model);
    }
  }

  render () {
    const videos = this.props.videos;
    if(!videos[this.props.model]) return <div/>
    
    console.log(this.props);
        
    return <VideoPlayer
      {...this.props}
      {...videos[this.props.model]}
    />
  }
}

export default VideoPlayerRedux