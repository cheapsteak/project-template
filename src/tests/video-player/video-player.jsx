import React from 'react';
import VideoPlayer from 'common/components/video-player/video-player-redux.jsx';

export default function () {
  return <div style={{ backgroundColor: 'black', textAlign: 'center', width: '100vw', height: '100vh'}}>
    <VideoPlayer
      model="test"
      style={{ width: '700px', marginTop: '50px' }}
    />
  </div>
}
