import React from 'react';
import { findDOMNode } from 'react-dom';

export default class Grid extends React.Component {
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
      <div className={`main-grid`}>

      </div>
    );
  }
}
