import {
  SET_NARRATIVE_VIDEO_TIME,
  PLAY_NARRATIVE_VIDEO,
  STOP_NARRATIVE_VIDEO,
  SHOW_NARRATIVE_VIDEO_FULL_CONTROLS,
  HIDE_NARRATIVE_VIDEO_FULL_CONTROLS
} from './narrative-video-player-actions.js';

import dataModel from '../../../data/narrative-video.js';

function videos(state = dataModel, action) {
  switch (action.type) {
    case SHOW_NARRATIVE_VIDEO_FULL_CONTROLS:
      return Object.assign({}, state, { isFullControls: true });

    case HIDE_NARRATIVE_VIDEO_FULL_CONTROLS:
      return Object.assign({}, state, { isFullControls: false });
    
    case PLAY_NARRATIVE_VIDEO:
      return Object.assign({}, state, { isPlaying: true });

    case STOP_NARRATIVE_VIDEO:
      return Object.assign({}, state, { isPlaying: false });

    case SET_NARRATIVE_VIDEO_TIME:
      if (typeof action.time !== 'number') return state;

      return Object.assign({}, state, { currentTime: action.time });
    default:
      return state;
  }
}

export default videos;
