import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import IconExplore from 'svgs/icon-explore.svg';
import animate from 'gsap-promise';


function calculateAnimationStates(els) {
  return {
    out: {
      card: {
        opacity: 0,
        y: 110
      },
      frontOverlay: {
        y: els.frontOverlay.offsetHeight
      },
      backOverlay: {
        y: els.backOverlay.offsetHeight
      },
      title: {
        opacity: 0,
        y: 50
      }
    },
    idle: {
      card: {
        delay: 0.3,
        opacity: 1,
        y: 0
      },
      frontOverlay: {
        delay: 0.7,
        y: 0
      },
      backOverlay: {
        delay: 0.5,
        y: 0
      },
      title: {
        delay: 1,
        opacity: 1,
        y: 0
      }
    }
  };
};

export default class ImageCardOne extends React.Component {

  static propTypes = {
    routes: React.PropTypes.string,
    image: React.PropTypes.string,
    label: React.PropTypes.string,
    title: React.PropTypes.string,
    gridButton: React.PropTypes.bool,
  };

  componentDidMount() {
    const { card, frontOverlay, backOverlay, button, label, title } = this.refs;

    this.animationStates = calculateAnimationStates(this.refs);

    animate.set(card, this.animationStates.out.card);
    animate.set(backOverlay, this.animationStates.out.backOverlay);
    animate.set(frontOverlay, this.animationStates.out.frontOverlay);
    animate.set(title, this.animationStates.out.title);
  }

  componentWillEnter (callback) {
    const { card, frontOverlay, backOverlay, button, label, title } = this.refs;

    Promise.all([
      animate.to(card, 0.3, this.animationStates.idle.card),
      animate.to(backOverlay, 0.3, this.animationStates.idle.backOverlay),
      animate.to(frontOverlay, 0.3, this.animationStates.idle.frontOverlay),
      animate.to(title, 0.3, this.animationStates.idle.title)
    ])
    .then(callback);
  }

  componentWillLeave (callback) {
    const { card, frontOverlay, backOverlay, button, label, title } = this.refs;

    Promise.all([
      animate.to(card, 0.3, this.animationStates.out.card),
      animate.to(backOverlay, 0.3, this.animationStates.out.backOverlay),
      animate.to(frontOverlay, 0.3, this.animationStates.out.frontOverlay),
      animate.to(title, 0.3, this.animationStates.out.title)
    ])
    .then(callback);
  }

  render() {
    return (
      <div
        ref="card"
        className="ending-card image-card-one"
      >
        <Link to={this.props.route}>
          <img src={this.props.image} />
          <div ref="frontOverlay" className="bottom-overlay-front">
            {
              this.props.gridButton 
              ? <span className="learn-more-button" dangerouslySetInnerHTML={{__html: IconExplore }}></span>
              : <div ref="button" className="learn-more-button">+</div>
            }
            <label ref="label">{this.props.label}</label>
            <h3 ref="title">{this.props.title}</h3>
          </div>
          <div ref="backOverlay" className="bottom-overlay-back"></div>
          </Link>
      </div>
    )
  }
}