import React from 'react';
import { findDOMNode } from 'react-dom';

export default class PanoramaCompass extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    long: React.PropTypes.number,
    lat: React.PropTypes.number
  };

  static defaultProps = {
    long: 0,
    lat: 0
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  render() {
    return (
      <div className={`panorama-compass`}>
        <div
          className={`compass-indicator`}
          style={{
            transform: 'rotateZ(' + (this.props.long * 180/ Math.PI + 45) + 'deg)',
            WebkitTransform: 'rotateZ(' + (this.props.long * 180/ Math.PI + 45) + 'deg)'
          }}
        >
          <div className={`indicator-point`}></div>
        </div>
      </div>
    );
  }
}
