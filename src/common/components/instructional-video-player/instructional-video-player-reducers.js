import { SET_INSTRUCTIONAL_VIDEO, SET_INSTRUCTIONAL_VIDEO_TIME } from './instructional-video-player-actions.js';

function videos(state = {}, action) {
  switch (action.type) {
    case SET_INSTRUCTIONAL_VIDEO:
      if (!action.id) return state;

      return Object.assign({}, state, { [action.id]: Object.assign({ startTime: action.time || 0 }, action.data) });
    case SET_INSTRUCTIONAL_VIDEO_TIME:
      if (!action.id || typeof action.time !== 'number') return state;

      return Object.assign({}, state, { [action.id]: Object.assign({}, state[action.id], { startTime: action.time }) });
    default:
      return state;
  }
}

export default videos;
