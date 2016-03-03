import dataModel from '../../data/videos.js';

export const SET_VIDEO = 'SET_VIDEO';

export function setVideo(id, data) {
  return {
    type: SET_VIDEO,
    id,
    data: dataModel[id]
  }
}