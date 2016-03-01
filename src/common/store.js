import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import config from '../../config.js';

const reducers = combineReducers({
  photoEssays: require('common/components/photo-essay/photo-essay-reducers.js'),
  fullbrowser: require('common/components/fullbrowser-wrapper/fullbrowser-wrapper-reducers.js')
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