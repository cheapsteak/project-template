import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';

export default class PanoramaCompass extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    rotation: React.PropTypes.number.isRequired,
    modes: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    currMode: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    className: ''
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
    animate.set(this.containerEl, {y: -40, autoAlpha: 0});
  }

  animateIn = () => {
    animate.to(this.containerEl, 0.5, {y: 0, autoAlpha: 1, ease: Expo.easeOut});
  };

  animateOut = () => {
    animate.to(this.containerEl, 0.5, {y: -40, autoAlpha: 0, ease: Expo.easeOut});
  };

  render() {
    const rotation = 'rotateZ(' + this.props.rotation + 'deg)';
    const rotationStyles = {transform: rotation, WebkitTransform: rotation};

    return (
      <div className={`panorama-compass ${this.props.className}`}>
        <p className={`north`}>N</p>
        <p className={`east`}>E</p>
        <p className={`south`}>S</p>
        <p className={`west`}>W</p>

        <div className={`outer-indicator`} style={rotationStyles}></div>

        <div className={`inner-container`}>
          <div className={`inner-indicator`} style={rotationStyles}></div>
          <div className={`dot`}></div>
        </div>
      </div>
    );
  }
}
