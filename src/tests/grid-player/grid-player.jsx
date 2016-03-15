import React from 'react';
import VideoPlayer from 'common/components/video-players/instructional/grid/grid-video-player-redux.jsx';

export default class GridPlayerTest extends React.Component {
  render () {
    const key = window.location.pathname.split('/')[4];

    return (
      <VideoPlayer
        modelSlug={key || 'test'}
      />
    )
  }
}