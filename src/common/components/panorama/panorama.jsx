import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import Pannellum from 'pannellum';

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

var containerEl;

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING
    }
  }

  static propTypes = {
    src: React.PropTypes.string
  };

  static defaultProps = {
    src: 'https://pannellum.org/images/cerro-toco-0.jpg'
  };

  componentDidMount() {
    containerEl = findDOMNode(this);

    pannellum.viewer(containerEl, {
      type: 'equirectangular',
      panorama: this.props.src,
      autoLoad: true,
      compass: true
    });
  }

  render() {
    return (
      <div className={`panorama`}></div>
    );
  }
}
