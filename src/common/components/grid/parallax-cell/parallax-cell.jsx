import React from 'react';
import { findDOMNode } from 'react-dom';


export default class ParallaxCell extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    photo: React.PropTypes.string,
    parallaxOpts: React.PropTypes.object,
    size: React.PropTypes.number
  };

  static defaultProps = {
    title: 'science',
    subtitle: 'chapter',
    parallaxOpts: {
      limitX: 30,
      limitY: 30
    }
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    this.setLayersDepth();
    this.parallax = new Parallax(this.refs.scene, this.props.parallaxOpts);
  }

  componentWillUnmount() {
    this.parallax = null;
  }

  setLayersDepth = () => {
    const baseDepth = (this.refs.scene.offsetWidth + this.refs.scene.offsetHeight) / 500;
    this.refs.textLayer.setAttribute('data-depth', baseDepth / 3);
    this.refs.imageLayer.setAttribute('data-depth', baseDepth);
  };

  render() {
    return (
      <div ref="scene" className={`grid-parallax-scene`}>
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
