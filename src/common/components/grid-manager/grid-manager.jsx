import React from 'react';
import { findDOMNode } from 'react-dom';
import Grid890 from '../grid/layout-890';
import Grid1060 from '../grid/layout-1060';
import Grid1230 from '../grid/layout-1230';
import Grid1400 from '../grid/layout-1400';
import Parallax from '../../utils/parallax';

const breakpoints = [890, 1060, 1230, 1400];

export default class GridManager extends React.Component {

  state = {
    screenWidth: window.innerWidth
  };

  timer = null;

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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.parallax.destroy();
  }

  handleScroll = () => {
    this.parallax.disable();
    this.parallax.reset();

    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(()=> {
      this.parallax.enable();
      //console.log('scrolling stopped')
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
      currLayout = <Grid890 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[1]) {
      currLayout = <Grid1060 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[2]) {
      currLayout = <Grid1230 screenWidth={windowWidth}/>;
    } else if (windowWidth <= breakpoints[3]) {
      currLayout = <Grid1400 screenWidth={windowWidth}/>;
    } else {
      currLayout = null;
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
