import React from 'react';
import { findDOMNode } from 'react-dom';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import model from '../../model/articles-model.js';
import store from 'common/store';
import pageTransitions from '../page-transitions.jsx';

@pageTransitions({isModal: true})
export default class MobileArticle extends React.Component {

  state = {
    data: {}
  }

  componentDidMount() {
    const article = model.get(this.props.params.slug);

    store.dispatch(headerActionCreators.setHeaderSettings({
      type: 'article',
      color: '#565D60',
      title: article.chapterName,
      backButton: true,
      bottomBorder: true
    }));

    this.setState({
      data: article
    });
  }

  render () {
    const { className = '' } = this.props;
    return (
      <div className={`mobile-article ${className}`}>
        <div className="top-overlay"></div>
        <div className="content-wrapper">
          {
            this.state.data.image
            ? <img src={this.state.data.image} />
            : null
          }
          <main>
            <h1>{ this.state.data.title }</h1>
            <section dangerouslySetInnerHTML={{ __html: this.state.data.content }}>
            </section>
          </main>
        </div>
      </div>
    )
  }
}
