import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import config from '../../config.js';

const reducers = combineReducers({
  photoEssays: require('common/components/photo-essay/photo-essay-reducers.js'),
  photos: require('common/components/photo-essay/photo-essay-reducers.js'),
  panoramas: require('common/components/panorama-gallery/panorama-gallery-reducers.js')
});

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    (config.env || 'local') === 'local' && window.devToolsExtension 
      ? window.devToolsExtension() 
      : undefined
  )
);