const DEBUG_TRACKING = true;

module.exports = (function () {

  function doTrack(type, params) {

    switch (type) {
      case 'event':
        if (!params.action) params.action = 'click';
        ga('send', 'event', params.category, params.action, params.label, params.value);
        // if (DEBUG_TRACKING) console.log("ga('send', 'event', '" + params.category + "', '" + params.action + "', '" + (params.label || undefined) + "', '" + (params.value || undefined) + "')");
        break;
    }
  }

  return {
    trackEvent(options) {
      doTrack('event', options);
    }
  }

})();
