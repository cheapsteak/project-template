import React from 'react';
import FullbrowserWrapper from 'common/components/fullbrowser-wrapper/fullbrowser-wrapper';
import PhotoEssay from 'common/components/photo-essay/photo-essay';
import * as photoEssayActionCreators from 'common/components/photo-essay/photo-essay-actions.js';
import * as fullBrowserActionCreators from 'common/components/fullbrowser-wrapper/fullbrowser-wrapper-actions.js';
import store from 'common/store.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

@connect(state => ({ fullbrowser: state.fullbrowser, photos: state.photos }) )
class TestFullbrowserWrapper extends React.Component {
  constructor(props) {
    super(props);

    const { photos, fullbrowser, dispatch } = props;
    this.boundPhotoEssayActionCreators = bindActionCreators(photoEssayActionCreators, dispatch);
    this.boundFullBrowserActionCreators = bindActionCreators(fullBrowserActionCreators, dispatch);
  }

  render () {
    const { photos, fullbrowser, dispatch } = this.props;
    const boundPhotoEssayActionCreators = bindActionCreators(photoEssayActionCreators, dispatch);
    const boundFullBrowserActionCreators = bindActionCreators(fullBrowserActionCreators, dispatch);
    const { pathname } = this.props.location;
    const id = pathname.split('/')[4] || undefined;
    
    return (
      <div style={{backgroundColor:'rgba(5,5,20,0.9)', paddingBottom: '50px', textAlign: 'center'}}>
        {
          _.range(6).map((idx) => 
            <FullbrowserWrapper
              key={idx}
              style={{display:'inline-block'}}
              isFullBrowser={id == idx}
              fullBrowserRoute="/tests/chapter"
            >
              <PhotoEssay
                style={{ marginTop: '100px', width: '600px', height: '350px'}}
                model='test'
              />
            </FullbrowserWrapper>
          )
        }
      </div>
    )
  }
}

export default TestFullbrowserWrapper;