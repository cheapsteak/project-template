import React from 'react';
import ParallaxVideo from 'common/components/parallax-video/parallax-video';

export default function () {
  return (
    <ParallaxVideo
      bgVideoPath={'../videos/bg-1080.mp4'}
      fgVideoPath={'../videos/fg-1080.mp4'}
    >
      <div className={`layer`} data-depth="0.3">
        <div className={`text-container`}>
          <div className={`title`}>Chapter</div>
          <div className={`subtitle`}>Computer Science</div>
          <div className={`description`}>At Success Academy we completely redefined how to teach Science.</div>
        </div>
      </div>
    </ParallaxVideo>
  )
}
