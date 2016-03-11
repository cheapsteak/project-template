import React from 'react';
import { findDOMNode } from 'react-dom';
import model from '../../../data/grid';
import animate from 'gsap-promise';
import objectMerge from 'object-merge';

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
    chapter: React.PropTypes.string,
    isFilterEnabled: React.PropTypes.bool
  };

  //static defaultProps = {
  //  isFilterEnabled: true
  //};

  state = {
    data: {},
    size: sizes.LANDSCAPE
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFilterEnabled !== this.isFiltered && !this.state.data.hasInstructionalVideo) {
      nextProps.isFilterEnabled ? this.applyFilter() : this.removeFilter();
    }

    this.isFilterEnabled = nextProps.isFilterEnabled && !this.state.data.hasInstructionalVideo;
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.textLayer = this.refs.textLayer;
    this.imageLayer = this.refs.imageLayer;
    this.overlay = this.refs.overlay;

    // timeout is needed here because Packery needs some time for positioning, otherwise items height is 0
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
    if (!this.refs.slide) {
      return;
    }

    const mouseX = e.clientX - this.containerEl.getBoundingClientRect().left;
    const centerX = this.containerEl.offsetWidth / 2;
    const currSide = (mouseX > centerX) ? sides.RIGHT : sides.LEFT;

    if (currSide !== this.prevSide) {
      this.onSideChanged(currSide);
      this.prevSide = currSide;
    }
  };

  handleMouseEnter = () => {
    if (this.isFilterEnabled) {
      return;
    }

    this.context.eventBus.emit('mouseEnterTile', this);

    const containerCenterX = this.containerEl.offsetWidth * 0.5;
    const imageOffset = parseInt(getComputedStyle(this.refs.image).getPropertyValue('left'));
    const centerX = (imageOffset - containerCenterX) * (this.state.sizes === sizes.PORTRAIT ? -0.5 : 0.8);

    animate.to(this.textLayer, 0.2, {autoAlpha: 0});
    animate.to(this.imageLayer, 0.5, {x: centerX, ease: Expo.easeOut});
    animate.to(this.overlay, 0.3, {autoAlpha: 0.8});

  };

  handleMouseLeave = () => {
    if (this.isFilterEnabled) {
      return;
    }

    this.prevSide = null;

    animate.to([this.refs.ctaContainerLeft, this.refs.ctaContainerRight], 0.2, {autoAlpha: 0});
    animate.to(this.overlay, 0.2, {autoAlpha: 0, delay: 0.1});
    animate.to(this.textLayer, 0.2, {autoAlpha: 1, delay: 0.2});
    animate.to(this.imageLayer, 0.5, {x: 0, ease: Expo.easeOut, delay: 0.2})
      .then(() => {
        this.context.eventBus.emit('mouseLeaveTile', this);
      });
  };

  animateInLayers = (index) => {
    const width = this.containerEl.offsetWidth;
    const height = this.containerEl.offsetHeight;
    const scaleX = (width + 30) / width;
    const scaleY = (height + 30) / height;

    animate.set(this.containerEl, {autoAlpha: 0, scaleX: scaleX, scaleY: scaleY});
    animate.set(this.textLayer, {scale: 1.4, autoAlpha: 1, transformOrigin: 'top left'});
    animate.set(this.imageLayer, {scale: 1.6, autoAlpha: 1});

    const animationProps = {
      autoAlpha: 1,
      scale: 1,
      delay: (0.1 * index) + 0.3,
      ease: Expo.easeOut,
      overwrite: 'all'
    };

    const extendedProps = objectMerge(animationProps, {
      autoAlpha: this.isFilterEnabled ? 0.1 : 1,
      scale: this.isFilterEnabled ? 0.9 : 1
    });

    animate.to(this.containerEl, 0.4, extendedProps);
    animate.to(this.textLayer, 1, animationProps);
    return animate.to(this.imageLayer, 1.2, animationProps);
  };

  animateInGridFillers = (fillers) => {
    animate.set(fillers, {autoAlpha: 0, scale: 1.1});
    return animate.staggerTo(fillers, 1, {autoAlpha: 1, scale: 1, delay: 0.6, ease: Expo.easeOut}, 0.1);
  };

  animateIn = (tileIndex, fillers) => {

    // timeout is needed here because Packery needs some time for positioning, otherwise items height is 0
    setTimeout(() => {
      this.isFilterEnabled = this.props.isFilterEnabled && !this.state.data.hasInstructionalVideo;
      this.animateInLayers(tileIndex);
      this.animateInGridFillers(fillers);
    });
  };

  applyFilter = () => {
    console.log('applyFilter')
    animate.to(this.containerEl, 0.3, {scale: 0.9, autoAlpha: 0.1, ease: Expo.easeOut});
    //this.context.eventBus.emit('disableParallax', this);
  };

  removeFilter = () => {
    console.log('removeFilter')
    animate.to(this.containerEl, 0.5, {scale: 1, autoAlpha: 1, ease: Expo.easeOut})
      .then(() => {
        //this.context.eventBus.emit('disableParallax', this);
      })
  };

  render() {
    const textDepth = 0.6;
    const bgDepth = 1;
    const imageDepth = 0.8;

    const overlay = this.props.isFilterEnabled ?
      (
        <div ref="overlay" className={`overlay `}>
          <div ref="ctaContainerLeft" className={`cta-container left`}>
            <div className={`cta`}>Watch<br/>Instructional<br/>Video</div>
          </div>
        </div>
      ) :
      (
        <div ref="overlay" className={`overlay `}>
          <div ref="slide" className={`slide gpu`}></div>
          <div ref="ctaContainerLeft" className={`cta-container left`}>
            <div className={`cta`}>Watch</div>
          </div>
          <div ref="ctaContainerRight" className={`cta-container right`}>
            <div className={`cta`}>Explore</div>
          </div>
        </div>
      )

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
          data-vector={`0.6,-0.2`}>
          <div className={`noise`}></div>
        </div>

        <div
          ref="textLayer"
          className={`parallax-layer text`}
          data-depth={textDepth}
          data-vector={`-0.4, -0.4`}
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

        {overlay}
      </div>
    );
  }

}
