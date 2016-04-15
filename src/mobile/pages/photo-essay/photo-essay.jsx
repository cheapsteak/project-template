import React from 'react';
import { findDOMNode } from 'react-dom';
import * as headerActionCreators from '../../components/mobile-header/mobile-header-actions';
import model from '../../model/photo-essays-model.js';
import store from 'common/store';
import pageTransitions from '../page-transitions.jsx';

@pageTransitions({isModal: true})
export default class MobilePhotoEssay extends React.Component {

  state = {
    data: {
      photos: []
    }
  }

  componentDidMount() {
    const photoEssay = model.get(this.props.params.slug);

    store.dispatch(headerActionCreators.setHeaderSettings({
      type: 'photo-essay',
      color: '#565D60',
      title: photoEssay.title,
      backButton: true,
      bottomBorder: true
    }));

    this.setState({
      data: photoEssay
    });
  }

  render () {
    const { className = '' } = this.props;
    return (
      <div className={`mobile-photo-essay ${className}`}>
        <div className="top-overlay"></div>
        <main>
          {
            this.state.data.photos.map(photo => {
              return (
                <div key={photo.id} className="photo-item">
                  <img src={photo.image} />
                  <p dangerouslySetInnerHTML={{ __html: photo.description }}>
                  </p>
                </div>
              )
            })
          }
        </main>
      </div>
    )
  }
}
