import { combineReducers, createStore } from 'redux';
import config from '../../config.js';
import detect from 'common/utils/detect';

const MobileDetect = require('mobile-detect');
const md = new MobileDetect(window.navigator.userAgent);

const reducers = combineReducers(
  !detect.isPhone
  ? {
      photoEssay: require('common/components/photo-essay/photo-essay-reducers.js'),
      panorama: require('common/components/panorama/panorama-reducers.js'),
      narrativeVideo: require('common/components/video-players/narrative/narrative-video-player-reducers.js'),
      instructionalVideos: require('common/components/video-players/instructional/instructional-video-player-reducers.js'),
      showLearnMoreModal: require('common/components/learn-more-modal/learn-more-modal-reducers.js'),
    }
  : {
      mobileHeader: require('common/components/mobile-header/mobile-header-reducers.js'),
      mobileMenu: require('common/components/mobile-menu/mobile-menu-reducers.js'),
      mobileChapters: require('../mobile/pages/chapters/chapters-reducers.js')
    }
);

const store = createStore(
  reducers,
  (config.env || 'local') === 'local' && window.devToolsExtension
      ? window.devToolsExtension()
      : undefined
);

export default store;

export function getCurrentChapter () {
  const state = store.getState();
  if (!state.narrativeVideo || state.narrativeVideo.currentTime === undefined) {
    return {
      title: '',
      route: '/'
    };
  }
  const { currentTime } = state.narrativeVideo;
  const chapters = require('common/models/chapters-model.js').getAll();
  const currentChapter = chapters.reduce(function (previousQualitfyingChapter, chapter) {
    return currentTime >= chapter.time ? chapter :  previousQualitfyingChapter;
  }, undefined);

  return currentChapter;

}
