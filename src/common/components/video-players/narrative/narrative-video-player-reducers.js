import {
  SET_NARRATIVE_VIDEO_TIME,
  SET_NARRATIVE_VIDEO_INFO,
  PLAY_NARRATIVE_VIDEO,
  STOP_NARRATIVE_VIDEO,
  SHOW_NARRATIVE_VIDEO_FULL_CONTROLS,
  HIDE_NARRATIVE_VIDEO_FULL_CONTROLS,
  SET_NARRATIVE_VIDEO_CIRCLE_CTA,
  SET_NARRATIVE_VIDEO_DURATION,
  SET_NARRATIVE_VIDEO_OPTIONS
} from './narrative-video-player-actions.js';

import dataModel from '../../../data/narrative-video.js';

const defOptions = {
  isPlaying: false,
  isMuted: false,
  useFullControls: false
}

function video(state = Object.assign({}, defOptions, dataModel), action) {
  switch (action.type) {
    case SET_NARRATIVE_VIDEO_CIRCLE_CTA:
      return Object.assign({}, state, { circleCTA: action.circleCTA });

    case SHOW_NARRATIVE_VIDEO_FULL_CONTROLS:
      return Object.assign({}, state, { useFullControls: true });

    case HIDE_NARRATIVE_VIDEO_FULL_CONTROLS:
      return Object.assign({}, state, { useFullControls: false });

    case PLAY_NARRATIVE_VIDEO:
      return Object.assign({}, state, { isPlaying: true });

    case STOP_NARRATIVE_VIDEO:
      return Object.assign({}, state, { isPlaying: false });

    case SET_NARRATIVE_VIDEO_TIME:
      return Object.assign({}, state, { currentTime: action.time });

    case SET_NARRATIVE_VIDEO_DURATION:
      return Object.assign({}, state, { duration: action.duration });

    case SET_NARRATIVE_VIDEO_OPTIONS:
      return Object.assign({}, state, action.options);

    default:
      return state;
  }
}

export default video;
