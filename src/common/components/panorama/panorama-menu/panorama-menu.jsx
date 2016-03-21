import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';

export default class PanoramaMenu extends React.Component {

  static propTypes = {};

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  animateIn = () => {
    animate.to(this.containerEl, 0.5, {y: '0%', autoAlpha: 1, ease: Expo.easeOut});
  };

  animateOut = () => {
    animate.to(this.containerEl, 0.5, {y: '-100%', autoAlpha: 0, ease: Expo.easeOut});
  };

  setCurrentTab = () => {

  };

  render() {
    return (
      <div className={`panorama-menu`}>
        <div className={`item`}>Math Class</div>
        <div className={`item`}>Soccer Field</div>
        <div className={`item`}>Hallway</div>
      </div>
    );
  }
}
