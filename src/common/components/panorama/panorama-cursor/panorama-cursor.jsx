import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import IconClose from 'svgs/icon-360-cursor.svg';

export default class PanoramaCursor extends React.Component {

  static propTypes = {
    cursorPos: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
    isVisible: React.PropTypes.bool
  };

  componentWillReceiveProps(newProps) {
    if (newProps.isVisible !== this.isVisible) {
      this.isVisible = newProps.isVisible;
      animate.to(this.containerEl, 0.3, {autoAlpha: (newProps.isVisible) ? 1 : 0});
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  animateIn = () => {
    animate.to(this.containerEl, 0.5, {autoAlpha: 1, ease: Expo.easeOut});
  };

  animateOut = () => {
    animate.to(this.containerEl, 0.5, {autoAlpha: 0, ease: Expo.easeOut});
  };

  render() {
    const width = 100;
    const translateX = this.props.cursorPos.x - width * 0.5;
    const translateY = this.props.cursorPos.y - width * 0.5;

    const translateStyles = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    //const rotation = 'rotateZ(' + this.props.rotation + 'deg)';
    //const rotationStyles = {transform: rotation, WebkitTransform: rotation};

    return (
      <div
        className={`panorama-cursor`}
        style={{transform: translateStyles}}
      >
        <div dangerouslySetInnerHTML={{ __html: IconClose }}></div>
      </div>
    );
  }
}
