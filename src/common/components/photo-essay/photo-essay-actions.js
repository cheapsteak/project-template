import dataModel from '../../data/photo-essays.js';

export const PREV_PHOTO = 'PREV_PHOTO';
export const NEXT_PHOTO = 'NEXT_PHOTO';
export const SET_PHOTO_ESSAY = 'SET_PHOTO_ESSAY';


export function setPrevPhoto(id) {
  return {
    type: PREV_PHOTO,
    id
  };
}

export function setNextPhoto(id) {
  return {
    type: NEXT_PHOTO,
    id
  };
}

export function setPhotoEssay(id, data) {
  return {
    type: SET_PHOTO_ESSAY,
    id,
    data: dataModel[id]
  }
}