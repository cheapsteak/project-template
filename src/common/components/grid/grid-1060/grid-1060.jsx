import React from 'react';
import { findDOMNode } from 'react-dom';
import Grid from '../grid.jsx';


export default class Grid1060 extends React.Component {
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
    const baseHeight = containerWidth * 0.5;
    const twoThirdHeight = containerWidth * 0.3;

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
      <div className={`grid grid-1060`}>
        <Grid>
          <div>

            <div className={`grid-item id-1 first-row width-3 right-padding`} style={{height: twoThirdHeight}}>
              <div className={`nested-cube-width-66 grey`}></div>
              <div className={`nested-bar-width-33-height-100 left-margin red`}></div>
            </div>
            <div className={`grid-item id-2 width-3 first-row height-full orange`} style={{height: baseHeight}}></div>

          </div>
        </Grid>
      </div>
    );
  }
}
