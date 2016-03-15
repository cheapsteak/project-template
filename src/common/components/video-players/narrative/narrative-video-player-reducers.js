import {
  SET_NARRATIVE_VIDEO_TIME,
  PLAY_NARRATIVE_VIDEO,
  STOP_NARRATIVE_VIDEO,
  SHOW_NARRATIVE_VIDEO_FULL_CONTROLS,
  HIDE_NARRATIVE_VIDEO_FULL_CONTROLS,
  SET_NARRATIVE_VIDEO_CIRCLE_CTA
} from './narrative-video-player-actions.js';

import dataModel from '../../../data/narrative-video.js';

function video(state = dataModel, action) {
  switch (action.type) {
    case SET_NARRATIVE_VIDEO_CIRCLE_CTA:
      return Object.assign({}, state, { circleCTA: action.circleCTA });

    case SHOW_NARRATIVE_VIDEO_FULL_CONTROLS:
      return Object.assign({}, state, { isFullControls: true });

    case HIDE_NARRATIVE_VIDEO_FULL_CONTROLS:
      return Object.assign({}, state, { isFullControls: false });

    case PLAY_NARRATIVE_VIDEO:
      return Object.assign({}, state, { isPlaying: true });

    case STOP_NARRATIVE_VIDEO:
      return Object.assign({}, state, { isPlaying: false });

    case SET_NARRATIVE_VIDEO_TIME:
      return Object.assign({}, state, { currentTime: action.time });

    default:
      return state;
  }
}

export default video;
