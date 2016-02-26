import React from 'react';
import PhotoEssay from 'common/components/photo-essay/photo-essay';
import * as actionCreators from 'common/components/photo-essay/photo-essay-actions.js';
import store from 'common/store.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({ photos: state.photos }) )
class TestPhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { photos, dispatch } = this.props;
    const boundActionCreators = bindActionCreators(actionCreators, dispatch)

    return (
      <div style={{backgroundColor:'rgba(5,5,20,0.9)', height: '100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent: 'center'}}>
        <PhotoEssay
          style={{ margin: 'auto'}}
          index={photos.index}
          photos={photos.photos}
          isFullscreen={photos.isFullscreen}
          next={boundActionCreators.setNextPhoto}
          prev={boundActionCreators.setPrevPhoto}
          toggleFullscreen={boundActionCreators.toggleFullscreen}
        />
      </div>
    )
  }
}

export default TestPhoto;