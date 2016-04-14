import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import IconExplore from 'svgs/icon-explore.svg';
import animate from 'gsap-promise';


function calculateAnimationStates(els) {
  const ratio = 1.2
  const backOverlayHoverHeight = els.backOverlay.offsetHeight * ratio;
  const frontOverlayHoverHeight = els.frontOverlay.offsetHeight * ratio;

  return {
    out: {
      card: {
        opacity: 0,
        y: 110,
        ease: ViniEaseOut
      },
      frontOverlay: {
        y: els.frontOverlay.offsetHeight,
        ease: ViniEaseOut
      },
      backOverlay: {
        y: els.backOverlay.offsetHeight,
        ease: ViniEaseOut
      },
      title: {
        opacity: 0,
        y: 10,
        ease: ViniEaseOut
      },
      button: {
        opacity: 0,
        y: 10,
        ease: ViniEaseOut
      },
      label: {
        opacity: 0,
        y: 10,
        ease: ViniEaseOut
      },

      image: {
        scale: 1.4,
        z: 0,
        ease: ViniEaseOut
      }
    },
    idle: {
      card: {
        delay: 0.3,
        opacity: 1,
        y: 0,
        ease: ViniEaseOut
      },
      frontOverlay: {
        delay: 0.5,
        y: 0,
        ease: ViniEaseOut
      },
      backOverlay: {
        delay: 0.2,
        y: 0,
        ease: ViniEaseOut
      },
      title: {
        delay: 1.3,
        opacity: 1,
        y: 0,
        ease: ViniEaseOut
      },
      label: {
        delay: 1.2,
        opacity: 1,
        y: 0,
        ease: ViniEaseOut
      },
      button: {
        delay: 1.1,
        opacity: 1,
        y: 0,
        ease: ViniEaseOut
      },
      image: {
        delay: 0.3,
        scale: 1,
        ease: ViniEaseOut,
        z: 0
      }
    },
    mouseOver : {
      backOverlay: {
        height: (els.backOverlay.offsetHeight + 40),
        ease: ViniEaseOut
      },
      frontOverlay: {
        delay: 0.2,
        height: (els.frontOverlay.offsetHeight + 40),
        ease: ViniEaseOut
      },
      button: {
        delay: 0.3,
        opacity: 1,
        y: -20,
        ease: ViniEaseOut
      },
      label: {
        delay: 0.3,
        opacity: 1,
        y: -20,
        ease: ViniEaseOut
      },
      title: {
        delay: 0.4,
        opacity: 1,
        y: -20,
        ease: ViniEaseOut
      },
    },
    mouseOut: {
      backOverlay: {
        delay: 0.5,
        height: (els.backOverlay.offsetHeight),
        ease: ViniEaseOut
      },
      frontOverlay: {
        delay: 0.3,
        height: (els.frontOverlay.offsetHeight),
        ease: ViniEaseOut
      },
      button: {
        delay: 0.1,
        opacity: 1,
        y: 0,
        ease: ViniEaseOut
      },
      label: {
        delay: 0.1,
        opacity: 1,
        y: 0,
        ease: ViniEaseOut
      },
      title: {
        opacity: 1,
        y: 0,
        ease: ViniEaseOut
      },
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
    animate.set(this.refs.image, this.animationStates.out.image);
    animate.set(this.refs.label, this.animationStates.out.label);
    animate.set(this.refs.button, this.animationStates.out.button);

  }

  componentWillEnter (callback) {
    const { card, frontOverlay, backOverlay, button, label, title, image } = this.refs;

    Promise.all([
      animate.to(card, 0.8, this.animationStates.idle.card),
      animate.to(backOverlay, 0.8, this.animationStates.idle.backOverlay),
      animate.to(frontOverlay, 0.8, this.animationStates.idle.frontOverlay),
      animate.to(title, 0.8, this.animationStates.idle.title),
      animate.to(button, 0.8, this.animationStates.idle.button),
      animate.to(label, 0.8, this.animationStates.idle.label),
      animate.to(image, 3, this.animationStates.idle.image)
    ])
    .then(callback);
  }

  componentWillLeave (callback) {
    const { card, frontOverlay, backOverlay, button, label, title, image } = this.refs;

    Promise.all([
      animate.to(card, 0.8, this.animationStates.out.card),
      animate.to(backOverlay, 0.8, this.animationStates.out.backOverlay),
      animate.to(frontOverlay, 0.8, this.animationStates.out.frontOverlay),
      animate.to(title, 0.8, this.animationStates.out.title),
      animate.to(button, 0.8, this.animationStates.out.button),
      animate.to(label, 0.8, this.animationStates.out.label),
      animate.to(image, 3, this.animationStates.out.image)
    ])
    .then(callback);
  }

  handleMouseEnter = () => {
    const { card, frontOverlay, backOverlay, button, label, title, image } = this.refs;

    Promise.all([
      animate.to(backOverlay, 0.5, this.animationStates.mouseOver.backOverlay),
      animate.to(frontOverlay, 0.5, this.animationStates.mouseOver.frontOverlay),
      animate.to(title, 0.5, this.animationStates.mouseOver.title),
      animate.to(button, 0.5, this.animationStates.mouseOver.button),
      animate.to(label, 0.5, this.animationStates.mouseOver.label),
    ])
  };

  handleMouseLeave = () => {
    const { card, frontOverlay, backOverlay, button, label, title, image } = this.refs;

    Promise.all([
      animate.to(backOverlay, 0.5, this.animationStates.mouseOut.backOverlay),
      animate.to(frontOverlay, 0.5, this.animationStates.mouseOut.frontOverlay),
      animate.to(title, 0.5, this.animationStates.mouseOut.title),
      animate.to(button, 0.5, this.animationStates.mouseOut.button),
      animate.to(label, 0.5, this.animationStates.mouseOut.label),
    ])
  };

  render() {
    return (
      <div
        ref="card"
        className="ending-card image-card-one"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Link to={this.props.route}>
          <img ref="image" src={this.props.image} />
          <div className="outer-content-wrapper">
            {
              this.props.gridButton 
              ? <span ref="button" className="learn-more-button" dangerouslySetInnerHTML={{__html: IconExplore }}></span>
              : <div ref="button" className="learn-more-button">+</div>
            }
            <label ref="label">{this.props.label}</label>
            <h3 ref="title">{this.props.title}</h3>
          </div>
          <div ref="frontOverlay" className="bottom-overlay-front"></div>
          <div ref="backOverlay" className="bottom-overlay-back"></div>
        </Link>
      </div>
    )
  }
}