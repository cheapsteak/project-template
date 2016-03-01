import Promise from 'bluebird';
import dataModel from '../../data/photo-essays.js';

export const PREV_PHOTO = 'PREV_PHOTO';
export const NEXT_PHOTO = 'NEXT_PHOTO';
export const REQUEST_ESSAY = 'REQUEST_ESSAY';
export const RECIEVE_ESSAY = 'RECIEVE_ESSAY';


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

export function requestPhotoEssay(id) {    
  return {
    type: REQUEST_ESSAY,
    id
  }
}

export function recievePhotoEssay(id, data) {
  return {
    type: RECIEVE_ESSAY,
    id,
    data
  }
}

export function loadPhotoEssay(id) {
  return (dispatch) => {
    dispatch(requestPhotoEssay(id));

    return new Promise((resolve, reject) => {
      if(!dataModel[id]) {
        reject(id);
      }

      resolve(dataModel[id]);
    })
    .then((data) =>{
      dispatch(recievePhotoEssay(id, data));
    })
  }
}