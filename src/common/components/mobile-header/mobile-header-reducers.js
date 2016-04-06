import {
  CLOSE_MOBILE_MENU,
  OPEN_MOBILE_MENU,
  TOGGLE_MOBILE_MENU,
  SET_MOBILE_HEADER_OPTIONS
} from './mobile-header-actions.js';

const defState = {
  isMenuOpen: false,
  header: {
    color: 'white',
    backgroundColor: 'transparent',
    bottomBorder: false,
    backButton: false
  }
};

function header (state = defState.header, action) {
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

export default function learnMoreModal(state = defState, action) {
  switch(action.type) {
    case CLOSE_MOBILE_MENU:
      return Object.assign({}, state, { isMenuOpen: false });
    case OPEN_MOBILE_MENU:
      return Object.assign({}, state, { isMenuOpen: true });
    case TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isMenuOpen: !state.isMenuOpen });
    case SET_MOBILE_HEADER_OPTIONS:
      return Object.assign({}, state, { header: header(state.header, action)});
    default:
      return state;
  }
}