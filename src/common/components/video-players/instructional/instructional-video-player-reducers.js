import { 
  SET_INSTRUCTIONAL_VIDEO,
  SET_INSTRUCTIONAL_VIDEO_TIME,
  SET_INSTRUCTIONAL_VIDEO_DURATION,
  PLAY_INSTRUCTIONAL_VIDEO,
  STOP_INSTRUCTIONAL_VIDEO,
  INSTRUCTIONAL_VIDEO_ERROR
} from './instructional-video-player-actions.js';

import { ERROR } from 'common/actions/handleError.js';

const defState = {
  currentVideo: undefined,
  nextVideo: undefined
};

const defVideoValues = {
  currentTime: 0,
  duration: undefined,
  isPlaying: false
};

function video(state = {}, action) {
  switch(action.type) {
    case PLAY_INSTRUCTIONAL_VIDEO:
      return Object.assign({}, state, { isPlaying: true });

    case STOP_INSTRUCTIONAL_VIDEO:
      return Object.assign({}, state, { isPlaying: false });

    case SET_INSTRUCTIONAL_VIDEO:
      return Object.assign({}, defVideoValues, action.video);

    case SET_INSTRUCTIONAL_VIDEO_TIME:
      return Object.assign({}, state, { currentTime: action.currentTime });

    case SET_INSTRUCTIONAL_VIDEO_DURATION:
      return Object.assign({}, state, { duration: action.duration });
    default:
      return state;
  }
}

function videos(state = defState, action) {
  switch (action.type) {
    case SET_INSTRUCTIONAL_VIDEO:
      return Object.assign({}, state, { 
        currentVideo: video(state.currentVideo, { type: action.type, video: action.currentVideo }),
        prevVideo: video(state.currentVideo, { type: action.type, video: action.prevVideo }),
        nextVideo: video(state.currentVideo, { type: action.type, video: action.nextVideo })
      });

    case PLAY_INSTRUCTIONAL_VIDEO:
    case STOP_INSTRUCTIONAL_VIDEO:
    case SET_INSTRUCTIONAL_VIDEO_TIME:
    case SET_INSTRUCTIONAL_VIDEO_DURATION:
      return Object.assign({}, state, { 
        currentVideo: video(state.currentVideo, action)
      });

    case ERROR:
      console.warn('Failed to set video', action.error);
      console.trace();
      return state;

    default:
      return state;
  }
}

export default videos;
