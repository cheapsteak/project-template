import { combineReducers, createStore } from 'redux';
import config from '../../config.js';

const reducers = combineReducers({
  photoEssays: require('common/components/photo-essay/photo-essay-reducers.js'),
  panoramas: require('common/components/panorama-gallery/panorama-gallery-reducers.js'),
  videos: require('common/components/video-player/video-player-reducers.js')
});

export default createStore(
  reducers,
  (config.env || 'local') === 'local' && window.devToolsExtension 
      ? window.devToolsExtension() 
      : undefined
);