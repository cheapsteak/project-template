import scale from 'common/utils/scaleAt1400';
import clamp from 'clamp';

export default function calculateAnimationStates (els) {
  const marginAt1400 = 40;
  const zoomedInRect = els.root.getBoundingClientRect();
  const zoomedOutVideoMargin = clamp(scale(marginAt1400, window.innerWidth), marginAt1400, 70);
  const zoomedOutRect = {
    width: zoomedInRect.width - zoomedOutVideoMargin * 2,
    height: zoomedInRect.height - zoomedOutVideoMargin * 2
  };

  return {
    out: {
      simpleProgressBar: {
        y: els.simpleProgressBar.offsetHeight
      },
      videoWrapper: {
        scaleX: 1,
        scaleY: 1,
        cursor: 'none'
      },
      overlay: {
        opacity: 0,
        visibility: 'hidden'
      },
      endingOverlay: {
        delay: 0.1,
        display: 'none',
        opacity: 0
      },
      replayButton: {
        opacity: 0,
        y: 100
      },
      replayLabel: {
        opacity: 0,
        y: 100
      },
      cornerButton: {
        y: -els.cornerButton.offsetHeight
      },
      moreAboutCTA: {
        opacity: 0
      },
      circleCTA: {
        opacity: 0,
        y: 50
      },
      controls: {
        y: zoomedOutVideoMargin * 2,
        height: zoomedOutVideoMargin * 2,
        visibility: 'hidden'
      }
    },
    idle: {
      simpleProgressBar: {
        delay: 0.1,
        y: 0
      },
      videoWrapper: {
        scaleX: zoomedOutRect.width/zoomedInRect.width,
        scaleY: zoomedOutRect.height/zoomedInRect.height,
        cursor: 'default'
      },
      overlay: {
        opacity: 0.4,
        visibility: 'visible'
      },
      endingOverlay: {
        display: 'block',
        opacity: 0.99
      },
      replayButton: {
        delay: 0.8,
        opacity: 1,
        y: 0
      },
      replayLabel: {
        delay: 1.2,
        opacity: 1,
        y: 0
      },
      cornerButton: {
        delay: 0.5,
        y: -1
      },
      moreAboutCTA: {
        delay: 0.3,
        opacity: 1
      },
      circleCTA: {
        opacity: 1,
        y: 0
      },
      controls: {
        y: 0,
        height: zoomedOutVideoMargin * 2,
        visibility: 'visible'
      }
    },
    end: {
      overlay: {
        opacity: 1
      }
    }
  };
};
