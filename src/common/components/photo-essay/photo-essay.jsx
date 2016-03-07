import React from 'react';
import { findDOMNode } from 'react-dom';
import BackButtonSvg from '../../../assets/photo-essay-prev-button.svg';
import NextButtonSvg from '../../../assets/photo-essay-next-button.svg';
import FullscreenButtonSvg from '../../../assets/photo-essay-fullscreen-button.svg';
import { Link } from 'react-router';

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

  handleFullBrowserClick = () => {
    // this.props.onFullBrowserClick();
  };

  render () {
    const { modelSlug, style, photoEssays, basePath } = this.props;
    const photoEssay = photoEssays[modelSlug];
    let photo = {};
    let currentPhotoNumber = 0;
    let maxPhotoNumber = 0;
    let route = `${basePath}`;

    if(photoEssay) {
      photo = photoEssay.photos[photoEssay.index];
      currentPhotoNumber = photoEssay.index + 1;
      maxPhotoNumber = photoEssay.photos.length;
    }

    if(!this.props.isFullBrowser) {
      route = route + `/photo-essays/${modelSlug}`;
    }

    return (
      <div className="photo-essay" style={style}>
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