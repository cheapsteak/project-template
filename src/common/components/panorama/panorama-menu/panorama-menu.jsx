import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';

export default class PanoramaMenu extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    modes: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    currMode: React.PropTypes.string.isRequired,
    setPanorama: React.PropTypes.func
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
    this.items = document.querySelectorAll('.panorama-menu .item');

    animate.set(this.refs.heading, {y: '-100%'});
    animate.set(this.refs.container, {y: '-180%'});
    animate.set(this.items, {y: 20, autoAlpha: 0});

    this.refs.firstTab.click();
  }

  animateIn = () => {
    if (this.props.currMode === this.props.modes.LEAVE_IDLE) {
      animate.set(this.containerEl, {y: -this.refs.heading.offsetHeight});
    } else {
      animate.set(this.containerEl, {y: '0%'});
    }

    return animate.all([
      animate.to(this.refs.heading, 0.8, {y: '0%', autoAlpha: 1, ease: Expo.easeOut}),
      animate.to(this.refs.container, 1, {y: '0%', autoAlpha: 1, ease: Expo.easeOut}),
      animate.staggerFromTo(this.items, 0.4, {y: 20, autoAlpha: 0}, {y: 0, autoAlpha: 1, delay: 0.5}, 0.1)
    ])
  };

  animateOut = () => {
    var delay = 0;
    if (this.props.currMode === this.props.modes.LEAVE_IDLE) {
      delay = 0.5;
    }

    return animate.all([
      animate.to(this.items, 0.3, {autoAlpha: 0}),
      animate.to(this.refs.container, 0.8, {y: '-180%', autoAlpha: 1, ease: Expo.easeOut, delay: delay}),
      animate.to(this.refs.heading, 0.6, {y: '-100%', autoAlpha: 1, ease: Expo.easeOut, delay: delay})
    ])
  };

  handleTabMouseEnter = (e) => {
    const target = e.target;
    if (!target.classList.contains('selected')) {
      audio.play('button-rollover');
    }
  };

  handleTabClick = (e) => {
    const target = e.target;
    if (target.classList.contains('selected')) {
      return;
    }

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item !== target) {
        item.classList.remove('selected');
      } else {
        item.classList.add('selected');
      }
    }

    this.props.setPanorama(target.dataset.slug);
    audio.play('button-click');
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
        className={`panorama-menu ${this.props.className}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div ref="heading" className={`heading`}>
          Select a Different Environment
        </div>

        <div ref="container" className={`items-container`}>
          <div
            ref="firstTab"
            className={`item`}
            onClick={this.handleTabClick}
            onMouseEnter={this.handleTabMouseEnter}
            data-slug={`math`}
          >
            <span>Math Classroom</span>
          </div>

          <div
            className={`item`}
            onClick={this.handleTabClick}
            onMouseEnter={this.handleTabMouseEnter}
            data-slug={`literacy-and-writing`}
          >
            <span>Literacy Classroom</span>
          </div>

          <div
            className={`item`}
            onClick={this.handleTabClick}
            onMouseEnter={this.handleTabMouseEnter}
            data-slug={`science`}
          >
            <span>Science Lab</span>
          </div>

          <div
            className={`item`}
            onClick={this.handleTabClick}
            onMouseEnter={this.handleTabMouseEnter}
            data-slug={`hallway`}
          >
            <span>Hallway</span>
          </div>
        </div>
      </div>
    );
  }
}
