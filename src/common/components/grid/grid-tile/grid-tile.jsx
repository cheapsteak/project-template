import React from 'react';
import { findDOMNode } from 'react-dom';
import model from '../../../data/grid';
import animate from 'gsap-promise';
import IconWatch from '../../../../assets/svgs/icon-explore.svg';
import IconExplore from '../../../../assets/svgs/icon-explore.svg';
import { Link } from 'react-router';

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
    if (nextProps.isFilterEnabled !== this.isFiltered && !this.state.data.instructionalVideoUrl) {
      nextProps.isFilterEnabled ? this.applyFilter() : this.removeFilter();
    }

    this.isFilterEnabled = nextProps.isFilterEnabled && !this.state.data.instructionalVideoUrl;
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.textContainer = this.refs.textContainer;
    this.imageContainer = this.refs.imageContainer;

    setTimeout(() => {
      const data = model.getDataByChapterId(this.props.chapter);
      const size = (this.containerEl.offsetWidth >= this.containerEl.offsetHeight - 20) ? sizes.LANDSCAPE : sizes.PORTRAIT;
      this.setState({data, size});
      this.isFilterEnabled = this.props.isFilterEnabled && !data.instructionalVideoUrl;
    });
  }

  lastSliderSide;

  onSliderSideChange = (currSide) => {
    const isRightSide = (currSide === sides.RIGHT);
    var delay = 0;

    if (!this.lastSliderSide) {
      animate.set(this.refs.slider, {x: isRightSide ? '200%' : '-100%'});
      delay = 0.1;
    }
    this.lastSliderSide = currSide;

    animate.to(this.refs.slider, 0.25, {
      x: isRightSide ? '100%' : '0%',
      ease: BezierEasing(0.1, 0.98, 0.9, 0.26),
      delay: delay,
      overwrite: 'all'
    });

    animate.to(isRightSide ? this.refs.rightCtaContainer : this.refs.leftCtaContainer, 0.3, {autoAlpha: 1, delay: 0.1});
    animate.to(isRightSide ? this.refs.leftCtaContainer : this.refs.rightCtaContainer, 0.3, {autoAlpha: 0.8});
  };

  handleMouseMove = (e) => {
    if (!this.refs.slider) {
      return;
    }

    const mouseX = e.clientX - this.containerEl.getBoundingClientRect().left;
    const centerX = this.containerEl.offsetWidth / 2;
    const currSliderSide = (mouseX > centerX) ? sides.RIGHT : sides.LEFT;

    //const x = e.clientX / this.containerEl.offsetWidth * 30;
    //const y = e.clientY / this.containerEl.offsetHeight * 30;
    //console.log(x, y)
    //
    //animate.to(this.refs.image, 3, {x, y, ease: Expo.easeOut});

    if (currSliderSide !== this.lastSliderSide) {
      this.onSliderSideChange(currSliderSide);
    }
  };

  getImageCenterPos = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const containerCenterX = containerWidth * 0.5;
    const imageWidth = this.refs.image.offsetWidth;
    const imageOffset = parseInt(getComputedStyle(this.imageContainer).getPropertyValue('left'));
    const adjuster = (containerWidth - imageWidth) * 0.5;
    return (imageOffset + adjuster - containerCenterX);
  };

  handleMouseEnter = () => {
    this.context.eventBus.emit('mouseEnterTile', this);

    const filter = 'grayscale(100%)';
    const ctaItems = [this.refs.leftCtaIcon, this.refs.leftCtaText, this.refs.rightCtaIcon, this.refs.rightCtaText];

    animate.to(this.textContainer, 0.1, {autoAlpha: 0, overwrite: 'all'});
    animate.to(this.refs.imageLayer, 0.1, {x: 0});
    animate.to(this.imageContainer, 0.5, {
      autoAlpha: 0.1,
      x: this.getImageCenterPos(),
      delay: 0.1,
      ease: Expo.easeOut,
      overwrite: 'all'
    });
    animate.to(this.imageContainer, 0.5, {'-webkit-filter': filter, filter: filter, delay: 0.3, ease: Expo.easeOut});
    animate.staggerTo(ctaItems, 0.5, {autoAlpha: 1, y: 0, ease: Expo.easeOut, delay: 0.3, overwrite: 'all'}, 0.1);
  };

  handleMouseLeave = () => {
    const filter = 'grayscale(0%)';
    const ctaItems = [this.refs.rightCtaText, this.refs.rightCtaIcon, this.refs.leftCtaText, this.refs.leftCtaIcon];

    animate.staggerTo(ctaItems, 0.4, {autoAlpha: 0, y: 40, ease: Expo.easeInOut, overwrite: 'all'}, 0.1);
    animate.to(this.imageContainer, 0.5, {
        autoAlpha: 1,
        x: 0,
        '-webkit-filter': filter,
        filter: filter,
        ease: Expo.easeInOut,
        delay: 0.4,
        overwrite: 'all'
      })
      .then(() => {
        this.context.eventBus.emit('mouseLeaveTile', this);
      });

    animate.to(this.refs.slider, 0.25, {
      x: this.lastSliderSide === sides.LEFT ? '-100%' : '200%',
      ease: BezierEasing(0.1, 0.98, 0.9, 0.26),
      overwrite: 'all'
    });
    animate.to(this.textContainer, 0.05, {autoAlpha: 1, delay: 0.7, overwrite: 'all'});

    this.lastSliderSide = null;
  };

  animateInLayers = (index) => {
    const width = this.containerEl.offsetWidth;
    const height = this.containerEl.offsetHeight;
    const scaleX = (width + 30) / width;
    const scaleY = (height + 30) / height;

    const containerAlpha = this.isFilterEnabled ? 0.1 : 1;
    const containerScale = this.isFilterEnabled ? 0.9 : 1;
    const delay = (0.1 * index) + 0.3;
    const ease = Expo.easeOut;

    animate.set(this.containerEl, {autoAlpha: 0, scaleX: scaleX, scaleY: scaleY});
    animate.set(this.textContainer, {scale: 1.3, autoAlpha: 1, transformOrigin: 'top left'});
    animate.set(this.imageContainer, {scale: 1.6, autoAlpha: 1});

    return animate.all([
      animate.to(this.containerEl, 0.4, {autoAlpha: containerAlpha, scale: containerScale, delay: delay, ease: ease}),
      animate.to(this.textContainer, 0.8, {scale: 1, delay: delay, ease: ease}),
      animate.to(this.imageContainer, 1.2, {scale: 1, delay: delay, ease: ease})
    ])
  };

  animateInGridFillers = (fillers) => {
    const delay = 0.5;
    const ease = Expo.easeOut;

    animate.set(fillers, {autoAlpha: 0, scale: 1.15});

    return animate.all([
      animate.staggerTo(fillers, 0.5, {autoAlpha: 1, delay: delay}, 0.1),
      animate.staggerTo(fillers, 1, {scale: 1, delay: delay, ease: Expo.easeOut}, 0.1)
    ])
  };

  animateIn = (tileIndex, fillers) => {

    setTimeout(() => {
      return animate.all([
        this.animateInLayers(tileIndex),
        this.animateInGridFillers(fillers)
      ]).then(() => {
        console.log('wdd')
      })
    });
  };

  applyFilter = () => {
    return
    console.log('applyFilter')
    animate.to(this.containerEl, 0.3, {scale: 0.9, autoAlpha: 0.1, ease: Expo.easeOut});
    //this.context.eventBus.emit('disableParallax', this);
  };

  removeFilter = () => {
    return
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

    const isFiltered = this.props.isFilterEnabled;
    const slider = isFiltered ? null : (<div ref="slider" className={`slider`}></div>);

    const videoCopy = isFiltered ? 'Watch instructional video' : 'Watch';
    const videoUrl = isFiltered ? this.state.data.instructionalVideoUrl : this.state.data.narrativeVideoUrl;
    const leftCta = (
      <div ref="leftCtaContainer" className={`cta-container left`}>
        <Link className="cta" to={`${videoUrl}`}>
          <div ref="leftCtaIcon" className={`icon explore`} dangerouslySetInnerHTML={{ __html: IconWatch }}></div>
          <p ref="leftCtaText">{videoCopy}</p>
        </Link>
      </div>
    );

    const rightCta = isFiltered ? null : (
      <div ref="rightCtaContainer" className={`cta-container right`}>
        <Link className="cta" to={`${this.state.data.chapterUrl}`}>
          <div ref="rightCtaIcon" className={`icon explore`} dangerouslySetInnerHTML={{ __html: IconExplore }}></div>
          <p ref="rightCtaText">Explore</p>
        </Link>
      </div>
    );

    return (
      <div
        className={`grid-tile`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <div
          className={`parallax-layer background`}
          data-depth={bgDepth}
          data-vector={`0.6,-0.2`}>
          <div className={`noise`}></div>
        </div>

        <div
          className={`parallax-layer text`}
          data-depth={textDepth}
          data-vector={`-0.4, -0.4`}
        >
          <div ref="textContainer" className={`text-container`}>
            <div className={`title`}>{this.state.data.subtitle}</div>
            <div className={`subtitle`}>{this.state.data.title}</div>
          </div>
        </div>

        <div
          ref="imageLayer"
          className={`parallax-layer image`}
          data-depth={imageDepth}
          data-vector={`-0.5,0.5`}
        >
          <div ref="imageContainer" className={`image-container ${this.state.size}`}>
            <img ref="image" src={this.state.data.image}/>
          </div>
        </div>

        <div className={`overlay`}>
          {slider}
          {leftCta}
          {rightCta}
        </div>
      </div>
    );
  }

}
