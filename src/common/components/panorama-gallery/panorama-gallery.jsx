import React from 'react';
import { findDOMNode } from 'react-dom';
import Panorama from '../panorama/panorama';
import PrevButtonSvg from '../../../assets/photo-essay-prev-button.svg';
import NextButtonSvg from '../../../assets/photo-essay-next-button.svg';

const states = {
  LOADING: 'loading',
  LOADED: 'loaded'
};

export default class PanoramaGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: states.LOADING,
      currIndex: props.index
    }
  }

  containerEl;

  static propTypes = {
    index: React.PropTypes.array.number,
    images: React.PropTypes.array.isRequired
  };

  static defaultProps = {
    index: 0
  };

  handlePrevClick = () => {
    var index = this.state.currIndex - 1;
    if (index < 0) index = this.props.images.length - 1;
    this.setState({currIndex: index});
  };

  handleNextClick = () => {
    var index = this.state.currIndex + 1;
    if (index > this.props.images.length - 1) index = 0;
    this.setState({currIndex: index});
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  render() {
    return (
      <div className={`panorama-gallery ${this.state.status}`}>
        <Panorama
          ref="panorama"
          src={this.props.images[this.state.currIndex]}
        >
        </Panorama>

        {this.props.images.length > 1 ?
          (
            <div className={`gallery-controls`}>
              <div
                className={`button prev`}
                onClick={this.handlePrevClick}
                dangerouslySetInnerHTML={{ __html: PrevButtonSvg }}
              ></div>
              <div
                className={`button next`}
                onClick={this.handleNextClick}
                dangerouslySetInnerHTML={{ __html: NextButtonSvg }}
              ></div>
            </div>
          )
          : null}

      </div>
    );
  }
}
