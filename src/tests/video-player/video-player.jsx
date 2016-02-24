import React from 'react';
import VideoPlayer from 'common/components/video-player/video-player.jsx';

export default function () {
  return <div style={{ backgroundColor: 'black', textAlign: 'center', width: '100vw', height: '100vh'}}>
    <VideoPlayer
      style={{ top: '100px', width: '1000px' }}
      src="http://techslides.com/demos/sample-videos/small.mp4"
      timeline={[
        { id: 'chapter 1', time: 1, img: '../hover-card.jpg' },
        { id: 'chapter 1.2', time: 1.2, img: '../hover-card.jpg' },
        { id: 'chapter 2', time: 2.5, img: '../hover-card.jpg' },
        { id: 'chapter 3', time: 3, img: '../hover-card.jpg' },
        { id: 'chapter 4', time: 3.5, img: '../hover-card.jpg' },
        { id: 'chapter 5', time: 4, img: '../hover-card.jpg' },
        { id: 'chapter 6', time: 5, img: '../hover-card.jpg' }
      ]}
    />
  </div>
}
