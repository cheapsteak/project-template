import dataModel from '../../data/narrative-video.js';

export const SET_NARRATIVE_VIDEO_TIME = 'SET_NARRATIVE_VIDEO_TIME';
export const PLAY_NARRATIVE_VIDEO = 'PLAY_NARRATIVE_VIDEO';
export const STOP_NARRATIVE_VIDEO = 'STOP_NARRATIVE_VIDEO';

export function setVideoTime(time) {
  return {
    type: SET_NARRATIVE_VIDEO_TIME,
    time
  }
}

export function playVideo() {
  return {
    type: PLAY_NARRATIVE_VIDEO
  }
}

export function stopVideo() {
  return  {
    type: STOP_NARRATIVE_VIDEO
  }
}