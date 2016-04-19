import model from 'common/models/instructional-videos-model.js';
import { handleError } from 'common/actions/handle-error.js';
import _ from 'lodash';

export const SET_CHAPTER_VIDEO = 'SET_CHAPTER_VIDEOS';
export const SET_CHAPTER_VIDEO_TIME = 'SET_CHAPTER_VIDEO_TIME';
export const SET_CHAPTER_VIDEO_DURATION = 'SET_CHAPTER_VIDEO_DURATION';
export const PLAY_CHAPTER_VIDEO = 'PLAY_CHAPTER_VIDEO';
export const STOP_CHAPTER_VIDEO = 'STOP_CHAPTER_VIDEO';
export const SET_CHAPTER_VIDEO_OPTIONS = 'SET_CHAPTER_VIDEO_OPTIONS';
export const TOGGLE_CHAPTER_VIDEO_FULL_BROWSER = 'TOGGLE_CHAPTER_VIDEO_FULL_BROWSER';

export function setVideo(slug, options = {}) {
  const chapterVideo = model.get(slug);
  let action;

  if(!chapterVideo) {
    action = handleError(`Cannot find video with model slug: ${slug}`);
  } else {
    action = {
      type: SET_CHAPTER_VIDEO,
      slug: slug,
      video: chapterVideo,
      options
    };
  }

  return action;
}

export function setVideoTime(videoSlug, currentTime) {
  return {
    type: SET_CHAPTER_VIDEO_TIME,
    slug: videoSlug,
    currentTime
  };
}

export function setVideoDuration(videoSlug, duration) {
  return {
    type: SET_CHAPTER_VIDEO_DURATION,
    slug: videoSlug,
    duration
  };
}

export function setVideoOptions(videoSlug, options) {
  return {
    type: SET_CHAPTER_VIDEO_OPTIONS,
    slug: videoSlug,
    options
  };
}

export function playVideo(videoSlug) {
  return {
    type: PLAY_CHAPTER_VIDEO,
    slug: videoSlug
  };
}

export function pauseVideo(videoSlug) {
  return {
    type: STOP_CHAPTER_VIDEO,
    slug: videoSlug
  };
}

export function toggleFullBrowser(videoSlug) {
  return {
    type: TOGGLE_CHAPTER_VIDEO_FULL_BROWSER,
    slug: videoSlug
  };
}
