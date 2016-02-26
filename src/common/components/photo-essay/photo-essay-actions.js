export const PREV_PHOTO = 'PREV_PHOTO';
export const NEXT_PHOTO = 'NEXT_PHOTO';
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';

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

export function toggleFullscreen() {
  return {
    type: TOGGLE_FULLSCREEN
  };
}
