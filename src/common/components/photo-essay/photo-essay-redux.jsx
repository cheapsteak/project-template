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
      this.boundActionCreators.setPhotoEssay(props.model);
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
    return <PhotoEssay 
      onPrevClick={this.handlePrevClick}
      onNextClick={this.handleNextClick}
      onFullBrowserClick={this.handleFullBrowserClick}
      {...this.props}
    />
  }
}

export default PhotoEssayRedux