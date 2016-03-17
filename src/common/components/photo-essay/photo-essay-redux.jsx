import React from 'react';
import { findDOMNode } from 'react-dom';
import PhotoEssay from './photo-essay.jsx'
import * as actionCreators from './photo-essay-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store.js';

@connect(state => ({ photoEssay: state.photoEssay}), undefined, undefined, { withRef: true })
class PhotoEssayRedux extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);

    if(!props.photoEssay[props.slug]) {
      this.boundActionCreators.setPhotoEssay(props.slug);
    }
  }

  handlePrevClick = () => {
    this.boundActionCreators.setPrevPhoto(this.props.slug);
  };

  handleNextClick = () => {
    this.boundActionCreators.setNextPhoto(this.props.slug);
  };

  render () {
    return <PhotoEssay
      ref="wrappedInstance"
      onPrevClick={this.handlePrevClick}
      onNextClick={this.handleNextClick}
      {...this.props}
      {...this.props.photoEssay}
    />
  }
}

export default PhotoEssayRedux