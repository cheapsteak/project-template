import {SET_PANORAMA} from './panorama-actions.js';
import model from 'common/models/panorama-model';

function panorama(state = {}, action) {
  switch (action.type) {
    case SET_PANORAMA:
      return {...action.data};
    default:
      return state;
  }
}

export default panorama;
