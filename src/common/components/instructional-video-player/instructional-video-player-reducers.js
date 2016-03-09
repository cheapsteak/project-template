import { 
  SET_INSTRUCTIONAL_VIDEO,
  SET_INSTRUCTIONAL_VIDEO_TIME,
  SET_INSTRUCTIONAL_VIDEO_DURATION,
  PLAY_INSTRUCTIONAL_VIDEO,
  STOP_INSTRUCTIONAL_VIDEO
} from './instructional-video-player-actions.js';

function videos(state = {}, action) {
  switch (action.type) {

    case PLAY_INSTRUCTIONAL_VIDEO:
      return Object.assign({}, state, { [action.id]: Object.assign({}, state[action.id], { isPlaying: true })});

    case STOP_INSTRUCTIONAL_VIDEO:
      return Object.assign({}, state, { [action.id]: Object.assign({}, state[action.id], { isPlaying: false })});

    case SET_INSTRUCTIONAL_VIDEO:
      if (!action.id) return state;

      return Object.assign({}, state, { [action.id]: Object.assign({ currentTime: action.time || 0 }, action.data) });

    case SET_INSTRUCTIONAL_VIDEO_TIME:
      if (!action.id || typeof action.time !== 'number') return state;

      return Object.assign({}, state, { [action.id]: Object.assign({}, state[action.id], { currentTime: action.time }) });

    case SET_INSTRUCTIONAL_VIDEO_DURATION:
      if (!action.id || typeof action.time !== 'number') return state;

      return Object.assign({}, state, { [action.id]: Object.assign({}, state[action.id], { duration: action.time }) });

    default:
      return state;
  }
}

export default videos;
