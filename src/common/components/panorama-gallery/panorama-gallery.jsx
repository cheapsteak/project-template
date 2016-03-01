import React from 'react';
import { findDOMNode } from 'react-dom';
import Panorama from '../panorama/panorama';
import PrevSvg from '../../../assets/photo-essay-prev-button.svg';
import NextSvg from '../../../assets/photo-essay-next-button.svg';

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

export default class PanoramaGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING,
      index: props.index
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({index: nextProps.index});
  }

  static propTypes = {
    index: React.PropTypes.number,
    panoramas: React.PropTypes.array.isRequired,
    prev: React.PropTypes.func,
    next: React.PropTypes.func
  };

  static defaultProps = {
    index: 0,
    prev: () => console.log('go prev'),
    next: () => console.log('go next')
  };

  handlePrevClick = () => {
    this.props.prev();
  };

  handleNextClick = () => {
    this.props.next();
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  render() {
    const index = this.state.index;
    const currPanorama = this.props.panoramas[index];

    const controls = (this.props.panoramas.length > 1 ? (
      <div className={`gallery-controls`}>
        <div className={`button prev`} onClick={this.handlePrevClick} dangerouslySetInnerHTML={{__html: PrevSvg}}></div>
        <div className={`button next`} onClick={this.handleNextClick} dangerouslySetInnerHTML={{__html: NextSvg}}></div>
      </div>
    ) : null);

    return (
      <div className={`panorama-gallery ${this.state.status}`}>
        <Panorama
          src={currPanorama.src}
          initLong={currPanorama.initLong}
          initLat={currPanorama.initLat}
        />
        {controls}
      </div>
    );
  }
}
