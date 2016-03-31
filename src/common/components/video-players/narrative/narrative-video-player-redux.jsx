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

@connect(state => ({ video: state.narrativeVideo}) )
class NarrativeVideoPlayerRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
  }

  componentWillMount () {
    const hash = window.location.hash.replace(/^#/, '');
    const chapterSlugs = _.map(allChapters, 'slug');

    if (_.includes(chapterSlugs, hash)) {
      const chapter = chaptersModel.get(hash);
      localStorage.setItem(NarrativeVideoPlayer.timeStorageId, chapter.time);
      history.replaceState("", document.title, window.location.pathname);
    }

    this.boundActionCreators.hideFullControls();
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
