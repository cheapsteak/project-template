import React from 'react';
import { findDOMNode } from 'react-dom';
//import Grid from '../grid/grid-890/grid-890.jsx';
import Grid from '../grid/grid-1060/grid-1060.jsx';

export default class GridManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: 0
    }
  }

  componentWillReceiveProps(newProps) {
  }

  static propTypes = {};

  static defaultProps = {};

  handleWindowResize = () => {
    this.setState({screenWidth: window.innerWidth});
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    return (
      <div className={`grid-manager`}>
        <Grid
          screenWidth={this.state.screenWidth}
        />
      </div>
    );
  }
}
