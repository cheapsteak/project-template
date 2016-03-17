import { combineReducers, createStore } from 'redux';
import config from '../../config.js';

const reducers = combineReducers({
  photoEssay: require('common/components/photo-essay/photo-essay-reducers.js'),
  panoramas: require('common/components/panorama-gallery/panorama-gallery-reducers.js'),
  narrativeVideo: require('common/components/video-players/narrative/narrative-video-player-reducers.js'),
  instructionalVideos: require('common/components/video-players/instructional/instructional-video-player-reducers.js')
});

export default createStore(
  reducers,
  (config.env || 'local') === 'local' && window.devToolsExtension 
      ? window.devToolsExtension() 
      : undefined
);