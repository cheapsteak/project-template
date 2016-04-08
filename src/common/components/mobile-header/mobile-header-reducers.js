import {
  SET_MOBILE_HEADER_OPTIONS
} from './mobile-header-actions.js';

const defState = {
  color: '#ffffff',
  backgroundColor: 'rgba(255,255,255,0)',
  bottomBorder: false,
  backButton: false
};

export default function header (state = defState, action) {
  switch(action.type) {
    case SET_MOBILE_HEADER_OPTIONS:
      return Object.assign({}, state, {
        color: action.color,
        backgroundColor: action.backgroundColor,
        title: action.title,
        bottomBorder: action.bottomBorder,
        backButton: action.backButton
      });
    default:
      return state;
  }
}