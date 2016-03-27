import { combineReducers, createStore } from 'redux';
import config from '../../config.js';

console.log(window.navigator.userAgent);
const MobileDetect = require('mobile-detect');
const md = new MobileDetect(window.navigator.userAgent);

const reducers = combineReducers({
  photoEssay: require('common/components/photo-essay/photo-essay-reducers.js'),
  panorama: require('common/components/panorama/panorama-reducers.js'),
  narrativeVideo: require('common/components/video-players/narrative/narrative-video-player-reducers.js'),
  instructionalVideos: require('common/components/video-players/instructional/instructional-video-player-reducers.js'),
  showLearnMoreModal: require('common/components/learn-more-modal/learn-more-modal-reducers.js'),
  mobileHeaderMenu: md.mobile() && require('common/components/mobile-header/mobile-header-reducers.js')
});

export default createStore(
  reducers,
  (config.env || 'local') === 'local' && window.devToolsExtension
      ? window.devToolsExtension()
      : undefined
);
