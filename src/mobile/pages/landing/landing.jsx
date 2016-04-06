import React from 'react';
import {Link} from 'react-router';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import Button from 'common/components/rectangular-button/rectangular-button';
import MobileMenu from 'common/components/mobile-menu/mobile-menu';
import * as actionCreators from 'common/components/mobile-header/mobile-header-actions';
import narrativeVideoData from '../../data/narrative-video.js';
import store from 'common/store';

export default class Landing extends React.Component {

  componentWillMount() {
    store.dispatch(actionCreators.setHeaderSettings({
      color: 'white',
      backgroundColor: 'transparent'
    }));
  }

  render () {
    return (
      <div className="mobile-landing">
        <div className="cover-bg"></div>
        <div className="main-content">
          <h3>Welcome to our</h3>
          <h1>Middle</h1>
          <h1>School Tour</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore.
          </p>
          <a href={narrativeVideoData.src} target="__blank">
            <Button
              text="Start the Tour"
              color="#ffffff"
              backgroundColor="#EB9729"
              hoverBackgroundColor="#EB9729"
              svgIcon={IconWatch}
            />
          </a>
          <Link to="/mobile/chapters">
            <Button
              className="cta-explore"
              style={{border: "1px solid rgba(255,255,255,0.2)"}}
              text="Explore"
              color="#ffffff"
              svgIcon={IconExplore}
            />
          </Link>
        </div>
      </div>
    )
  }
}
