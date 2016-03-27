import React from 'react';
import animate from 'gsap-promise';
import _ from 'lodash';
import Promise from 'bluebird';

const easeType = Quad;
const duration = 0.15;

export default class RectangularButton extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    hoverBackgroundColor: React.PropTypes.string,
    svgIcon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func
  };

  componentDidMount() {
    animate.set(this.refs.text, {color: this.props.color || 'transparent'});
    this.props.backgroundColor && animate.set(this.refs.button, {backgroundColor: this.props.backgroundColor});
  }

  handleClick = () => {
    audio.play('button-click');
    this.props.onClick && this.props.onClick();
  };

  handleMouseEnter = () => {
    audio.play('button-rollover');
    this.animateOnMouseEnter();
    this.props.onMouseEnter && this.props.onMouseEnter();
  };

  handleMouseLeave = () => {
    this.animateOnMouseLeave();
    this.props.onMouseLeave && this.props.onMouseLeave();
  };

  animateOnMouseLeave = () => {
    return Promise.all([
      animate.to(this.refs.text, duration, {y: 20, autoAlpha: 0, ease: easeType.easeIn})
        .then(() => {
          animate.set(this.refs.text, {y: -20});
          animate.to(this.refs.text, duration, {y: 0, autoAlpha: 1, ease: easeType.easeIn});
        }),
      animate.to(this.refs.button, duration, {
        backgroundColor: this.props.backgroundColor,
        ease: easeType.easeIn
      }),
      this.refs.icon && animate.to(this.refs.icon, duration, {delay: 0.1, y: 20, autoAlpha: 0, ease: easeType.easeIn})
        .then(() => {
          animate.set(this.refs.icon, {y: -20});
          animate.to(this.refs.icon, duration, {y: 0, autoAlpha: 1, ease: easeType.easeIn});
        })
    ]);
  };

  animateOnMouseEnter = () => {
    return Promise.all([
      this.refs.icon && animate.to(this.refs.icon, duration, {delay: 0, y: -20, autoAlpha: 0, ease: easeType.easeOut})
        .then(() => {
          animate.set(this.refs.icon, {y: 20});
          animate.to(this.refs.icon, duration, {y: 0, autoAlpha: 1, ease: easeType.easeOut});
        }),
      animate.to(this.refs.text, duration, {y: -20, autoAlpha: 0, ease: easeType.easeOut, delay: 0.1})
        .then(() => {
          animate.set(this.refs.text, {y: 20});
          animate.to(this.refs.text, duration, {y: 0, autoAlpha: 1, ease: easeType.easeOut});
        }),
      animate.to(this.refs.button, duration, {
        backgroundColor: this.props.hoverBackgroundColor || 'rgba(0,0,0,0)',
        ease: easeType.easeOut
      })
    ]);
  };

  stopAnimations = () => {
    TweenMax.killTweensOf(_.values(this.refs));
  };

  render() {
    const {className, style} = this.props;

    return (
      <div
        ref="button"
        className={`rectangular-button ${className || ''}`}
        style={style}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...(_.omit(this.props, Object.keys(RectangularButton.propTypes)))}
      >
        {
          this.props.svgIcon &&
          <div
            ref="icon"
            className={`icon ${this.props.text ? 'margin' : ''}`}
            dangerouslySetInnerHTML={{__html:this.props.svgIcon}}
          ></div>
        }
        <div
          ref="text"
          className="button-text"
        >
          {this.props.text}
        </div>
      </div>
    )
  }
}
