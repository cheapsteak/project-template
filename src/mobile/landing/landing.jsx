import React from 'react';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import Button from 'common/components/rectangular-button/rectangular-button';
import MobileMenu from 'common/components/mobile-menu/mobile-menu';

export default class Landing extends React.Component {
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
          <Button
            style={{}}
            text="Start the Tour"
            color="#ffffff"
            backgroundColor="#8F8F8F"
            svgIcon={IconWatch}
          />
          <Button
            style={{border: "1px solid rgba(255,255,255,0.2)"}}
            text="Explore"
            color="#ffffff"
            svgIcon={IconExplore}
          />
        </div>
      </div>
    )
  }
}
