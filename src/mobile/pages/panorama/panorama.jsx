import React from 'react';
import { findDOMNode } from 'react-dom';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import Panorama from 'common/components/panorama/panorama-redux.jsx';
import model from '../../model/panorama-model.js';
import store from 'common/store';
import pageTransitions from '../page-transitions.jsx';

@pageTransitions({isModal: true})
export default class MobileArticle extends React.Component {

  state = {
    data: undefined
  }

  componentDidMount() {
    const panoramaData = model.get(this.props.params.slug);

    store.dispatch(headerActionCreators.setHeaderSettings({
      type: 'panorama',
      color: '#565D60',
      backgroundColor: '#ffffff',
      title: panoramaData.title,
      backButton: true,
      bottomBorder: true
    }));

    this.setState({
      data: panoramaData
    });
  }

  render () {
    const { className = '' } = this.props;

    return (
      <div className={`mobile-panorama ${className}`}>
        <div className="top-overlay"></div>
        {
          this.state.data
          ? <Panorama
              slug={this.state.data.slug}
              hasMenu={false}
            />
          : null
        }
      </div>
    )
  }
}