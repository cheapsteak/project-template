import React from 'react';
import FullbrowserWrapper from 'common/components/fullbrowser-wrapper/fullbrowser-wrapper';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux';
import * as photoEssayActionCreators from 'common/components/photo-essay/photo-essay-actions.js';
import store from 'common/store.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

@connect(state => ({ fullbrowser: state.fullbrowser, photos: state.photos }) )
class TestFullbrowserWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { photos, fullbrowser, dispatch } = this.props;

    return (
      <div style={{backgroundColor:'rgba(10,10,80,0.9)', paddingBottom: '50px', textAlign: 'center'}}>
        {
          _.range(6).map((idx) => 
            <FullbrowserWrapper
              key={idx}
              style={{display:'inline-block'}}
              fullBrowserRoute={`/tests/chapter/photo-essay/${idx}`}
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