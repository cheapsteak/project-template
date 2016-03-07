import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import FullBrowserWrapper from 'common/components/fullbrowser-wrapper/fullbrowser-wrapper.jsx'
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux.jsx';

class TestFullbrowserWrapper extends React.Component {
  componentWillAppear (callback) {
    this.refs.child.componentWillAppear(callback);
  }

  componentWillEnter (callback) {
    this.refs.child.componentWillEnter(callback);
  }

  componentWillLeave (callback) {
    this.refs.child.componentWillLeave(callback);
  }

  render () {
    return <FullBrowserWrapper ref="child">
      <PhotoEssay model="test"/>
    </FullBrowserWrapper>
  }
}

export default TestFullbrowserWrapper;