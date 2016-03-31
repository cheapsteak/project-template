import React from 'react';
import {findDOMNode} from 'react-dom';
import gridModel from '../../../models/grid-model';
import chaptersModel from '../../../models/chapters-model';
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
    slug: React.PropTypes.string,
    isFiltered: React.PropTypes.bool,
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {
    data: {},
    size: sizes.LANDSCAPE
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.data) return;

    const hasInstrVideo = this.state.data.instructionalVideos[0];
    if (nextProps.isFiltered !== this.lastFilteredState && !hasInstrVideo) {
      nextProps.isFiltered ? this.applyFilter() : this.removeFilter();
      this.lastFilteredState = nextProps.isFiltered;
    }
  }

  componentWillMount() {
    const slug = this.props.slug;
    const gridData = Object.assign({}, gridModel.get(slug));
    const chapterData = Object.assign({}, chaptersModel.get(slug));
    this.setState({data: Object.assign(gridData, chapterData)});
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.textContainer = this.refs.textContainer;
    this.imageContainer = this.refs.imageContainer;

    animate.set(this.containerEl, {autoAlpha: 0});

    setTimeout(() => {
      const size = (this.containerEl.offsetWidth >= this.containerEl.offsetHeight - 20) ? sizes.LANDSCAPE : sizes.PORTRAIT;
      this.setState({size});
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
    animate.to(this.refs.noise, 5, {
      x: Math.min(x * 0.5, 70),
      y: Math.min(y * 0.5, 70),
      ease: Expo.easeOut,
      overwrite: 'all'
    });
  };

  handleMouseEnter = () => {
    if (this.filterApplied) {
      return;
    }

    const pos = (this.containerEl.offsetWidth - this.refs.image.offsetWidth) * 0.5;
    var ctaItems = [this.refs.ctaIcon0, this.refs.ctaText0];

    if (this.state.data.routes.instructionalVideos.length > 1 && this.props.isFiltered) {
      ctaItems = ctaItems.concat([this.refs.ctaIcon1, this.refs.ctaText1]);
    }

    audio.play('button-rollover');

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

    const pos = this.containerEl.offsetWidth * (this.state.size === sizes.LANDSCAPE ? 0.3 : 0.1);
    var ctaItems = [this.refs.ctaText0, this.refs.ctaIcon0];
    var delay = 0.2;

    if (this.state.data.routes.instructionalVideos.length > 1 && this.props.isFiltered) {
      ctaItems = ctaItems.concat([this.refs.ctaText1, this.refs.ctaIcon1]);
      delay = 0.4;
    }

    return animate.all([
      animate.staggerTo(ctaItems, 0.4, {autoAlpha: 0, y: 40, ease: Expo.easeInOut, overwrite: 'all'}, 0.1),
      animate.to(this.imageContainer, 0.5, {
        autoAlpha: 1,
        left: pos,
        ease: Expo.easeInOut,
        delay: delay,
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

    animate.set(this.containerEl, {autoAlpha: 0, scaleX: scaleX, scaleY: scaleY});
    animate.set(this.textContainer, {scale: 1.3, transformOrigin: 'top left'});
    animate.set(this.imageContainer, {scale: 1.6});

    return animate.all([
      animate.to(this.containerEl, 1, {autoAlpha: 1, scale: 1, delay: delay, ease: ease}),
      animate.to(this.textContainer, 1.5, {scale: 1, delay: delay, ease: ease}),
      animate.to(this.imageContainer, 2, {scale: 1, delay: delay, ease: ease})
    ])
  };

  applyFilter = () => {
    this.filterApplied = true;

    if (this.state.data.routes.instructionalVideos.length > 1) {
      const ctaItems = ctaItems.concat([this.refs.ctaText1, this.refs.ctaIcon1]);
    }

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
    if (!this.state.data) return <div/>;

    const isFiltered = this.props.isFiltered;
    const icon = isFiltered ? IconWatch : IconExplore;
    const copy = isFiltered ? 'In Action' : 'Discover';
    var links = isFiltered ? this.state.data.routes.instructionalVideos : 'chapters/' + this.state.data.slug;

    if (!(links instanceof Array)) links = [links];

    return (
      <div
        className={`grid-tile ${this.props.className}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <div ref="contentWrapper" className={`content-wrapper`}>
          <div ref="noise" className={`noise`}></div>

          <div ref="textContainer" className={`text-container`}>
            {/*<div className={`subtitle`}>Chapter</div>*/}
            <div className={`title`}>{this.state.data.title}</div>
          </div>

          <div ref="imageContainer" className={`image-container ${this.state.size}`}>
            <img ref="image" src={this.state.data.image}/>
          </div>

          {
            links.map((link, index) => {
              const width = links.length > 1 ? 'half-width' : 'full-width';
              return (
                <Link className={`${width}`} to={`${link}`} key={index}>
                  <div className={`cta`}>
                    <div
                      ref={`ctaIcon${index}`}
                      className={`icon ${isFiltered ? 'watch' : 'explore'}`}
                      dangerouslySetInnerHTML={{ __html: icon }}
                    ></div>
                    <p ref={`ctaText${index}`}>
                      {copy}:
                      <br/>
                      {(isFiltered && this.state.data.instructionalVideosCtas && this.state.data.instructionalVideosCtas[index]) ||
                      this.state.data.title}
                    </p>
                  </div>
                </Link>
              )
            })
          }

        </div>
      </div>
    );
  }

}
