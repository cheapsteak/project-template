import React from 'react';
import {findDOMNode} from 'react-dom';
import model from '../../../../data/grid';
import animate from 'gsap-promise';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import {Link} from 'react-router';

const sizes = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};

export default class GridTile extends React.Component {

  static propTypes = {
    chapter: React.PropTypes.string,
    isFiltered: React.PropTypes.bool
  };

  state = {
    data: {},
    size: sizes.LANDSCAPE
  };

  componentWillReceiveProps(nextProps) {
    const hasInstrVideo = model.getDataByChapterId(this.props.chapter).instructionalVideoUrl;
    if (nextProps.isFiltered !== this.lastFilteredState && !hasInstrVideo) {
      nextProps.isFiltered ? this.applyFilter() : this.removeFilter();
      this.lastFilteredState = nextProps.isFiltered;
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.textContainer = this.refs.textContainer;
    this.imageContainer = this.refs.imageContainer;

    animate.set(this.containerEl, {autoAlpha: 0});

    setTimeout(() => {
      const data = model.getDataByChapterId(this.props.chapter);
      const size = (this.containerEl.offsetWidth >= this.containerEl.offsetHeight - 20) ? sizes.LANDSCAPE : sizes.PORTRAIT;
      this.setState({data, size});
    });
  }

  handleMouseMove = (e) => {
    if (this.filterApplied) {
      return;
    }

    const mouseX = e.clientX - this.containerEl.getBoundingClientRect().left;
    const mouseY = e.clientY - this.containerEl.getBoundingClientRect().top;
    const centerX = this.containerEl.offsetWidth / 2;
    const centerY = this.containerEl.offsetHeight / 2;

    const x = (mouseX - centerX) * 0.12;
    const y = (mouseY - centerY) * 0.1;

    animate.to(this.refs.image, 3, {x, y, ease: Expo.easeOut, overwrite: 'all'});
  };

  handleMouseEnter = () => {
    if (this.filterApplied) {
      return;
    }

    const pos = (this.containerEl.offsetWidth - this.refs.image.offsetWidth) * 0.5;
    const ctaItems = [this.refs.ctaIcon, this.refs.ctaText];

    return animate.all([
      animate.to(this.textContainer, 0.1, {autoAlpha: 0, overwrite: 'all'}),
      animate.to(this.imageContainer, 0.5, {
        autoAlpha: 0.1,
        left: pos,
        delay: 0.1,
        ease: Expo.easeOut,
        overwrite: 'all'
      }),
      animate.staggerTo(ctaItems, 0.5, {autoAlpha: 1, y: 0, ease: Expo.easeOut, delay: 0.3, overwrite: 'all'}, 0.1)
    ]);
  };

  handleMouseLeave = () => {
    if (this.filterApplied) {
      return;
    }

    const ctaItems = [this.refs.ctaText, this.refs.ctaIcon];
    const pos = this.containerEl.offsetWidth * (this.state.size === sizes.LANDSCAPE ? 0.3 : 0.1);

    return animate.all([
      animate.staggerTo(ctaItems, 0.4, {autoAlpha: 0, y: 40, ease: Expo.easeInOut, overwrite: 'all'}, 0.1),
      animate.to(this.imageContainer, 0.5, {
        autoAlpha: 1,
        left: pos,
        ease: Expo.easeInOut,
        delay: 0.2,
        overwrite: 'all'
      }),
      animate.to(this.textContainer, 0.1, {autoAlpha: 1, delay: 0.4, overwrite: 'all'})
    ]);
  };

  animateIn = (delay) => {
    const width = this.containerEl.offsetWidth;
    const height = this.containerEl.offsetHeight;
    const scaleX = (width + 30) / width;
    const scaleY = (height + 30) / height;

    const ease = Expo.easeOut;

    animate.set(this.containerEl, {scaleX: scaleX, scaleY: scaleY});
    animate.set(this.textContainer, {scale: 1.3, transformOrigin: 'top left'});
    animate.set(this.imageContainer, {scale: 1.6});

    return animate.all([
      animate.to(this.containerEl, 1, {autoAlpha: 1, scale: 1, delay: delay, ease: ease}),
      animate.to(this.textContainer, 1.5, {scale: 1, delay: delay, ease: ease}),
      animate.to(this.imageContainer, 1.7, {scale: 1, delay: delay, ease: ease})
    ])
  };

  applyFilter = () => {
    this.filterApplied = true;
    return animate.to(this.refs.contentWrapper, 0.3, {
      scale: 0.9,
      autoAlpha: 0.1,
      pointerEvents: 'none',
      ease: Expo.easeOut
    });
  };

  removeFilter = () => {
    if (this.filterApplied) {
      this.filterApplied = false;
      return animate.to(this.refs.contentWrapper, 0.3, {
        scale: 1,
        autoAlpha: 1,
        pointerEvents: 'auto',
        ease: Expo.easeOut
      });
    }
  };

  render() {
    const isFiltered = this.props.isFiltered;
    const icon = isFiltered ? IconWatch : IconExplore;
    const copy = isFiltered ? 'See Inside the Classroom' : 'Explore';
    const url = isFiltered ? this.state.data.instructionalVideoUrl : this.state.data.chapterUrl;

    return (
      <div
        className={`grid-tile`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <div ref="contentWrapper" className={`content-wrapper`}>
          <div className={`noise`}></div>

          <div ref="textContainer" className={`text-container`}>
            <div className={`subtitle`}>{this.state.data.subtitle}</div>
            <div className={`title`}>{this.state.data.title}</div>
          </div>

          <div ref="imageContainer" className={`image-container ${this.state.size}`}>
            <img ref="image" src={this.state.data.image}/>
          </div>

          <Link to={`${url}`}>
            <div className="cta">
              <div ref="ctaIcon" className={`icon explore`} dangerouslySetInnerHTML={{ __html: icon }}></div>
              <p ref="ctaText">{copy}</p>
            </div>
          </Link>

        </div>
      </div>
    );
  }

}
