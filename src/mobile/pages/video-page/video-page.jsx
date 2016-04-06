import React from 'react';
import { findDOMNode } from 'react-dom';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import store from 'common/store';
import model from '../../model/instructional-videos-model.js';

export default class MobileVideoPage extends React.Component {

  state = { src: undefined };

  componentDidMount() {
    const video = model.get(this.props.params.slug);

    this.setState({
      src: video.src
    });

    store.dispatch(headerActionCreators.setHeaderSettings({
      color: '#565D60',
      backgroundColor: 'white',
      backButton: true
    }));
  }

  render () {
    const { pathname } = this.props.location;
    let key = pathname.split('/')[1] || 'root';

    return (
      <div className="mobile-video-page">
        <video
          autoPlay
          src={this.state.src}
          controls
        />
      </div>
    )
  }
}