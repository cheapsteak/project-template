import React from 'react';
import { findDOMNode } from 'react-dom';
const model = require('../../../data/grid');

const sizes = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};

export default class GridTile extends React.Component {

  static propTypes = {
    chapter: React.PropTypes.string
  };

  static defaultProps = {
    chapter: 'welcome'
  };

  state = {
    data: {},
    size: sizes.LANDSCAPE
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    setTimeout(() => {
      const data = model.getDataByChapterId(this.props.chapter);
      const size = (this.containerEl.offsetWidth >= this.containerEl.offsetHeight - 20) ? sizes.LANDSCAPE : sizes.PORTRAIT;
      this.setState({data, size});
    });
  }

  render() {
    const textDepth = -0.4;
    const bgDepth = -0.6;
    const imageDepth = 0.8;

    return (
      <div className={`grid-tile`}>
        <div className={`parallax-layer bg`} data-depth={bgDepth} data-depth={bgDepth}>
          <div className={`noise`}></div>
        </div>
        <div className={`parallax-layer text`} data-depth={textDepth}>
          <div className={`text-container`}>
            <div className={`title`}>{this.state.data.subtitle}</div>
            <div className={`subtitle`}>{this.state.data.title}</div>
          </div>
        </div>
        <div className={`parallax-layer image`} data-depth={imageDepth}>
          <div className={`image-wrapper ${this.state.size}`}>
            <img src={this.state.data.image}/>
          </div>
        </div>
        <div className={`overlay`}></div>
      </div>
    );
  }

}
