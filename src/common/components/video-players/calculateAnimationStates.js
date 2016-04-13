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
        width: window.innerWidth,
        height: window.innerHeight,
        cursor: 'none'
      },
      overlay: {
        opacity: 0,
        visibility: 'hidden'
      },
      endingOverlay: {
        delay: 0.1,
        opacity: 0,
        visibility: 'hidden',
      },
      replayButton: {
        opacity: 0,
        visibility: 'hidden',
        y: 100
      },
      replayLabel: {
        opacity: 0,
        visibility: 'hidden',
        y: 100
      },
      cornerButton: {
        y: -els.cornerButton.offsetHeight - 70
      },
      moreAboutCTA: {
        opacity: 0,
        visibility: 'hidden',
      },
      circleCTA: {
        opacity: 0,
        visibility: 'hidden',
        y: 50
      },
      controls: {
        y: zoomedOutVideoMargin * 2 + 70,
        height: zoomedOutVideoMargin * 2
      }
    },
    idle: {
      simpleProgressBar: {
        delay: 0.1,
        y: 0
      },
      videoWrapper: {
        width: window.innerWidth - (zoomedOutVideoMargin*2),
        height: window.innerHeight - (zoomedOutVideoMargin*2),
        cursor: 'default'
      },
      overlay: {
        opacity: 0.4,
        visibility: 'visible'
      },
      endingOverlay: {
        visibility: 'visible',
        opacity: 0.99
      },
      replayButton: {
        delay: 0.8,
        opacity: 1,
        visibility: 'visible',
        y: 0
      },
      replayLabel: {
        delay: 1.2,
        opacity: 1,
        visibility: 'visible',
        y: 0
      },
      cornerButton: {
        y: -1
      },
      moreAboutCTA: {
        delay: 0.3,
        opacity: 1,
        visibility: 'visible',
      },
      circleCTA: {
        opacity: 1,
        visibility: 'visible',
        y: 0
      },
      controls: {
        y: 0,
        height: zoomedOutVideoMargin * 2
      }
    },
    end: {
      overlay: {
        opacity: 1,
        visibility: 'visible',
      }
    }
  };
};
