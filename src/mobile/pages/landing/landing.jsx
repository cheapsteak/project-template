import React from 'react';
import {Link} from 'react-router';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import Button from 'common/components/rectangular-button/rectangular-button';
import MobileMenu from '../../components/mobile-menu/mobile-menu';
import VideoPlayer from '../../components/video-player/video-player';
import * as actionCreators from '../../components/mobile-header/mobile-header-actions';
import narrativeVideoData from '../../data/narrative-video.js';
import store from 'common/store';
import pageTransitions from '../page-transitions.jsx';
import detect from 'common/utils/detect';

@pageTransitions
export default class Landing extends React.Component {

  state = {
    videoStatus: 'paused'
  };

  componentWillMount() {
    this.setHeader();
  }

  setHeader = () => {
    store.dispatch(actionCreators.setHeaderSettings({
      type: 'landing',
      color: 'white',
      title: 'SA',
      backButton: false,
      bottomBorder: false,
      backgroundColor: 'transparent'
    }));
  };

  playVideo = () => {
    this.refs.video.currentTime = 0;

    if(detect.md.is('iPhone')) {
      this.refs.video.play();
    } else {
      this.requestFullscreen(this.refs.video);
      this.refs.video.style.opacity = 1;
      this.refs.video.play();
    }
  };

  playVideo = () => {
    this.setState({ videoStatus: 'play' });
  };

  pauseVideo = () => {
    this.setState({ videoStatus: 'pause' });
  };

  render () {
    return (
      <div className="mobile-landing">
        <div className="cover-bg"></div>
        <div className="main-content">
          <h3>Welcome to our</h3>
          <h1>Middle</h1>
          <h1>School Tour</h1>
          <p>Take an inside look at our culture and curriculum through the eyes of our scholars.</p>
          <div href={narrativeVideoData.src} target="__blank">
            <VideoPlayer
              status={this.state.videoStatus}
              src={narrativeVideoData.src}
              onExitFullscreen={this.pauseVideo}
            />
            <Button
              text="Start the Tour"
              color="#ffffff"
              backgroundColor="#EB9729"
              hoverBackgroundColor="#EB9729"
              svgIcon={IconWatch}
              onClick={this.playVideo}
            />
          </div>
          <Link to="/mobile/chapters">
            <Button
              className="cta-explore"
              style={{border: "1px solid rgba(255,255,255,0.2)"}}
              text="Chapter Menu"
              color="#ffffff"
              svgIcon={IconExplore}
            />
          </Link>
        </div>
      </div>
    )
  }
}
