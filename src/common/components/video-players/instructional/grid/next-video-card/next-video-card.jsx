import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import PlayButton from '../../../../../../assets/next-video-play.svg';

function calculateAnimationStates(els) {
  const zoomedInRect = els.card.parentNode.getBoundingClientRect();
  const zoomedOutVideoMargin = 40;
  const zoomedOutRect = {
    width: zoomedInRect.width + zoomedOutVideoMargin * 2,
    height: zoomedInRect.height + zoomedOutVideoMargin * 2
  }

  const scaledRatio = {
    x: zoomedOutRect.width/zoomedInRect.width,
    y: zoomedOutRect.height/zoomedInRect.height
  }

  return {
    out: {
      card: {
        opacity: 0,
        x: 20 * scaledRatio.x,
        y: 100,
        scaleX: scaledRatio.x,
        scaleY: scaledRatio.y
      },
      topUI: {
        opacity: 0
      },
      button: {
        scale: 0
      },
      title: {
        opacity: 0,
        y: 100
      },
      counterText: {
        opacity: 0,
        y: 100
      }
    },
    idle: {
      card: {
        delay: 0.3,
        opacity: 1,
        x: 20 * scaledRatio.x,
        y: 0,
        scaleX: scaledRatio.x,
        scaleY: scaledRatio.y
      },
      topUI: {
        delay: 0.5,
        opacity: 1
      },
      button: {
        delay: 0.6,
        scale: 1
      },
      title: {
        delay: 0.9,
        opacity: 1,
        y: 0
      },
      counterText: {
        delay: 0.9,
        opacity: 1,
        y: 0
      }
    }
  };
};

export default class NextVideoCard extends React.Component {

  componentDidMount() {
    const { card, topUI, button, buttonShadow, title, counterText } = this.refs;

    this.animationStates = calculateAnimationStates(this.refs);

    animate.set(card, this.animationStates.out.card);
    animate.set(topUI, this.animationStates.out.topUI);
    animate.set(button, this.animationStates.out.button);
    animate.set(title, this.animationStates.out.title);
    animate.set(counterText, this.animationStates.out.counterText);
  }

  componentWillEnter (callback) {
    const { card, topUI, button, buttonShadow, title, counterText } = this.refs;

    Promise.all([
      animate.to(card, 0.3, this.animationStates.idle.card),
      animate.to(topUI, 0.3, this.animationStates.idle.topUI),
      animate.to(button, 0.3, this.animationStates.idle.button),
      animate.to(title, 0.3, this.animationStates.idle.title),
      animate.to(counterText, 0.3, this.animationStates.idle.counterText),
    ])
    .then(callback);
  }

  componentWillLeave (callback) {
    const { card, topUI, button, buttonShadow, title, counterText } = this.refs;

    Promise.all([
      animate.to(card, 0.3, this.animationStates.out.card),
      animate.to(topUI, 0.3, this.animationStates.out.topUI),
      animate.to(button, 0.3, this.animationStates.out.button),
      animate.to(title, 0.3, this.animationStates.out.title),
      animate.to(counterText, 0.3, this.animationStates.out.counterText),
    ])
    .then(callback);
  }

  handleMouseEnter = () => {
    this.video.play();
  };

  handleMouseLeave = () => {
    this.video.pause();
    this.video.currentTime = 0;
  }

  render() {
    return (
      <div
        ref="card"
        className="next-video-card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Link to={this.props.route}>
          <video
            ref={ node => this.video = node }
            src={this.props.video}
          >
          </video>
          <span ref="topUI">
            <div ref="button" className="next-video-button">></div>
            <label>Up Next</label>
          </span>
          <h2 ref="title">{this.props.title}</h2>
          <div ref="button" className="spinner-button">
            <div className="spinner-shadow"></div>
            <span dangerouslySetInnerHTML={{ __html: PlayButton }}></span>
          </div>
          <div
            ref="counterText"
            className="counter-text"
          >
            {`Starting in ${this.props.timeLeft || 0}...`}
          </div>
        </Link>
      </div>
    )
  }
}