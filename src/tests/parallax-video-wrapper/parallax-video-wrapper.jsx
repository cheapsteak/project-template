import React from 'react';
import ParallaxVideoWrapper from 'common/components/parallax-video-wrapper/parallax-video-wrapper.jsx';

export default function () {

  return (
    <ParallaxVideoWrapper
      inHomePage={true}
      bgVideoPath={'../videos/bg-1080.mp4'}
      fgVideoPath={'../videos/fg-1080-1.mp4'}
    />
  )
}
