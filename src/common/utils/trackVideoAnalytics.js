const intervalLength = 1000 * 5;

export default function trackVideoAnalytics(videoStorageId, videoEl) {
  let timeWatched = parseFloat(localStorage.getItem(videoStorageId) || 0);
  let previousTimeSent = timeWatched;
  let previousTime;
  let trackingInterval;

  const sendAnalytics = () => {
    if(timeWatched === previousTimeSent) {
      return;
    }
    localStorage.setItem(videoStorageId, timeWatched);
    console.log('fake-ga sending time', Math.round(timeWatched/1000));
    previousTimeSent = timeWatched;
  };

  const trackTimeWatched = () => {
    const now = new Date().getTime();
    timeWatched += now - previousTime;
    previousTime = now;
  };

  !localStorage.getItem(videoStorageId) && localStorage.setItem(videoStorageId, 0);

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
      video.removeEventListener('timeupdate', trackTimeWatched);
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('pause', handleVideoPause);
      clearInterval(trackingInterval);
    }
  }
}