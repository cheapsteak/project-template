import dataModel from '../../../data/instructional-videos.js';
import handleError from 'common/actions/handleError.js';
import _ from 'lodash';

export const SET_INSTRUCTIONAL_VIDEO = 'SET_INSTRUCTIONAL_VIDEO';
export const SET_INSTRUCTIONAL_VIDEO_TIME = 'SET_INSTRUCTIONAL_VIDEO_TIME';
export const SET_INSTRUCTIONAL_VIDEO_DURATION = 'SET_INSTRUCTIONAL_VIDEO_DURATION';
export const PLAY_INSTRUCTIONAL_VIDEO = 'PLAY_INSTRUCTIONAL_VIDEO';
export const STOP_INSTRUCTIONAL_VIDEO = 'STOP_INSTRUCTIONAL_VIDEO';

export function setVideo(id) {
  const currentVideoIdx = _.findIndex(dataModel, { id });
  let action;

  if(currentVideoIdx === -1) {
    action = handleError(`Cannot find video with model id: ${id}`);
  } else {
    action = {
      type: SET_INSTRUCTIONAL_VIDEO,
      currentVideo: dataModel[currentVideoIdx],
      nextVideo: dataModel[currentVideoIdx < dataModel.length ? currentVideoIdx : 0]
    };
  } 

  return action;
}

export function setVideoTime(currentTime) {
  return {
    type: SET_INSTRUCTIONAL_VIDEO_TIME,
    currentTime
  }
}

export function setVideoDuration(duration) {
  return {
    type: SET_INSTRUCTIONAL_VIDEO_DURATION,
    duration
  }
}

export function playVideo() {
  return {
    type: PLAY_INSTRUCTIONAL_VIDEO
  }
}

export function pauseVideo() {
  return {
    type: STOP_INSTRUCTIONAL_VIDEO
  }
}
