import tracking from 'common/utils/tracking.js';
const intervalLength = 1000 * 5;

export default function createVideoAnalyticsTracker(videoEl, videoTrackingId, trackingLabel) {
  !localStorage.getItem(videoTrackingId) && localStorage.setItem(videoTrackingId, 0);
  let timeWatched = parseFloat(localStorage.getItem(videoTrackingId));
  let previousTimeSent = timeWatched;
  let previousTime;
  let trackingInterval;

  const sendAnalytics = () => {
    if(timeWatched === previousTimeSent) {
      return;
    }

    localStorage.setItem(videoTrackingId, timeWatched);
    tracking.trackEvent({
      category: videoTrackingId,
      action: 'Watched',
      label: trackingLabel,
      value: Math.round(timeWatched/1000)
    });
    previousTimeSent = timeWatched;
  };

  const trackTimeWatched = () => {
    const now = new Date().getTime();
    timeWatched += now - previousTime;
    previousTime = now;
  };

  function handleVideoPlay () {
    previousTime = new Date().getTime();
    videoEl.addEventListener('timeupdate', trackTimeWatched);
  }

  function handleVideoPause () {
    videoEl.removeEventListener('timeupdate', trackTimeWatched);
  }

  return {
    track: function () {
      videoEl.addEventListener('play', handleVideoPlay);
      videoEl.addEventListener('pause', handleVideoPause);
      trackingInterval = setInterval(sendAnalytics, intervalLength);
    },
    cleanup: function cleanup() {
      videoEl.removeEventListener('timeupdate', trackTimeWatched);
      videoEl.removeEventListener('play', handleVideoPlay);
      videoEl.removeEventListener('pause', handleVideoPause);
      clearInterval(trackingInterval);
    }
  }
}