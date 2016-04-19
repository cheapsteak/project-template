import model from 'common/models/instructional-videos-model.js';
import { handleError } from 'common/actions/handle-error.js';
import _ from 'lodash';

export const SET_GRID_VIDEO = 'SET_GRID_VIDEO';
export const SET_GRID_VIDEO_TIME = 'SET_GRID_VIDEO_TIME';
export const SET_GRID_VIDEO_DURATION = 'SET_GRID_VIDEO_DURATION';
export const PLAY_GRID_VIDEO = 'PLAY_GRID_VIDEO';
export const STOP_GRID_VIDEO = 'STOP_GRID_VIDEO';
export const SET_GRID_VIDEO_OPTIONS = 'SET_GRID_VIDEO_OPTIONS';

export function setVideo(slug, options = {}) {
  const currentVideo = model.get(slug);
  let action;

  if(!currentVideo) {
    action = handleError(`Cannot find video with model slug: ${slug}`);
  } else {
    action = {
      type: SET_GRID_VIDEO,
      currentVideo: currentVideo,
      prevVideo: model.getPrev(slug),
      nextVideo: model.getNext(slug),
      options
    };
  }

  return action;
}

export function setVideoTime(currentTime) {
  return {
    type: SET_GRID_VIDEO_TIME,
    currentTime
  };
}

export function setVideoDuration(duration) {
  return {
    type: SET_GRID_VIDEO_DURATION,
    duration
  };
}

export function setVideoOptions(options) {
  return {
    type: SET_GRID_VIDEO_OPTIONS,
    options
  };
}

export function playVideo() {
  return {
    type: PLAY_GRID_VIDEO
  };
}

export function pauseVideo() {
  return {
    type: STOP_GRID_VIDEO
  };
}
