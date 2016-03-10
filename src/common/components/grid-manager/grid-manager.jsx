import React from 'react';
import { findDOMNode } from 'react-dom';
import Parallax from '../../utils/parallax';
import Layout890 from '../grid/layout-890';
import Layout1060 from '../grid/layout-1060';
import Layout1230 from '../grid/layout-1230';
import Layout1400 from '../grid/layout-1400';
import Layout1570 from '../grid/layout-1570';
import Layout1740 from '../grid/layout-1740';
import Layout1920 from '../grid/layout-1920';

const breakpoints = [890, 1060, 1230, 1400, 1570, 1740, 1920];

export default class GridManager extends React.Component {

  state = {
    screenWidth: window.innerWidth
  };

  timer = null;

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.prevGrid = this.refs.grid;

    this.parallax = Parallax(this.refs.scene, {
      mouseProximityMode: true,
      limitX: 40,
      limitY: 40
    });

    this.containerEl.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleWindowResize);

    this.context.eventBus.on('mouseEnterTile', this.handleMouseEnterTile);
    this.context.eventBus.on('mouseLeaveTile', this.handleMouseLeaveTile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.context.eventBus.off('mouseOverTile', this.handleMouseEnterTile);
    this.context.eventBus.off('mouseOutTile', this.handleMouseLeaveTile);
    this.parallax.destroy();
  }

  handleMouseEnterTile = (tileComponent) => {
    this.parallax.disableLayers(tileComponent.containerEl.querySelectorAll('.parallax-layer'));
  };

  handleMouseLeaveTile = (tileComponent) => {
    this.parallax.enableLayers(tileComponent.containerEl.querySelectorAll('.parallax-layer'));
  };

  handleScroll = () => {
    this.parallax.disable();
    this.parallax.reset();

    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(()=> {
      this.parallax.enable();
    }, 150);
  };

  handleWindowResize = () => {
    const screenWidth = window.innerWidth;
    this.setState({screenWidth});

    // update parallax layers only on grid layout switch
    if (this.prevGrid !== this.refs.grid) {
      this.prevGrid = this.refs.grid;
      this.parallax.updateLayers();
    }
  };

  render() {
    var currLayout;
    var windowWidth = this.state.screenWidth;

    if (windowWidth <= breakpoints[0]) {
      currLayout = <Layout890 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[1]) {
      currLayout = <Layout1060 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[2]) {
      currLayout = <Layout1230 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[3]) {
      currLayout = <Layout1400 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[4]) {
      currLayout = <Layout1570 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[5]) {
      currLayout = <Layout1740 screenWidth={windowWidth}/>;
    } else {
      currLayout = <Layout1920 screenWidth={windowWidth}/>;
    }

    return (
      <div className={`grid-manager`}>
        <div ref="scene" className={`grid-parallax-scene`}>
          {React.cloneElement(currLayout || <div />, {ref: 'grid'})}
        </div>
      </div>
    );
  }
}
