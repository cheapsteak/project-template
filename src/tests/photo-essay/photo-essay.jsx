import React from 'react';
import PhotoEssay from 'common/components/photo-essay/photo-essay';
import store from '../../common/store/index.js';
import * as Actions from '../../common/actions/photos.js';

export default class TestPhoto extends React.Component {
  constructor(props) {
    super(props);

    this.state = { photos: store.getState().photos };
  }

  componentWillMount() {
    store.subscribe(() => {
      this.setState({ photos: store.getState().photos })
    })
  }

  render () {
    return <div style={{backgroundColor:'rgba(5,5,20,0.9)', height: '100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent: 'center'}}>
      <PhotoEssay
        style={{ margin: 'auto'}}
        index={this.state.photos.index}
        photos={this.state.photos.photos}
        isFullscreen={this.state.photos.isFullscreen}
        next={Actions.setNextPhoto}
        prev={Actions.setPrevPhoto}
        toggleFullscreen={Actions.toggleFullscreen}
      />
    </div>
  }
}
