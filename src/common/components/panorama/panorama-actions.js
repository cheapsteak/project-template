import model from '../../models/panorama-model.js'

export const SET_PANORAMA = 'SET_PANORAMA';

export function setPanorama(slug) {
  return {
    type: SET_PANORAMA,
    data: model.get(slug)
  }
}
