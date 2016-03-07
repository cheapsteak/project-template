import dataModel from '../../data/instructional-videos.js';

export const SET_INSTRUCTIONAL_VIDEO = 'SET_INSTRUCTIONAL_VIDEO';
export const SET_INSTRUCTIONAL_VIDEO_TIME = 'SET_INSTRUCTIONAL_VIDEO_TIME';

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