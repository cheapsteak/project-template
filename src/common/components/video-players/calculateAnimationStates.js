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
      videoWrapper: {
        delay: 0.3,
        width: window.innerWidth,
        height: window.innerHeight,
        cursor: 'none',
        ease: ViniEaseOut
      },
      overlay: {
        opacity: 0,
        // visibility: 'hidden'
      },
      endingOverlay: {
        delay: 0.1,
        opacity: 0,
        visibility: 'hidden',
      },
      replayButton: {
        opacity: 0,
        visibility: 'hidden',
        rotation: 40,
        y: 50,
        ease: ViniEaseOut
      },
      replayLabel: {
        opacity: 0,
        visibility: 'hidden',
        y: 50,
        ease: ViniEaseOut
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
        scale: 1.1
      }
    },
    idle: {
      videoWrapper: {
        width: window.innerWidth - (zoomedOutVideoMargin*2),
        height: window.innerHeight - (zoomedOutVideoMargin*2),
        cursor: 'default',
        ease: ViniEaseOut
      },
      overlay: {
        opacity: 1,
        visibility: 'visible'
      },
      endingOverlay: {
        visibility: 'visible',
        opacity: 0.99
      },
      replayButton: {
        delay: 1.6,
        opacity: 1,
        visibility: 'visible',
        rotation: 0,
        y: 0,
        ease: ViniEaseOut
      },
      replayLabel: {
        delay: 2,
        opacity: 1,
        visibility: 'visible',
        y: 0,
        ease: ViniEaseOut
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
        delay: 0.6,
        opacity: 1,
        visibility: 'visible',
        scale: 1
      },
    },
    end: {
      overlay: {
        opacity: 1,
        visibility: 'visible',
      }
    }
  };
};
