import React from 'react';
import { findDOMNode } from 'react-dom';
const model = require('../../../data/grid');
import animate from 'gsap-promise';

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

  animateIn = (index, fillers) => {
    animate.set(fillers, {autoAlpha: 0});
    animate.fromTo(this.containerEl, 0.8, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.15 * index + 0.1});
    animate.staggerTo(fillers, 0.5, {autoAlpha: 1, delay: 0.4}, 0.1)
  };

  render() {
    const textDepth = 0.6;
    const bgDepth = 1;
    const imageDepth = 0.8;

    return (
      <div className={`grid-tile`}>
        <div className={`parallax-layer bg`} data-depth={bgDepth} data-vector={`0.4,0.5`}>
          <div className={`noise`}></div>
        </div>
        <div className={`parallax-layer text`} data-depth={textDepth} data-vector={`-0.7, 0.8`}>
          <div className={`text-container`}>
            <div className={`title`}>{this.state.data.subtitle}</div>
            <div className={`subtitle`}>{this.state.data.title}</div>
          </div>
        </div>
        <div className={`parallax-layer image`} data-depth={imageDepth} data-vector={`1,-0.5`}>
          <div className={`image-wrapper ${this.state.size}`}>
            <img src={this.state.data.image}/>
          </div>
        </div>
        <div className={`overlay`}>
          <div className={`part left`}></div>
          <div className={`part right`}></div>
        </div>
      </div>
    );
  }

}
