import React from 'react';
import * as actionCreators from 'common/components/panorama-gallery/panorama-gallery-actions';
import store from '../../common/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PanoramaGallery from 'common/components/panorama-gallery/panorama-gallery.jsx';


@connect(state => ({panorama: state.panoramas}))

class TestPanoramaGallery extends React.Component {

  render() {
    const { panorama, dispatch } = this.props;
    const boundActionCreators = bindActionCreators(actionCreators, dispatch);

    return (
      <PanoramaGallery
        index={panorama.index}
        panoramas={panorama.panoramas}
        prev={boundActionCreators.setPrevPanorama}
        next={boundActionCreators.setNextPanorama}
      />
    )
  }
}

export default TestPanoramaGallery;
