import React from 'react';
import { findDOMNode } from 'react-dom';
import PhotoEssay from './photo-essay.jsx'
import * as actionCreators from './photo-essay-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store.js';

@connect(state => ({ photoEssays: state.photoEssays}) )
class PhotoEssayRedux extends React.Component {
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
        <PhotoEssay 
          onPrevClick={this.handlePrevClick}
          onNextClick={this.handleNextClick}
          onFullBrowserClick={this.handleFullBrowserClick}
          {...this.props}
        />
      )
    }

    return el;
  }
}

export default PhotoEssayRedux