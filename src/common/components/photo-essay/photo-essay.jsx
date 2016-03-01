import React from 'react';
import { findDOMNode } from 'react-dom';
import BackButtonSvg from '../../../assets/photo-essay-prev-button.svg';
import NextButtonSvg from '../../../assets/photo-essay-next-button.svg';
import FullscreenButtonSvg from '../../../assets/photo-essay-fullscreen-button.svg';
import * as actionCreators from './photo-essay-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store.js';

@connect(state => ({ photoEssays: state.photoEssays}) )
class PhotoEssay extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);

    if(!props.photoEssays[props.model]) {
      props.dispatch( actionCreators.loadPhotoEssay(props.model) )
    }
  }

  setFullBrowser = (isFullBrowser) => {
    if(isFullBrowser) {
      this.props.toggleFullBrowser(PhotoEssay, this.props);
    }
  };

  handlePrevClick = () => {
    this.boundActionCreators.setPrevPhoto(this.props.model);
  };

  handleNextClick = () => {
    this.boundActionCreators.setNextPhoto(this.props.model);
  };

  handleFullBrowserClick = () => {
    this.props.toggleFullBrowser(PhotoEssay, this.props);
  };

  render () {
    const { model, style, photoEssays } = this.props;
    const photoEssay = photoEssays[model];
    let el = <div />;

    if(photoEssay && !photoEssay.isLoading) {
      const photo = photoEssay.photos[photoEssay.index];
      
      el = (
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
      );
    }

    return el;
  }
}

export default PhotoEssay