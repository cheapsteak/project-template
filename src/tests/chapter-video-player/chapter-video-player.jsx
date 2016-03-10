import React from 'react';
import VideoPlayer from 'common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';

export default function () {
  return <div style={{ backgroundColor: 'black', textAlign: 'center', width: '100vw', height: '100vh'}}>
    <VideoPlayer
      modelSlug="test"
      basePath=""
      style={{ width: '700px', marginTop: '50px' }}
    />
  </div>
}
