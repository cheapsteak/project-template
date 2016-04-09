import React from 'react';
import { findDOMNode } from 'react-dom';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import model from '../../model/article-model.js';
import store from 'common/store';
import data from 'common/data/learn-more.js';
import pageTransitions from '../page-transitions.jsx';

@pageTransitions
export default class MobileLearnMore extends React.Component {

  componentDidMount() {
    store.dispatch(headerActionCreators.setHeaderSettings({
      type: 'learn-more',
      color: '#ffffff',
      title: 'Learn More',
      bottomBorder: true,
      backButton: true
    }));
  }

  render () {
    return (
      <div className="mobile-learn-more">
        <div className="top-overlay"></div>
        <main>
          <h1 dangerouslySetInnerHTML={{ __html: data.title }}></h1>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </main>
      </div>
    )
  }
}
