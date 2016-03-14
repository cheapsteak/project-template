import React from 'react';
import ParallaxVideo from 'common/components/parallax-video/parallax-video';

export default function () {

  return (
    <ParallaxVideo
      bgVideoPath={'../videos/parallax-bg.mp4'}
      fgVideoPath={'../videos/parallax-computer-science.mp4'}
    >
      <div className={`parallax-layer`} data-depth="0.5">
        <div className={`text-container`}>
          <div className={`title`}>Chapter</div>
          <div className={`subtitle`}>Computer Science</div>
          <div className={`description`}>At Success Academy we completely redefined how to teach Science.</div>
        </div>
      </div>
    </ParallaxVideo>
  )
}
