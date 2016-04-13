import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import PlayButton from '../../../play-button/play-button.jsx';
import BgCover from 'background-cover';

function calculateAnimationStates(els) {
  return {
    out: {
      card: {
        opacity: 0,
        y: 100,
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
      }
    },
    idle: {
      card: {
        delay: 0.3,
        opacity: 1,
        y: 0,
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
        opacity: 1,
        y:0
      }
    }
  };
};

export default class NextVideoCard extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    const { card, topUI, button, buttonShadow, title, counterText } = this.refs;

    this.animationStates = calculateAnimationStates(this.refs);

    animate.set(card, this.animationStates.out.card);
    animate.set(topUI, this.animationStates.out.topUI);
    animate.set(button, this.animationStates.out.button);
    animate.set(title, this.animationStates.out.title);
    animate.set(counterText, this.animationStates.out.counterText);

    window.addEventListener('resize', this.handleResize);
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);  
  }

  handleMouseEnter = () => {
    this.video.play();
  };


  handleMouseLeave = () => {
    this.video.pause();
  };

  handleClick = () => {
    this.context.router.replace(this.props.route);
  };

  handleResize = () => {
    BgCover.BackgroundCover(this.video, this.refs.card);
  };

  render() {
    return (
      <div
        ref="card"
        className="ending-card video-card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div onClick={this.handleClick}>
          <video
            ref={ node => this.video = node }
            src={this.props.video}
            onLoadedMetadata={this.handleResize}
          >
          </video>
          <span ref="topUI">
            <div ref="button" className="next-video-button">></div>
            <label>Next</label>
          </span>
          <h2 ref="title">{this.props.title}</h2>

          <div className={`spinner-button`}>
            <PlayButton
              circleColor={`#f99100`}
              progress={1 - this.props.timeLeft/15}
              isCountDown={true}
            />
          </div>

          <div
            ref="counterText"
            className="counter-text"
          >
            {`Starting in ${this.props.timeLeft || 0}...`}
          </div>
        </div>
      </div>
    )
  }
}
