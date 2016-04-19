import { 
  SET_GRID_VIDEO,
  SET_GRID_VIDEO_TIME,
  SET_GRID_VIDEO_DURATION,
  PLAY_GRID_VIDEO,
  STOP_GRID_VIDEO,
  SET_GRID_VIDEO_OPTIONS
} from './grid-video-player-actions.js';

import { ERROR } from 'common/actions/handle-error.js';

const defState = {
  currentVideo: undefined,
  prevVideo: undefined,
  nextVideo: undefined
};

const defVideoValues = {
  init: true,
  currentTime: 0,
  duration: undefined,
  isPlaying: false,
  isMuted: false,
  useFullControls: false
};

function video(state = {}, action) {

  switch(action.type) {
    case PLAY_GRID_VIDEO:
      return Object.assign({}, state, { isPlaying: true, init: false });

    case STOP_GRID_VIDEO:
      return Object.assign({}, state, { isPlaying: false });

    case SET_GRID_VIDEO:
      return Object.assign({}, defVideoValues, action.video, action.options || {});

    case SET_GRID_VIDEO_OPTIONS:
      return Object.assign({}, state, action.options);

    case SET_GRID_VIDEO_TIME:
      return Object.assign({}, state, { currentTime: action.currentTime });

    case SET_GRID_VIDEO_DURATION:
      return Object.assign({}, state, { duration: action.duration });

    default:
      return state;
  }
}

function videos(state = defState, action) {
  switch (action.type) {
    case SET_GRID_VIDEO:
      return Object.assign({}, state, { 
        currentVideo: video(state.currentVideo, { type: action.type, video: action.currentVideo, options: action.options }),
        prevVideo: video(state.currentVideo, { type: action.type, video: action.prevVideo, options: action.options }),
        nextVideo: video(state.currentVideo, { type: action.type, video: action.nextVideo, options: action.options })
      });

    case PLAY_GRID_VIDEO:
    case STOP_GRID_VIDEO:
    case SET_GRID_VIDEO_TIME:
    case SET_GRID_VIDEO_OPTIONS:
    case SET_GRID_VIDEO_DURATION:
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
