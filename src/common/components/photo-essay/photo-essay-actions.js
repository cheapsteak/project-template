import dataModel from '../../data/photo-essays.js';
import data from 'common/models/photo-essay-model.js'

export const PREV_PHOTO = 'PREV_PHOTO';
export const NEXT_PHOTO = 'NEXT_PHOTO';
export const SET_PHOTO_ESSAY = 'SET_PHOTO_ESSAY';

export function setPhotoEssay(slug) {
  return {
    type: SET_PHOTO_ESSAY,
    data: data.get(slug)
  }
}

export function setPrevPhoto() {
  return {
    type: PREV_PHOTO
  };
}

export function setNextPhoto() {
  return {
    type: NEXT_PHOTO
  };
}
