import React from 'react';
import { findDOMNode } from 'react-dom';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import model from '../../model/article-model.js';
import store from 'common/store';

export default class MobileArticle extends React.Component {

  state = {
    data: {}
  }

  componentDidMount() {
    const article = model.get(this.props.params.slug);

    store.dispatch(headerActionCreators.setHeaderSettings({
      color: '#565D60',
      backgroundColor: 'rgba(255,255,255,0.8)',
      title: article.chapterName,
      backButton: true
    }));

    this.setState({
      data: article
    });
  }

  render () {
    return (
      <div className="mobile-article">
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
    )
  }
}
