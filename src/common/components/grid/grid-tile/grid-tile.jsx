import React from 'react';
import { findDOMNode } from 'react-dom';

const types = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};


export default class GridTile extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    photo: React.PropTypes.string,
    baseHeight: React.PropTypes.number,
    mouseCoordinates: React.PropTypes.objectOf(React.PropTypes.number)
  };

  static defaultProps = {
    title: 'tile',
    subtitle: 'chapter'
  };

  state = {
    type: types.LANDSCAPE
  };

  componentWillReceiveProps(newProps) {
    if (newProps.mouseCoordinates) {
      this.setDepthBasedOnMouseProximity(newProps.mouseCoordinates);
    }

    // detect when tile size (position of the centre) changes
    if (newProps.baseHeight) {
      this.detectPosition();
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    setTimeout(() => {
      const container = this.containerEl;
      const type = (container.offsetWidth >= container.offsetHeight - 20) ? types.LANDSCAPE : types.PORTRAIT;
      this.setState({type});
    });
  }

  detectPosition = () => {
    const x = this.containerEl.getBoundingClientRect().left + this.containerEl.offsetWidth * 0.5;
    const y = this.containerEl.getBoundingClientRect().top + this.containerEl.offsetHeight * 0.5;
    this.position = {x, y};
    //console.log(this.position);
  };

  setDepthBasedOnMouseProximity = (mouseCoordinates) => {
    if (this.position) {
      const x1 = this.position.x;
      const x2 = mouseCoordinates.x;
      const y1 = this.position.y;
      const y2 = mouseCoordinates.y;
      const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

      const screenAverageSize = (window.innerWidth + window.innerHeight) / 2;
      const tileAverageSize = (this.containerEl.offsetWidth + this.containerEl.offsetHeight) / 2;
      const sizeAdjuster = tileAverageSize / this.props.baseHeight;

      const baseDepth = (distance / screenAverageSize - 1);
      const maxDepth = Math.min(Math.abs(baseDepth), 1);
      //console.log(maxDepth);

      if (this.refs.textLayer) this.refs.textLayer.setAttribute('data-depth', maxDepth / 3);
      if (this.refs.imageLayer) this.refs.imageLayer.setAttribute('data-depth', maxDepth);
    }
  };

  render() {
    const photoLayer = this.props.photo ? (
      <div ref="imageLayer" className={`layer image`} data-depth="0.7">
        <div className={`image-wrapper ${this.state.type}`}>
          <img src={this.props.photo}/>
        </div>
      </div>
    ) : null;

    return (
      <div className={`grid-cell`}>
        <div ref="textLayer" className={`layer`} data-depth="0.3">
          <div className={`text-container`}>
            <div className={`title`}>{this.props.subtitle}</div>
            <div className={`subtitle`}>{this.props.title}</div>
          </div>
        </div>
        {photoLayer}
      </div>
    );
  }

}
