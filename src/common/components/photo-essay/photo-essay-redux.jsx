import React from 'react';
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
  }

  componentWillMount () {
    this.boundActionCreators.setPhotoEssay(this.props.slug);
  }

  render () {
    return <PhotoEssay
      ref="wrappedInstance"
      onPrevClick={this.boundActionCreators.setPrevPhoto}
      onNextClick={this.boundActionCreators.setNextPhoto}
      {...this.props}
      {...this.props.photoEssay}
    />
  }
}

export default PhotoEssayRedux
