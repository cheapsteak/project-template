import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';

export default class PanoramaMenu extends React.Component {

  static propTypes = {
    modes: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    currMode: React.PropTypes.string.isRequired,
    setPanorama: React.PropTypes.func
  };

  componentWillReceiveProps(newProps) {
    if (newProps.currMode !== this.currMode) {
      this.currMode = newProps.currMode;

      switch (newProps.currMode) {
        case this.props.modes.ENTER_IDLE:
        case this.props.modes.ENTER_FB:
          this.animateIn();
          break;
        case this.props.modes.LEAVE_IDLE:
        case this.props.modes.LEAVE_FB:
          this.animateOut();
          break;
        default:
          break;
      }
    }
  }

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
