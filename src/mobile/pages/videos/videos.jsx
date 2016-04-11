import React from 'react';
import { findDOMNode } from 'react-dom';
import PlayIconSvg from 'svgs/mobile-play-icon.svg';
import ClockIconSvg from 'svgs/clock-icon.svg';
import animate from 'gsap-promise';
import * as headerActionCreators from '../../components/mobile-header/mobile-header-actions';
import store from 'common/store';
import model from '../../model/instructional-videos-model.js';
import config from '../../../../config.js';
import pageTransitions from '../page-transitions.jsx';
import VideoPlayer from '../../components/video-player/video-player';

@pageTransitions
export default class MobileVideos extends React.Component {

  state = {
    videoStatuses: []
  };

  data = model.getAll();

  componentDidMount() {
    store.dispatch(headerActionCreators.setHeaderSettings({
      type: 'videos',
      color: '#565D60',
      backButton: false,
      bottomBorder: false,
      title: 'SA'
    }));

    this.setState({
      videoStatuses: this.data.map(() => 'paused')
    })
  }

  playVideo = (i) => {
    this.setState({ videoStatuses: [ 
      ...this.state.videoStatuses.slice(0, i),
      'play',
      ...this.state.videoStatuses.slice(i+1, this.state.videoStatuses.length)
    ]});
  };

  pauseVideo = (i) => {
    this.setState({ videoStatuses: [ 
      ...this.state.videoStatuses.slice(0, i),
      'paused',
      ...this.state.videoStatuses.slice(i+1, this.state.videoStatuses.length)
    ]});
  };

  render () {
    return (
      <div ref="container" className="mobile-videos">
        <div ref="contentWrapper" className="content-wrapper">
          <div className="header">
            <h1>See Classes in Action</h1>
          </div>
          {
            this.data.filter(video => video.slug !== 'welcome').map((video, i) => {
              return (
                <div key={i} className="video-item" onClick={this.playVideo.bind(null, i)}>
                  <VideoPlayer src={video.src} status={this.state.videoStatuses[i]} onExitFullscreen={this.pauseVideo.bind(null, i)} />
                  <h1 dangerouslySetInnerHTML={{ __html: video.title }}></h1>
                  <img className="video-image" src={video.backgroundImage} />
                  <div className="panel-label">
                    <div className="play-svg" dangerouslySetInnerHTML={{ __html: PlayIconSvg }}></div>
                    <label>Play Video</label>
                    <div className="duration-group">
                      <div className="clock-svg" dangerouslySetInnerHTML={{ __html: ClockIconSvg }}></div>
                      <label>{video.duration}</label>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="top-overlay"></div>
      </div>
    )
  }
}
