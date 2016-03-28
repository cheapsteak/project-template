import React from 'react';
import animate from 'gsap-promise';
import Promise from 'bluebird';

export default class PillButton extends React.Component {

  state = {
    active: false
  };

  // This is a fix for MouseLeave not firing after click and tween until mouse moves
  _clicked = undefined;

  componentDidMount() {
    animate.set(this.refs.verticalBar, {rotation: 90});
  }

  handleClick = (e) => {
    this._clicked = 'clicked';
    audio.play('button-click');

    if (!this.state.active) {
      this.animateToActive();
    } else {
      this.animateToIdle();
    }

    this.setState({active: !this.state.active});
    this.props.onClick && this.props.onClick();
  };

  handleMouseEnter = (e) => {
    audio.play('button-rollover');
    this.animateMouseEnter();
  };

  handleMouseLeave = (e) => {
    if (this._clicked) {
      this._clicked = undefined;
      return;
    }

    this.animateMouseLeave();
  };

  animateToActive = () => {
    TweenMax.killTweensOf([
      this.refs.text,
      this.refs.pillButton
    ]);

    return animate
      .to(this.refs.text, 0.2, {opacity: 0, y: 20})
      .then(() => {
        animate.set(this.refs.text, {y: -20});
        return Promise.all([
          animate.to(this.refs.pillButton, 0.3, {css: {backgroundColor: '#2B2B2B'}}),
          animate.to(this.refs.text, 0.2, {opacity: 1, y: 0}),
          animate.to(this.refs.horizontalBar, 0.3, {rotation: 180}),
          animate.to(this.refs.verticalBar, 0.3, {rotation: 180})
        ]);
      });
  };

  animateToIdle = () => {
    TweenMax.killTweensOf([
      this.refs.text,
      this.refs.pillButton
    ]);

    return animate
      .to(this.refs.text, 0.2, {opacity: 0, y: -20})
      .then(() => {
        animate.set(this.refs.text, {y: 20});
        return Promise.all([
          animate.to(this.refs.text, 0.2, {opacity: 1, y: 0}),
          animate.to(this.refs.pillButton, 0.3, {css: {backgroundColor: '#121212'}}),
          animate.to(this.refs.horizontalBar, 0.3, {rotation: 0}),
          animate.to(this.refs.verticalBar, 0.3, {rotation: 90})
        ]);
      });
  };

  animateMouseEnter = () => {
    TweenMax.killTweensOf([
      this.refs.text,
      this.refs.pillButton
    ]);

    return animate
      .to(this.refs.text, 0.2, {opacity: 0, y: -20})
      .then(() => {
        animate.set(this.refs.text, {y: 20});
        return Promise.all([
          animate.to(this.refs.text, 0.2, {opacity: 1, y: 0}),
          animate.to(this.refs.pillButton, 0.3, {css: {backgroundColor: '#121212'}})
        ]);
      });
  };

  animateMouseLeave = () => {
    TweenMax.killTweensOf([
      this.refs.text,
      this.refs.pillButton
    ]);

    return animate
      .to(this.refs.text, 0.2, {opacity: 0, y: 20})
      .then(() => {
        animate.set(this.refs.text, {y: -20});
        return Promise.all([
          animate.to(this.refs.pillButton, 0.3, {css: {backgroundColor: '#2B2B2B'}}),
          animate.to(this.refs.text, 0.2, {opacity: 1, y: 0})
        ]);
      });
  };

  render() {
    const {className, style} = this.props;

    return (
      <div
        ref="pillButton"
        className={`pill-button ${className || ''}`}
        style={style}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="plus-circle">
          <span ref="horizontalBar"></span>
          <span ref="verticalBar"></span>
        </div>
        <div
          ref="text"
          className="pill-button-text"
        >
          { this.state.active ? this.props.activeText : this.props.idleText }
        </div>
      </div>
    )
  }
}
