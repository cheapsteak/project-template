import React from 'react';
import ParallaxVideoWrapper from 'common/components/parallax-video-wrapper/parallax-video-wrapper.jsx';

export default function () {
  const body = document.getElementsByTagName('body')[0];
  body.style.width = '100%';
  body.style.height = '100%';
  body.style.overflow = 'hidden';

  return (
    <ParallaxVideoWrapper
      inHomePage={true}
      bgVideoPath={'../videos/bg-1080.mp4'}
      fgVideoPath={'../videos/fg-1080-1.mp4'}
    />
  )
}
