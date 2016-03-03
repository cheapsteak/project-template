import React from 'react';
import { findDOMNode } from 'react-dom';
import Grid890 from '../grid/layout-890/index.jsx';
import Grid1060 from '../grid/layout-1060/index.jsx';


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

    var currLayout;
    var windowWidth = this.state.screenWidth || window.innerWidth;

    if (windowWidth <= 890) {
      currLayout = <Grid890 screenWidth={windowWidth}/>;
    } else if (windowWidth <= 1060) {
      currLayout = <Grid1060 screenWidth={windowWidth}/>;
    } else {
      currLayout = <Grid1060 screenWidth={windowWidth}/>;
    }

    return (
      <div className={`grid-manager`}>
        {React.cloneElement(currLayout || <div />, {ref: 'grid'})}
      </div>
    );
  }
}
