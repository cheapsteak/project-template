import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import Layout890 from './grid/layout-890';
import Layout1060 from './grid/layout-1060';
import Layout1230 from './grid/layout-1230';
import Layout1400 from './grid/layout-1400';
import Layout1570 from './grid/layout-1570';
import Layout1740 from './grid/layout-1740';
import Layout1920 from './grid/layout-1920';
import GridMenu from './grid-menu/grid-menu';

const breakpoints = [890, 1060, 1230, 1400, 1570, 1740, 1920];

export default class GridManager extends React.Component {

  state = {
    screenWidth: window.innerWidth,
    isFiltered: false
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    animate.to(this.containerEl, 0.6, {ease: Expo.easeOut, delay: 1.2, paddingTop: 120});
    this.refs.menu.animateIn(0.6, 1.15);

    window.addEventListener('resize', this.handleWindowResize);
    this.context.eventBus.on('clickFilter', this.handleClickFilter);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleClickFilter = () => {
    const isFiltered = !this.state.isFiltered;
    this.setState({isFiltered});
  };

  handleWindowResize = () => {
    const screenWidth = window.innerWidth;
    this.setState({screenWidth});
  };

  render() {
    var currLayout;
    const windowWidth = this.state.screenWidth;
    const isFiltered = this.state.isFiltered;

    if (windowWidth <= breakpoints[0]) {
      currLayout = <Layout890 screenWidth={windowWidth} isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[1]) {
      currLayout = <Layout1060 screenWidth={windowWidth} isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[2]) {
      currLayout = <Layout1230 screenWidth={windowWidth} isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[3]) {
      currLayout = <Layout1400 screenWidth={windowWidth} isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[4]) {
      currLayout = <Layout1570 screenWidth={windowWidth} isFiltered={isFiltered}/>
    } else if (windowWidth <= breakpoints[5]) {
      currLayout = <Layout1740 screenWidth={windowWidth} isFiltered={isFiltered}/>
    } else {
      currLayout = <Layout1920 screenWidth={windowWidth} isFiltered={isFiltered}/>
    }

    return (
      <div className={`grid-manager`}>
        {React.cloneElement(currLayout || <div />, {ref: 'grid'})}
        <GridMenu ref="menu"/>
      </div>
    );
  }
}
