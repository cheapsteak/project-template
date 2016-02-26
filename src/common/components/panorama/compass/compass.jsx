import React from 'react';
import { findDOMNode } from 'react-dom';

export default class PanoramaCompass extends React.Component {
  constructor(props) {
    super(props);
  }

  containerEl;

  static propTypes = {
    lat: React.PropTypes.number,
    lng: React.PropTypes.number
  };

  static defaultProps = {
    lat: 0,
    lng: 0
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  render() {
    return (
      <div className={`panorama-compass`}>
        <div
          className={`compass-indicator`}
          style={ {transform: 'rotateZ(' + (this.props.lng * 180/ Math.PI + 45) + 'deg)'} }
        >
          <div className={`indicator-point`}></div>
        </div>
      </div>
    );
  }
}
