export const PREV_PANORAMA = 'PREV_PANORAMA';
export const NEXT_PANORAMA = 'NEXT_PANORAMA';

export function setPrevPanorama() {
  return {
    type: PREV_PANORAMA
  };
}

export function setNextPanorama() {
  return {
    type: NEXT_PANORAMA
  };
}
