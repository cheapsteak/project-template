import React from 'react';
import { findDOMNode } from 'react-dom';
import BackButtonSvg from '../../../assets/photo-essay-prev-button.svg';
import NextButtonSvg from '../../../assets/photo-essay-next-button.svg';
import FullscreenButtonSvg from '../../../assets/photo-essay-fullscreen-button.svg';

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
    this.props.onFullBrowserClick();
  };

  render () {
    const { model, style, photoEssays } = this.props;
    const photoEssay = photoEssays[model];
    const photo = photoEssay.photos[photoEssay.index];

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
          <div className="button fullscreen-button" onClick={this.handleFullBrowserClick} dangerouslySetInnerHTML={{ __html: FullscreenButtonSvg }}></div>
          <div className="page-display">{`${photoEssay.index + 1} of ${photoEssay.photos.length}`}</div>
        </div>
      </div>
    )
  }
}

export default PhotoEssay