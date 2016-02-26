import React from 'react';
import { findDOMNode } from 'react-dom';
import BackButtonSvg from '../../../assets/photo-essay-prev-button.svg';
import NextButtonSvg from '../../../assets/photo-essay-next-button.svg';
import FullscreenButtonSvg from '../../../assets/photo-essay-fullscreen-button.svg';

export default class PhotoEssay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: props.index
    }
  }

  componentWillReceiveProps(nextProps) {        
    this.setState({ current: nextProps.index });
    this.setFullscreen(nextProps.isFullscreen);
  }

  setFullscreen = (isFullscreen) => {

    // NOTE: This is not the actual implementation
    const el = findDOMNode(this);

    if(isFullscreen) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  handlePrevClick = () => {
    this.props.prev()

    // this.setState({ 
    //   current: this.state.current > 0 
    //     ? (this.state.current - 1) % this.props.photos.length
    //     : this.props.photos.length - 1
    // });
  };

  handleNextClick = () => {
    this.props.next()
    // this.setState({ current: (this.state.current + 1) % this.props.photos.length })
  };

  handleFullscreenClick = () => {
    this.props.toggleFullscreen();
  };

  render () {
    const { style, photos } = this.props;
    const index = this.state.current;

    return (
      <div className="photo-essay" style={style}>
        <div className="image-wrapper">
          <img src={photos[index].image} />
        </div>
        <div className="photo-description">
          <h3>About this picture</h3>
          <p>{ photos[index].description }</p>
        </div>
        <div className="photo-controls">
          <div className="button back-button" onClick={this.handlePrevClick} dangerouslySetInnerHTML={{ __html: BackButtonSvg }}></div>
          <div className="button next-button" onClick={this.handleNextClick} dangerouslySetInnerHTML={{ __html: NextButtonSvg }}></div>
          <div className="button fullscreen-button" onClick={this.handleFullscreenClick} dangerouslySetInnerHTML={{ __html: FullscreenButtonSvg }}></div>
          <div className="page-display">{`${index + 1} of ${this.props.photos.length}`}</div>
        </div>
      </div>
    )
  }
}