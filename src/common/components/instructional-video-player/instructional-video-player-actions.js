import dataModel from '../../data/instructional-videos.js';

export const SET_INSTRUCTIONAL_VIDEO = 'SET_INSTRUCTIONAL_VIDEO';
export const SET_INSTRUCTIONAL_VIDEO_TIME = 'SET_INSTRUCTIONAL_VIDEO_TIME';
export const SET_INSTRUCTIONAL_VIDEO_DURATION = 'SET_INSTRUCTIONAL_VIDEO_DURATION';
export const PLAY_INSTRUCTIONAL_VIDEO = 'PLAY_INSTRUCTIONAL_VIDEO';
export const STOP_INSTRUCTIONAL_VIDEO = 'STOP_INSTRUCTIONAL_VIDEO';


export function setVideo(id, data) {
  return {
    type: SET_INSTRUCTIONAL_VIDEO,
    id,
    data: dataModel[id]
  }
}

export function setVideoTime(id, time) {
  return {
    type: SET_INSTRUCTIONAL_VIDEO_TIME,
    id,
    time
  }
}

export function setVideoDuration(id, time) {
  return {
    type: SET_INSTRUCTIONAL_VIDEO_DURATION,
    id,
    time
  }
}

export function playVideo(id) {
  return {
    type: PLAY_INSTRUCTIONAL_VIDEO,
    id
  }
}

export function pauseVideo(id) {
  return {
    type: STOP_INSTRUCTIONAL_VIDEO,
    id
  }
}