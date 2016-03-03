import React from 'react';
import { findDOMNode } from 'react-dom';
import Grid890 from '../grid/grid-890/grid-890.jsx';

export default class GridManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillReceiveProps(newProps) {
  }

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  render() {
    return (
      <div className={`grid-manager`}>
        <Grid890 />
      </div>
    );
  }
}
