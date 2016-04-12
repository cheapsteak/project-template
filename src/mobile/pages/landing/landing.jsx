import React from 'react';
import {Link} from 'react-router';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import Button from 'common/components/rectangular-button/rectangular-button';
import MobileMenu from '../../components/mobile-menu/mobile-menu';
import * as actionCreators from '../../components/mobile-header/mobile-header-actions';
import store from 'common/store';
import pageTransitions from '../page-transitions.jsx';
import detect from 'common/utils/detect';
import landingData from 'common/data/landing.js';

@pageTransitions
export default class Landing extends React.Component {

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

  render () {
    return (
      <div className="mobile-landing">
        <div className="cover-bg"></div>
        <div className="main-content">
          <h3>{landingData.subtitle}</h3>
          <h1>{landingData.title}</h1>
          <p>{landingData.description}</p>
          <Link to="/chapters">
            <Button
              className="cta-explore"
              style={{border: "1px solid rgba(255,255,255,0.2)"}}
              text="Main Menu"
              color="#ffffff"
              svgIcon={IconExplore}
            />
          </Link>
          <Link to="/videos">
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
