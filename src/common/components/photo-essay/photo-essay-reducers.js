import { PREV_PHOTO, NEXT_PHOTO, SET_PHOTO_ESSAY } from './photo-essay-actions.js';

function photoEssay(state, action) {
  switch (action.type) {
    case SET_PHOTO_ESSAY:
      return Object.assign({ index: 0 }, action.data);
    case PREV_PHOTO:
      return Object.assign({}, state, { index: state.index > 0 ? state.index - 1 : state.photos.length - 1 });
    case NEXT_PHOTO:
      return Object.assign({}, state, { index: (state.index + 1) % state.photos.length});
    default:
      return state;
  }
}

function photoEssays(state = {}, action) {
  return Object.assign({}, state, { [action.id]: photoEssay(state[action.id], action) });
};

export default photoEssays;
