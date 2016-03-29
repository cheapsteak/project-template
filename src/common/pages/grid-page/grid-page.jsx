import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import Layout890 from '../../components/grid/layout/layout-890';
import Layout1060 from '../../components/grid/layout/layout-1060';
import Layout1230 from '../../components/grid/layout/layout-1230';
import Layout1400 from '../../components/grid/layout/layout-1400';
import Layout1570 from '../../components/grid/layout/layout-1570';
import Layout1740 from '../../components/grid/layout/layout-1740';
import Layout1920 from '../../components/grid/layout/layout-1920';
import GridMenu from '../../components/grid/grid-menu';

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
    isFiltered: false
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
    this.animateIn(callback);
  }

  componentWillEnter(callback) {
    this.animateIn(callback);
  }

  componentWillLeave(callback) {
    this.animateOut(callback);
  }

  componentWillUnmount() {
    this.context.eventBus.off('clickFilter', this.handleClickFilter);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  resize = () => {
    this.handleWindowResize();
  };

  animateIn = (callback) => {
    return animate.all([
        animate.to(this.containerEl, 0.6, {ease: Expo.easeOut, delay: 1.7, paddingTop: this.menuHeight + 40}),
        this.refs.menu.animateIn(0.5, 1.7, Expo.easeOut)
      ])
      .then(() => {
        this.isMenuAnimated = true;
        callback && callback()
      });
  };

  animateOut = (callback) => {
    return animate.all([
        animate.to(this.containerEl, 0, {autoAlpha: 0})
      ])
      .then(() => {
        callback && callback()
      });
  };

  handleClickFilter = () => {
    const isFiltered = !this.state.isFiltered;
    this.setState({isFiltered});
  };

  handleWindowResize = () => {
    const screenWidth = window.innerWidth;
    this.setState({screenWidth});

    this.menuHeight = this.refs.menu.containerEl.offsetHeight;
    if (this.isMenuAnimated) animate.set(this.containerEl, {paddingTop: this.menuHeight + 40});
  };

  render() {
    var currLayout;
    const windowWidth = this.state.screenWidth;
    const isFiltered = this.state.isFiltered;

    if (windowWidth <= breakpoints[0]) {
      currLayout = <Layout890 isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[1]) {
      currLayout = <Layout1060 isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[2]) {
      currLayout = <Layout1230 isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[3]) {
      currLayout = <Layout1400 isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[4]) {
      currLayout = <Layout1570 isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[5]) {
      currLayout = <Layout1740 isFiltered={isFiltered}/>
    } else {
      currLayout = <Layout1920 isFiltered={isFiltered}/>
    }

    return (
      <div className={`grid-page ${this.props.className}`}>
        {React.cloneElement(currLayout || <div />, {ref: 'grid'})}
        <GridMenu ref="menu"/>
      </div>
    );
  }
}
