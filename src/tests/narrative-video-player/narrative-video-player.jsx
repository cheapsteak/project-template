import React from 'react';
import VideoPlayer from 'common/components/narrative-video-player/narrative-video-player-redux.jsx';

export default function () {
  return <div style={{ backgroundColor: 'black', textAlign: 'center', width: '100vw', height: '100vh'}}>
    <VideoPlayer
      modelSlug="test"
      basePath=""
    />
  </div>
}
