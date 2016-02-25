import Config from '../../../config.js';
import { combineReducers, createStore } from 'redux';

const reducers = combineReducers({
  photos: require('../reducers/photos/index.js')
});

export default createStore(
  reducers,
  undefined,
  (Config.env || 'local') === 'local' && window.devToolsExtension 
    ? window.devToolsExtension() 
    : undefined
);