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
    this.items = document.querySelectorAll('.panorama-menu .item');

    animate.set(this.refs.heading, {y: -50});
    animate.set(this.refs.container, {y: -120});
    animate.set(this.items, {y: 20, autoAlpha: 0});
  }

  animateIn = () => {
    if (this.props.currMode === this.props.modes.LEAVE_IDLE) {
      animate.set(this.containerEl, {y: -50});
    } else {
      animate.set(this.containerEl, {y: 0});
    }

    return animate.all([
      animate.to(this.refs.heading, 0.5, {y: 0, autoAlpha: 1, ease: Expo.easeOut}),
      animate.to(this.refs.container, 0.5, {y: 0, autoAlpha: 1, ease: Expo.easeOut, delay: 0.05}),
      animate.staggerFromTo(this.items, 0.2, {y: 20, autoAlpha: 0}, {y: 0, autoAlpha: 1, delay: 0.4}, 0.05)
    ])
  };

  animateOut = () => {
    return animate.all([
      animate.to(this.items, 0.3, {autoAlpha: 0}),
      animate.to(this.refs.container, 0.5, {y: -120, autoAlpha: 1, ease: Expo.easeOut}),
      animate.to(this.refs.heading, 0.5, {y: -50, autoAlpha: 1, ease: Expo.easeOut, delay: 0.1})
    ])
  };

  setCurrentTab = (e) => {
    const target = e.target;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item !== target) {
        item.classList.remove('selected');
      } else {
        item.classList.add('selected');
      }
    }

    this.props.setPanorama(target.dataset.slug);
  };

  handleMouseEnter = () => {
    if (this.props.currMode === this.props.modes.ENTER_FB) {
      animate.to(this.containerEl, 0.5, {y: 0, ease: Expo.easeOut});
    }
  };

  handleMouseLeave = () => {
    if (this.props.currMode === this.props.modes.ENTER_FB) {
      animate.to(this.containerEl, 0.5, {y: -50, ease: Expo.easeOut});
    }
  };

  render() {
    return (
      <div
        className={`panorama-menu`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div ref="heading" className={`heading`}>
          Select a Different Environment
        </div>

        <div ref="container" className={`items-container`}>
          <div
            className={`item selected`}
            onClick={this.setCurrentTab}
            data-slug={`math`}
          >
            Math
          </div>

          <div
            className={`item`}
            onClick={this.setCurrentTab}
            data-slug={`ela`}
          >
            ELA
          </div>

          <div
            className={`item`}
            onClick={this.setCurrentTab}
            data-slug={`science`}
          >
            Science
          </div>

          <div
            className={`item`}
            onClick={this.setCurrentTab}
            data-slug={`hallway`}
          >
            Hallway
          </div>
        </div>
      </div>
    );
  }
}
