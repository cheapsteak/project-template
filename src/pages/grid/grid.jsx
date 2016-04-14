import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import TransitionGroup from 'react-addons-transition-group';
import Layout890 from 'common/components/grid/layout/layout-890';
import Layout1060 from 'common/components/grid/layout/layout-1060';
import Layout1230 from 'common/components/grid/layout/layout-1230';
import Layout1400 from 'common/components/grid/layout/layout-1400';
import Layout1570 from 'common/components/grid/layout/layout-1570';
import Layout1740 from 'common/components/grid/layout/layout-1740';
import Layout1920 from 'common/components/grid/layout/layout-1920';
import GridMenu from 'common/components/grid/grid-menu';
import scrollbarSize from 'common/utils/scrollbar-size';
import Preload from 'inject-prefetch';
import chaptersData  from 'common/models/chapters-model';

const breakpoints = [890, 1060, 1230, 1400, 1570, 1740, 1920];

export default class GridPage extends React.Component {

  static propTypes = {
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {
    screenWidth: window.innerWidth,
    isFiltered: false,
    isMenuVisible: false,
    prevRoutePath: ''
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object,
    previousRoute: React.PropTypes.string
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.resize();

    this.context.eventBus.on('clickFilter', this.handleClickFilter);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillAppear(callback) {
    this.animateIn().then(() => callback && callback());
  }

  componentWillEnter(callback) {
    this.animateIn().then(() => callback && callback());
  }

  componentWillLeave(callback) {
    animate.set(this.containerEl, {zIndex: 999999});
    if (this.state.prevRoutePath.indexOf('instructional-videos') !== -1) {
      this.animateFromInstructionalVideo().then(() => callback && callback());
    } else {
      this.animateOut().then(() => callback && callback());
    }
  }

  componentWillUpdate() {
    var newPath = location.pathname.replace(CONFIG.basePath + '/', '');

    // animate out to instructional video
    if (this.state.prevRoutePath !== newPath && newPath.indexOf('instructional-videos') !== -1) {
      this.setState({prevRoutePath: newPath});
      this.animateToInstructionalVideo();
    }

    // when start experience from grid instructional video
    if (this.state.prevRoutePath.indexOf('instructional-videos') !== -1 && !this.context.previousRoute) {
      animate.set(this.refs.pageWrapper, {x: '-100%'});
      animate.set(this.refs.menu.containerEl, {autoAlpha: 0, y: '-130%'});
    }

    // animate in after showing instructional video
    if (this.state.prevRoutePath.indexOf('instructional-videos') !== -1 && newPath === 'grid') {
      this.setState({prevRoutePath: newPath});

      this.resetContent();
      this.refs.grid.animateIn();
      this.animateIn();
    }
  }

  componentWillUnmount() {
    this.context.eventBus.off('clickFilter', this.handleClickFilter);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  resetContent = () => {
    var gridElements = document.querySelectorAll('.grid-page .grid-item');
    const menuHeight = this.refs.menu.containerEl.offsetHeight * 1.25;

    animate.set(gridElements, {autoAlpha: 1, scale: 1});
    animate.set([this.refs.pageWrapper], {autoAlpha: 1, overflowY: 'scroll'});
    animate.set([this.refs.pageWrapper, this.refs.menu.containerEl, this.refs.grid.containerEl], {x: '0%'});
    animate.set(this.refs.menu.containerEl, {autoAlpha: 1});

    animate.set(this.refs.grid.containerEl, {autoAlpha: 0});
    animate.set(this.refs.grid.containerEl, {autoAlpha: 1, delay: 0.3});
    animate.set(this.refs.grid.containerEl, {y: -menuHeight});
  };

  setGridPosY = () => {
    if (!this.state.isMenuVisible) {
      const menuHeight = this.refs.menu.containerEl.offsetHeight * 1.25;
      animate.set(this.refs.grid.containerEl, {y: -menuHeight});
    }
  };

  resize = () => {
    this.handleWindowResize();
  };

  preloadNextContent = () => {
    var data = chaptersData.getAll();
    data = data.map(chapter => chapter.hero.poster);
    Preload(data);
  };

  animateIn = () => {
    this.setState({isMenuVisible: true});

    const ease = ViniEaseOut;
    const duration = 0.6;
    const delay = 1.1;

    return animate.all([
        animate.to(this.refs.grid.containerEl, duration, {ease: ViniEaseOut, delay, y: '0%'}),
        this.refs.menu.animateIn(duration - 0.1, delay, ease)
      ])
      .then(()=> this.preloadNextContent())
  };

  animateOutContent = () => {
    const ease = Expo.easeInOut;

    var tiles = document.querySelectorAll('.grid-page .grid-tile');
    var fillers = document.querySelectorAll('.grid-page .filler');
    tiles = Array.prototype.slice.call(tiles);
    fillers = Array.prototype.slice.call(fillers);

    const gridElements = tiles.concat(fillers);
    gridElements.sort(() => 0.5 - Math.random()); // shuffle

    animate.staggerTo(tiles, 1.4, {scale: 0.6, ease}, 0.1);
    animate.staggerTo(tiles, 1, {autoAlpha: 0, ease: Linear.easeNone}, 0.1);

    animate.staggerTo(fillers, 1.1, {scale: 0.6, ease, delay: 0.15}, 0.1);
    animate.staggerTo(fillers, 0.7, {autoAlpha: 0, ease: Linear.easeNone, delay: 0.15}, 0.1);

    this.refs.menu.animateOut();

    this.setState({isMenuVisible: false});
  };

  animateOut = () => {
    const duration = 1.1;
    const ease = SereneEaseInOut;
    const delay = 0.5;

    this.animateOutContent();

    return animate.all([
      animate.to(this.containerEl, duration, {x: '-100%', ease, delay}),
      animate.to(this.refs.pageWrapper, duration, {x: '100%', ease, delay})
    ])
  };

  animateToInstructionalVideo = () => {
    const duration = 1.1;
    const ease = SereneEaseInOut;
    const delay = 0.5;

    this.animateOutContent();

    return animate.all([
      animate.set(this.containerEl, {overflow: 'hidden', delay: 0.5}),
      animate.set(this.refs.pageWrapper, {overflow: 'hidden', paddingRight: scrollbarSize.get(), delay: 0.5}),
      animate.to(this.refs.grid.containerEl, duration, {x: '100%', ease, delay}),
      animate.to(this.refs.menu.containerEl, duration, {x: '100%', ease, delay}),
      animate.to(this.refs.pageWrapper, duration, {x: '-100%', ease, delay})
    ])
  };

  animateFromInstructionalVideo = () => {
    const ease = ViniEaseOut;
    const duration = 0.6;
    const delay = 1.1;

    const videoContainer = this.videoContainer.children[0];
    animate.to(videoContainer, 1, {autoAlpha: 0});

    return animate.all([
      animate.to(this.containerEl, duration, {x: '-100%', ease, delay}),
      animate.to(this.containerEl, duration, {autoAlpha: 0.6, delay}),
      animate.to(videoContainer, duration, {x: '100%', ease, delay})
    ])
  };

  handleClickFilter = () => {
    const isFiltered = !this.state.isFiltered;
    this.setState({isFiltered});
  };

  handleWindowResize = () => {
    const screenWidth = window.innerWidth;
    this.setState({screenWidth});
    this.setGridPosY();
  };

  render() {
    var currLayout;
    const windowWidth = this.state.screenWidth;
    const isFiltered = this.state.isFiltered;
    const isMenuVisible = this.state.isMenuVisible;

    if (windowWidth <= breakpoints[0]) {
      currLayout = <Layout890 isFiltered={isFiltered} isShortDelay={isMenuVisible}/>
    } else if (windowWidth <= breakpoints[1]) {
      currLayout = <Layout1060 isFiltered={isFiltered} isShortDelay={isMenuVisible}/>
    } else if (windowWidth <= breakpoints[2]) {
      currLayout = <Layout1230 isFiltered={isFiltered} isShortDelay={isMenuVisible}/>
    } else if (windowWidth <= breakpoints[3]) {
      currLayout = <Layout1400 isFiltered={isFiltered} isShortDelay={isMenuVisible}/>
    } else if (windowWidth <= breakpoints[4]) {
      currLayout = <Layout1570 isFiltered={isFiltered} isShortDelay={isMenuVisible}/>
    } else if (windowWidth <= breakpoints[5]) {
      currLayout = <Layout1740 isFiltered={isFiltered} isShortDelay={isMenuVisible}/>
    } else {
      currLayout = <Layout1920 isFiltered={isFiltered} isShortDelay={isMenuVisible}/>
    }

    return (
      <div className={`grid-page ${this.props.className}`}>

        <TransitionGroup
          component="div"
          className="route-content-wrapper"
          ref={node => this.videoContainer = findDOMNode(node)}
        >
          { React.cloneElement(this.props.children || <div />, {
            key: this.props.params.slug,
            slug: this.props.params.slug
          })}
        </TransitionGroup>

        <div ref="pageWrapper" className={`page-wrapper`}>
          <GridMenu ref="menu"/>
          {React.cloneElement(currLayout || <div />, {ref: 'grid'})}
        </div>

      </div>
    );
  }
}
