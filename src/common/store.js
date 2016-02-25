import { combineReducers, createStore } from 'redux';
import config from '../../config.js';

const reducers = combineReducers({
  photos: require('common/components/photo-essay/photo-essay-reducers.js')
});

export default createStore(
  reducers,
  undefined,
  (config.env || 'local') === 'local' && window.devToolsExtension 
    ? window.devToolsExtension() 
    : undefined
);