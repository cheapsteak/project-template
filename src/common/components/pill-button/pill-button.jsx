import React from 'react';
import animate from 'gsap-promise';

function calculateAnimationStates() {
  return {
    click: {

    },
    idle: {
      text: {

      }
    },
    rollover: {

    }
  }
}

export default class PillButton extends React.Component {
  componentDidMount() {
    this.animationStates = calculateAnimationStates();
  }

  handleClick = (e) => {
    console.log('Pill Button - Click')
  };

  handleMouseEnter = (e) => {
    TweenMax.killTweensOf([
      this.refs.text,
      this.refs.pillButton
    ]);

    animate.to(this.refs.pillButton, 0.3, { css: {backgroundColor: '#121212'} })

    animate
      .to(this.refs.text, 0.2, { opacity: 0, y: -20 })
      .then(() => {
        animate.set(this.refs.text, { y: 20 });
        return animate.to(this.refs.text, 0.2, { opacity: 1, y: 0 });
      });
  };

  handleMouseLeave = (e) => {
    TweenMax.killTweensOf([
      this.refs.text,
      this.refs.pillButton
    ]);

    animate.to(this.refs.pillButton, 0.3, { css: {backgroundColor: '#2B2B2B'} })

    animate
      .to(this.refs.text, 0.2, { opacity: 0, y: 20 })
      .then(() => {
        animate.set(this.refs.text, { y: -20 });
        return animate.to(this.refs.text, 0.2, { opacity: 1, y: 0 });
      });
  };

  render () {
    const { className, style } = this.props;

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
          <span></span>
          <span></span>
        </div>
        <div ref="text" className="pill-button-text">Read More</div>
      </div>
    )
  }
}