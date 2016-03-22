import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';

export default class PanoramaLoader extends React.Component {

  static propTypes = {};

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    animate.set(this.containerEl, {autoAlpha: 0});
  }

  componentWillEnter(callback) {
    animate.fromTo(this.containerEl, 0.2, {autoAlpha: 0}, {autoAlpha: 1})
      .then(() => callback && callback());
  }

  componentWillLeave(callback) {
    animate.to(this.containerEl, 0.2, {autoAlpha: 0})
      .then(() => callback && callback());
  }

  render() {
    return (
      <div className={`panorama-loader`}>
        LOADING...
      </div>
    );
  }
}
