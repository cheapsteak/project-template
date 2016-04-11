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
import landingData from 'common/data/landing.js';

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
          <h3>{landingData.subtitle}</h3>
          <h1>{landingData.title}</h1>
          <p>{landingData.description}</p>
          <Link to="/mobile/chapters">
            <Button
              className="cta-explore"
              style={{border: "1px solid rgba(255,255,255,0.2)"}}
              text="Main Menu"
              color="#ffffff"
              svgIcon={IconExplore}
            />
          </Link>
          <Link to="/mobile/videos">
            <Button
              text="See Classes In Action"
              color="#ffffff"
              backgroundColor="#EB9729"
              hoverBackgroundColor="#EB9729"
              svgIcon={IconWatch}
            />
          </Link>
        </div>
      </div>
    )
  }
}
