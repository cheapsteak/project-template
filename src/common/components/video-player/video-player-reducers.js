import { SET_VIDEO } from './video-player-actions.js';

function videos(state = {}, action) {
  switch (action.type) {
    case SET_VIDEO:
      return Object.assign({}, state, { [action.id]: Object.assign({ startTime: 0 }, action.data) });
    default:
      return state;
  }
}


export default videos;
