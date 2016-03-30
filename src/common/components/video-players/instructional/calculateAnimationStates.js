export default function calculateAnimationStates (els) {
  const zoomedInRect = els.root.getBoundingClientRect();
  const zoomedOutVideoMargin = 40;
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
        opacity: 0
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
      closeButton: {
        y: -els.closeButton.offsetHeight
      },
      moreAboutCTA: {
        opacity: 0
      },
      controls: {
        y: els.controls.offsetHeight,
        display: 'none'
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
        opacity: 0.4
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
      closeButton: {
        delay: 0.5,
        y: -1
      },
      moreAboutCTA: {
        delay: 0.3,
        opacity: 1
      },
      controls: {
        y: 0,
        display: 'flex'
      }
    },
    end: {
      overlay: {
        opacity: 1
      }
    }
  };
};