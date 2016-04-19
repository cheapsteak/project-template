import {
  SET_CHAPTER_VIDEO,
  SET_CHAPTER_VIDEO_TIME,
  SET_CHAPTER_VIDEO_DURATION,
  PLAY_CHAPTER_VIDEO,
  STOP_CHAPTER_VIDEO,
  SET_CHAPTER_VIDEO_OPTIONS
} from './chapter-video-player-actions.js';

import { ERROR } from 'common/actions/handle-error.js';


const defVideoState = {
  init: true,
  src: undefined,
  currentTime: 0,
  duration: undefined,
  isPlaying: false,
  isMuted: false,
  useFullControls: false,
  isFullBrowser: false
};

function video(state = {}, action) {

  switch(action.type) {
    case PLAY_CHAPTER_VIDEO:
      return Object.assign({}, state, { isPlaying: true, init: false });

    case STOP_CHAPTER_VIDEO:
      return Object.assign({}, state, { isPlaying: false });

    case SET_CHAPTER_VIDEO:
      return Object.assign({}, defVideoState, action.video, action.options || {});

    case SET_CHAPTER_VIDEO_OPTIONS:
      return Object.assign({}, state, action.options);

    case SET_CHAPTER_VIDEO_TIME:
      return Object.assign({}, state, { currentTime: action.currentTime });

    case SET_CHAPTER_VIDEO_DURATION:
      return Object.assign({}, state, { duration: action.duration });

    case ERROR:
      console.warn('Failed to set video', action.error);
      console.trace();
      return state;

    default:
      return state;
  }
}

function videos(state = {}, action) {
  switch (action.type) {
    case SET_CHAPTER_VIDEO:
      return Object.assign({}, state, {
        [action.slug]: video(state[action.slug], action)
      });

    case PLAY_CHAPTER_VIDEO:
    case STOP_CHAPTER_VIDEO:
    case SET_CHAPTER_VIDEO_TIME:
    case SET_CHAPTER_VIDEO_OPTIONS:
    case SET_CHAPTER_VIDEO_DURATION:
      if(!state[action.slug]) {
        console.log('state',state);
            
        console.warn('Attempting to set non-existant video with slug:', action.slug);
        return state;
      }
      return Object.assign({}, state, {
        [action.slug]: video(state[action.slug], action)
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
