import React from 'react';
import { findDOMNode } from 'react-dom';
import Panorama from '../panorama/panorama';

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

export default class PanoramaWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING,
      currIndex: 0,
      currImage: null
    }
  }

  containerEl;

  static propTypes = {
    images: React.PropTypes.array.isRequired
  };

  handleSwitchPrev = () => {
    var index = this.state.currIndex - 1;
    if (index < 0) index = this.props.images.length - 1;
    this.setState({currIndex: index});
    this.refs.panorama.setPanorama(this.props.images[index]);
  };

  handleSwitchNext = () => {
    var index = this.state.currIndex + 1;
    if (index > this.props.images.length - 1) index = 0;
    this.setState({currIndex: index});
    this.refs.panorama.setPanorama(this.props.images[index]);
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  render() {
    return (
      <div className={`panorama-wrapper ${this.state.status}`}>
        <Panorama ref="panorama" src={this.props.images[this.state.currIndex]}></Panorama>
        <div className={`queue-controls`}>
          <div className={`switch prev`} onClick={this.handleSwitchPrev}>{'<'}</div>
          <div className={`switch next`} onClick={this.handleSwitchNext}>{'>'}</div>
        </div>
      </div>
    );
  }
}
