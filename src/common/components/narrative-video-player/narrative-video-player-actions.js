import dataModel from '../../data/narrative-video.js';

export const SET_NARRATIVE_VIDEO = 'SET_NARRATIVE_VIDEO';
export const SET_NARRATIVE_VIDEO_TIME = 'SET_NARRATIVE_VIDEO_TIME';

export function setVideoTime(time) {
  return {
    type: SET_NARRATIVE_VIDEO_TIME,
    time
  }
}