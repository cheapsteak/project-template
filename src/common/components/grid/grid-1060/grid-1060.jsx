import React from 'react';
import GridBase from '../grid.jsx';

export default class Grid890 extends GridBase {
  constructor(props) {
    super(props);
  }

  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={`grid grid-1060 ${this.state.status}`}>

        <div className={`grid-item first-row width-2 right-padding`} style={{height: this.state.baseHeight}}>
          <div className={`nested-bar-width-100-height-33 red`}></div>
          <div className={`nested-cube-height-66 top-margin grey`}></div>
        </div>
        <div className={`grid-item first-row width-3 height-full orange`} style={{height: this.state.baseHeight}}></div>

        <div className={`grid-item width-3`} style={{height: this.state.twoThirdHeight}}>
          <div className={`full-size light-blue`}></div>
        </div>
        <div className={`grid-item width-2 left-padding`} style={{height: this.state.twoThirdHeight}}>
          <div className={`nested-cube-50 red`}></div>
          <div className={`nested-cube-50 left-margin red`}></div>
          <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item width-2 right-padding`} style={{height: this.state.baseHeight}}>
          <div className={`nested-bar-width-100-height-33 dark-blue`}></div>
          <div className={`nested-bar-width-50-height-66 top-margin red`}></div>
          <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
          <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
        </div>
        <div className={`grid-item width-3 light-blue`} style={{height: this.state.baseHeight}}></div>

        <div className={`grid-item width-3 height-2 light-blue`} style={{height: this.state.twoThirdHeight}}></div>
        <div className={`grid-item width-2 height-2 left-padding `} style={{height: this.state.twoThirdHeight}}>
          <div className={`full-size grey`}></div>
        </div>

        <div className={`grid-item width-3 grey`} style={{height: this.state.baseHeight}}></div>
        <div className={`grid-item width-2 left-padding`} style={{height: this.state.twoThirdHeight}}>
          <div className={`nested-cube-50 dark-blue`}></div>
          <div className={`nested-cube-50 left-margin dark-blue`}></div>
          <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
        </div>

        <div className={`grid-item width-3`} style={{height: this.state.twoThirdHeight}}>
          <div className={`nested-bar-width-33-height-100 red`}></div>
          <div className={`nested-cube-width-66 left-margin grey`}></div>
        </div>
        <div className={`grid-item width-2 left-padding`} style={{height: this.state.baseHeight}}>
          <div className={`full-size grey`}></div>
        </div>

      </div>
    );
  }
}
