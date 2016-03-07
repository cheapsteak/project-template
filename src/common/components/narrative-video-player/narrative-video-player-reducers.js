import { SET_NARRATIVE_VIDEO, SET_NARRATIVE_VIDEO_TIME } from './narrative-video-player-actions.js';
import dataModel from '../../data/narrative-video.js';

function videos(state = dataModel, action) {
  switch (action.type) {
    case SET_NARRATIVE_VIDEO_TIME:
      if (typeof action.time !== 'number') return state;

      return Object.assign({}, state, { currentTime: action.time });
    default:
      return state;
  }
}

export default videos;
