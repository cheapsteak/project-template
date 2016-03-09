export const SET_NARRATIVE_VIDEO_TIME = 'SET_NARRATIVE_VIDEO_TIME';
export const PLAY_NARRATIVE_VIDEO = 'PLAY_NARRATIVE_VIDEO';
export const STOP_NARRATIVE_VIDEO = 'STOP_NARRATIVE_VIDEO';
export const SHOW_NARRATIVE_VIDEO_FULL_CONTROLS = 'SHOW_NARRATIVE_VIDEO_FULL_CONTROLS';
export const HIDE_NARRATIVE_VIDEO_FULL_CONTROLS = 'HIDE_NARRATIVE_VIDEO_FULL_CONTROLS';

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

export function pauseVideo() {
  return  {
    type: STOP_NARRATIVE_VIDEO
  }
}

export function showFullControls() {
  return {
    type: SHOW_NARRATIVE_VIDEO_FULL_CONTROLS
  }
}

export function hideFullControls() {
  return {
    type: HIDE_NARRATIVE_VIDEO_FULL_CONTROLS
  }
}