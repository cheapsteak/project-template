import React from 'react';
import { findDOMNode } from 'react-dom';
import Grid from '../grid.jsx';

const gridItemsMargin = 20;

export default class Grid890 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      baseHeight: 0,
      twoThirdHeight: 0
    }
  }

  static propTypes = {
    screenWidth: React.PropTypes.number.isRequired
  };

  componentWillReceiveProps(newProps) {
    if (newProps.screenWidth !== this.screenWidth) {
      this.calculateSizes();
      this.screenWidth = newProps.screenWidth;
    }
  }

  calculateSizes = () => {
    const containerWidth = this.containerEl.offsetWidth;
    const baseHeight = containerWidth * 0.6;
    const twoThirdHeight = containerWidth * 0.4 - gridItemsMargin;

    this.setState({baseHeight, twoThirdHeight});
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.calculateSizes();
  }

  render() {
    const baseHeight = this.state.baseHeight;
    const twoThirdHeight = this.state.twoThirdHeight;

    return (
      <div className={`grid grid-890`}>
        <Grid>
          <div>

            <div className={`grid-item first-row width-2 right-padding`} style={{height: baseHeight}}>
              <div className={`nested-bar-width-100-height-33 red`}></div>
              <div className={`nested-cube-height-66 top-margin grey`}></div>
            </div>
            <div className={`grid-item first-row width-3 height-full orange`} style={{height: baseHeight}}></div>

            <div className={`grid-item width-3`} style={{height: twoThirdHeight}}>
              <div className={`full-size light-blue`}></div>
            </div>
            <div className={`grid-item width-2 left-padding`} style={{height: twoThirdHeight}}>
              <div className={`nested-cube-50 red`}></div>
              <div className={`nested-cube-50 left-margin red`}></div>
              <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
            </div>

            <div className={`grid-item width-2 right-padding`} style={{height: baseHeight}}>
              <div className={`nested-bar-width-100-height-33 dark-blue`}></div>
              <div className={`nested-bar-width-50-height-66 top-margin red`}></div>
              <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
              <div className={`nested-cube-33 top-margin left-margin dark-blue`}></div>
            </div>
            <div className={`grid-item width-3 light-blue`} style={{height: baseHeight}}></div>

            <div className={`grid-item width-3 height-2 light-blue`} style={{height: twoThirdHeight}}></div>
            <div className={`grid-item width-2 height-2 left-padding `} style={{height: twoThirdHeight}}>
              <div className={`full-size grey`}></div>
            </div>

            <div className={`grid-item width-3 grey`} style={{height: baseHeight}}></div>
            <div className={`grid-item width-2 left-padding`} style={{height: twoThirdHeight}}>
              <div className={`nested-cube-50 dark-blue`}></div>
              <div className={`nested-cube-50 left-margin dark-blue`}></div>
              <div className={`nested-bar-width-100-height-50 top-margin red`}></div>
            </div>

            <div className={`grid-item width-3`} style={{height: twoThirdHeight}}>
              <div className={`nested-bar-width-33-height-100 red`}></div>
              <div className={`nested-cube-width-66 left-margin grey`}></div>
            </div>
            <div className={`grid-item width-2 left-padding`} style={{height: baseHeight}}>
              <div className={`full-size grey`}></div>
            </div>

          </div>
        </Grid>
      </div>
    );
  }
}
