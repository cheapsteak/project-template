import React from 'react';
import { findDOMNode } from 'react-dom';

const types = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};

export default class ParallaxCell extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    photo: React.PropTypes.string,
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
      console.log(newProps.mouseCoordinates);
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.setLayersDepth();

    setTimeout(() => {
      const container = this.containerEl;
      const type = (container.offsetWidth >= container.offsetHeight - 20) ? types.LANDSCAPE : types.PORTRAIT;
      this.setState({type});
    });
  }

  setLayersDepth = () => {
    const baseDepth = (this.containerEl.offsetWidth + this.containerEl.offsetHeight) / 500;
    if (this.refs.textLayer) this.refs.textLayer.setAttribute('data-depth', baseDepth / 3);
    if (this.refs.imageLayer) this.refs.imageLayer.setAttribute('data-depth', baseDepth);
  };

  render() {
    const photoLayer = this.props.photo ? (
      <div ref="imageLayer" className={`layer image`}>
        <div className={`image-wrapper ${this.state.type}`}>
          <img src={this.props.photo}/>
        </div>
      </div>
    ) : null;

    return (
      <div className={`grid-cell`}>
        <div ref="textLayer" className={`layer`}>
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
