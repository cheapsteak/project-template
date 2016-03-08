import React from 'react';
import { findDOMNode } from 'react-dom';
import PhotoEssay from './photo-essay.jsx'
import * as actionCreators from './photo-essay-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store.js';

@connect(state => ({ photoEssays: state.photoEssays}), undefined, undefined, { withRef: true })
class PhotoEssayRedux extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);

    if(!props.photoEssays[props.modelSlug]) {
      this.boundActionCreators.setPhotoEssay(props.modelSlug);
    }
  }

  handlePrevClick = () => {
    this.boundActionCreators.setPrevPhoto(this.props.modelSlug);
  };

  handleNextClick = () => {
    this.boundActionCreators.setNextPhoto(this.props.modelSlug);
  };

  render () {
    return <PhotoEssay
      ref="wrappedInstance"
      onPrevClick={this.handlePrevClick}
      onNextClick={this.handleNextClick}
      {...this.props}
    />
  }
}

export default PhotoEssayRedux