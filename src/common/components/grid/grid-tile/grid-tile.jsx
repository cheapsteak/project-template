import React from 'react';
import { findDOMNode } from 'react-dom';
const model = require('../../../data/grid');
import animate from 'gsap-promise';

const sizes = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};

const sides = {
  LEFT: 'left',
  RIGHT: 'right'
};

export default class GridTile extends React.Component {

  static propTypes = {
    chapter: React.PropTypes.string
  };

  state = {
    data: {},
    size: sizes.LANDSCAPE
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    setTimeout(() => {
      const data = model.getDataByChapterId(this.props.chapter);
      const size = (this.containerEl.offsetWidth >= this.containerEl.offsetHeight - 20) ? sizes.LANDSCAPE : sizes.PORTRAIT;
      this.setState({data, size});
    });
  }

  prevSide;

  onSideChanged = (currSide) => {
    const isRightSide = (currSide === sides.RIGHT);
    var delay = 0;

    if (!this.prevSide) {
      animate.set(this.refs.slide, {x: isRightSide ? '200%' : '-100%'});
      delay = 0.1;
    }
    animate.to(this.refs.slide, 0.25, {
      x: isRightSide ? '100%' : '0%',
      ease: BezierEasing(0.1, 0.98, 0.9, 0.26),
      delay: delay,
      overwrite: 'all'
    });

    animate.to(isRightSide ? this.refs.ctaContainerRight : this.refs.ctaContainerLeft, 0.3, {autoAlpha: 1, delay: 0.1});
    animate.to(!isRightSide ? this.refs.ctaContainerRight : this.refs.ctaContainerLeft, 0.3, {autoAlpha: 0.8});
  };

  handleMouseMove = (e) => {
    const mouseX = e.clientX - this.containerEl.getBoundingClientRect().left;
    const centerX = this.containerEl.offsetWidth / 2;
    const currSide = (mouseX > centerX) ? sides.RIGHT : sides.LEFT;

    if (currSide !== this.prevSide) {
      this.onSideChanged(currSide);
      this.prevSide = currSide;
    }
  };

  handleMouseEnter = () => {
    this.context.eventBus.emit('mouseEnterTile', this);

    const containerCenterX = this.containerEl.offsetWidth * 0.5;
    const imageOffset = parseInt(getComputedStyle(this.refs.image).getPropertyValue('left'));
    const centerX = (imageOffset - containerCenterX) * (this.state.sizes === sizes.PORTRAIT ? -0.5 : 0.8);

    animate.to(this.refs.textLayer, 0.2, {autoAlpha: 0});
    animate.to(this.refs.imageLayer, 0.5, {x: centerX, ease: Expo.easeOut});
    animate.to(this.refs.overlay, 0.3, {autoAlpha: 0.8});
  };

  handleMouseLeave = () => {
    this.prevSide = null;

    animate.to([this.refs.ctaContainerLeft, this.refs.ctaContainerRight], 0.2, {autoAlpha: 0});
    animate.to(this.refs.overlay, 0.2, {autoAlpha: 0, delay: 0.1});
    animate.to(this.refs.textLayer, 0.2, {autoAlpha: 1, delay: 0.2});
    animate.to(this.refs.imageLayer, 0.5, {x: 0, ease: Expo.easeOut, delay: 0.2})
      .then(() => {
        this.context.eventBus.emit('mouseLeaveTile', this);
      })
  };

  animateIn = (index, fillers) => {
    animate.set(fillers, {autoAlpha: 0});
    animate.fromTo(this.containerEl, 0.8, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.15 * index + 0.1});
    animate.staggerTo(fillers, 0.8, {autoAlpha: 1, delay: 0.4}, 0.1)
  };

  render() {
    const textDepth = 0.6;
    const bgDepth = 1;
    const imageDepth = 0.8;

    return (
      <div
        className={`grid-tile`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <div
          ref="bgLayer"
          className={`parallax-layer background`}
          data-depth={bgDepth}
          data-vector={`-0.6,-0.5`}>
          <div className={`noise`}></div>
        </div>

        <div
          ref="textLayer"
          className={`parallax-layer text`}
          data-depth={textDepth}
          data-vector={`0.2, -0.5`}
        >
          <div className={`text-container`}>
            <div className={`title`}>{this.state.data.subtitle}</div>
            <div className={`subtitle`}>{this.state.data.title}</div>
          </div>
        </div>

        <div
          ref="imageLayer"
          className={`parallax-layer image`}
          data-depth={imageDepth}
          data-vector={`1,0.5`}
        >
          <div ref="image" className={`image-container ${this.state.size}`}>
            <img src={this.state.data.image}/>
          </div>
        </div>

        <div ref="overlay" className={`overlay `}>
          <div ref="slide" className={`slide gpu`}></div>
          <div ref="ctaContainerLeft" className={`cta-container left`}>
            <div className={`cta`}>Watch</div>
          </div>
          <div ref="ctaContainerRight" className={`cta-container right`}>
            <div className={`cta`}>Explore</div>
          </div>
        </div>
      </div>
    );
  }

}
