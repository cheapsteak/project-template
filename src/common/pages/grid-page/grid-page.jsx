import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import TransitionGroup from 'react-addons-transition-group';
import Layout890 from '../../components/grid/layout/layout-890';
import Layout1060 from '../../components/grid/layout/layout-1060';
import Layout1230 from '../../components/grid/layout/layout-1230';
import Layout1400 from '../../components/grid/layout/layout-1400';
import Layout1570 from '../../components/grid/layout/layout-1570';
import Layout1740 from '../../components/grid/layout/layout-1740';
import Layout1920 from '../../components/grid/layout/layout-1920';
import GridMenu from '../../components/grid/grid-menu';
import scrollbarSize from 'common/utils/scrollbar-size';

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
    isMenuAnimated: false
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
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
    this.animateOut().then(() => callback && callback());
  }

  componentWillUnmount() {
    this.context.eventBus.off('clickFilter', this.handleClickFilter);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  setGridPosY = () => {
    if (!this.state.isMenuAnimated) {
      const menuHeight = this.refs.menu.containerEl.offsetHeight * 1.25;
      animate.set(this.refs.grid.containerEl, {y: -menuHeight});
    }
  };

  resize = () => {
    this.handleWindowResize();
  };

  animateIn = () => {
    this.setState({isMenuAnimated: true});

    const ease = Expo.easeOut;
    const duration = 0.6;
    const delay = 1.5;

    return animate.all([
      animate.to(this.refs.grid.containerEl, duration, {ease, delay, y: '0%'}),
      this.refs.menu.animateIn(duration, delay, ease)
    ])
  };

  animateOut = () => {
    const duration = 1;
    const ease = Expo.easeOut;

    animate.set(this.containerEl, {overflow: 'hidden'});
    animate.set(this.refs.pageWrapper, {overflow: 'hidden', paddingRight: scrollbarSize.get()});

    return animate.all([
      animate.to(this.containerEl, duration, {x: '-100%', ease: ease}),
      animate.to(this.refs.pageWrapper, duration, {x: '100%', autoAlpha: 0, ease: ease})
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
    const isMenuAnimated = this.state.isMenuAnimated;

    if (windowWidth <= breakpoints[0]) {
      currLayout = <Layout890 isFiltered={isFiltered} isShortDelay={isMenuAnimated}/>
    } else if (windowWidth <= breakpoints[1]) {
      currLayout = <Layout1060 isFiltered={isFiltered} isShortDelay={isMenuAnimated}/>
    } else if (windowWidth <= breakpoints[2]) {
      currLayout = <Layout1230 isFiltered={isFiltered} isShortDelay={isMenuAnimated}/>
    } else if (windowWidth <= breakpoints[3]) {
      currLayout = <Layout1400 isFiltered={isFiltered} isShortDelay={isMenuAnimated}/>
    } else if (windowWidth <= breakpoints[4]) {
      currLayout = <Layout1570 isFiltered={isFiltered} isShortDelay={isMenuAnimated}/>
    } else if (windowWidth <= breakpoints[5]) {
      currLayout = <Layout1740 isFiltered={isFiltered} isShortDelay={isMenuAnimated}/>
    } else {
      currLayout = <Layout1920 isFiltered={isFiltered} isShortDelay={isMenuAnimated}/>
    }

    return (
      <div className={`grid-page ${this.props.className}`}>
        <div ref="pageWrapper" className={`page-wrapper`}>
          <GridMenu ref="menu"/>
          {React.cloneElement(currLayout || <div />, {ref: 'grid'})}
        </div>
        <TransitionGroup
          component="div"
          className="route-content-wrapper"
        >
          { React.cloneElement(this.props.children || <div />, {key: this.props.params.slug})}
        </TransitionGroup>
      </div>
    );
  }
}
