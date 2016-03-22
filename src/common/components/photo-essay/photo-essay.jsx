import React from 'react';
import { findDOMNode } from 'react-dom';
import BackButtonSvg from 'svgs/photo-essay-prev-button.svg';
import NextButtonSvg from 'svgs/photo-essay-next-button.svg';
import FullscreenButtonSvg from 'svgs/photo-essay-fullscreen-button.svg';
import { Link } from 'react-router';
import animate from 'gsap-promise';

class PhotoEssay extends React.Component {
  constructor(props) {
    super(props)
  }

  handlePrevClick = () => {
    this.props.onPrevClick();
  };

  handleNextClick = () => {
    this.props.onNextClick();
  };

  render () {
    const { style, photos, index, isFullBrowser, fullBrowserRoute, fullBrowserExitRoute, className } = this.props;
    const photo = photos && photos[index] || {};
    let currentPhotoNumber = photos ? index + 1 : 0;
    let maxPhotoNumber = photos ? photos.length : 0;
    const route = (isFullBrowser ? fullBrowserRoute : fullBrowserExitRoute) || '/';

    return (
      <div className={`photo-essay ${className || ''}`} style={style}>
        <div className="image-wrapper">
          <img src={photo.image} />
        </div>
        <div className="photo-description">
          <h3>About this picture</h3>
          <p>{ photo.description }</p>
        </div>
        <div className="photo-controls">
          <div className="button back-button" onClick={this.handlePrevClick} dangerouslySetInnerHTML={{ __html: BackButtonSvg }}></div>
          <div className="button next-button" onClick={this.handleNextClick} dangerouslySetInnerHTML={{ __html: NextButtonSvg }}></div>
          <Link className="button fullscreen-button" to={route}>
            <span dangerouslySetInnerHTML={{ __html: FullscreenButtonSvg }}></span>
          </Link>
          <div className="page-display">{`${currentPhotoNumber} of ${maxPhotoNumber}`}</div>
        </div>
      </div>
    )
  }
}

export default PhotoEssay