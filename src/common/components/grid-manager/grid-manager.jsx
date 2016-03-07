import React from 'react';
import { findDOMNode } from 'react-dom';
import Grid890 from '../grid/layout-890';
import Grid1060 from '../grid/layout-1060';


export default class GridManager extends React.Component {

  state = {
    screenWidth: 0,
    scrollTop: 0,
    mouseCoordinates: {x: 0, y: 0}
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.parallax = new Parallax(this.refs.scene, {
      //limitX: 30,
      //limitY: 20,
      //scalarX: 4,
      //scalarY: 3,
    });

    this.containerEl.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleWindowResize);
    //this.containerEl.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.parallax = null;
    this.containerEl.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleWindowResize);
    //this.containerEl.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    //this.parallax.disable();
    const scrollTop = this.containerEl.scrollTop;
    this.setState({scrollTop});
  };

  handleWindowResize = () => {
    this.setState({screenWidth: window.innerWidth});
    this.parallax.updateLayers();
  };

  handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const mouseCoordinates = {x, y};
    this.setState({mouseCoordinates});
    this.parallax.updateLayers();
  };

  render() {
    var currLayout;
    var windowWidth = this.state.screenWidth || window.innerWidth;
    var scrollTop = this.state.scrollTop;

    if (windowWidth <= 890) {
      currLayout =
        <Grid890
          screenWidth={windowWidth}
          scrollTop={scrollTop}
          mouseCoordinates={this.state.mouseCoordinates}
        />;
    } else if (windowWidth <= 1060) {
      currLayout =
        <Grid1060
          screenWidth={windowWidth}
          scrollTop={scrollTop}
          mouseCoordinates={this.state.mouseCoordinates}
        />;
    } else {
      currLayout =
        <Grid1060
          screenWidth={windowWidth}
          scrollTop={scrollTop}
          mouseCoordinates={this.state.mouseCoordinates}
        />;
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
