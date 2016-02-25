import store from '../store/index.js';
export const PREV_PHOTO = 'PREV_PHOTO';
export const NEXT_PHOTO = 'NEXT_PHOTO';
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';

export function setPrevPhoto() {
  store.dispatch( { type: PREV_PHOTO } );
}

export function setNextPhoto() {
  store.dispatch( { type: NEXT_PHOTO } );
}

export function toggleFullscreen() {
  store.dispatch( { type: TOGGLE_FULLSCREEN } );
}