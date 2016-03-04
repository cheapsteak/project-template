import React from 'react';
import { findDOMNode } from 'react-dom';


export default class ParallaxCell extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    photo: React.PropTypes.string,
    mouseCoordinates: React.PropTypes.object
  };

  static defaultProps = {
    title: 'default',
    subtitle: 'default'
  };

  componentWillReceiveProps(newProps) {
    if (newProps.mouseCoordinates) {
      console.log(newProps.mouseCoordinates);
    }
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.setLayersDepth();
  }

  setLayersDepth = () => {
    const baseDepth = (this.containerEl.offsetWidth + this.containerEl.offsetHeight) / 500;
    this.refs.textLayer.setAttribute('data-depth', baseDepth / 3);
    this.refs.imageLayer.setAttribute('data-depth', baseDepth);
  };

  render() {
    return (
      <div className={`grid-cell`}>
        <div ref="textLayer" className={`layer`}>
          <div className={`text-container`}>
            <div className={`title`}>{this.props.subtitle}</div>
            <div className={`subtitle`}>{this.props.title}</div>
          </div>
        </div>
        <div ref="imageLayer" className={`layer`}>
          <div className={`image-wrapper`}>
            <img src={this.props.photo}/>
          </div>
        </div>
      </div>
    );
  }

}
