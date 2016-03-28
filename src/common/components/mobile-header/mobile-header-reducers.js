import {
  CLOSE_MOBILE_MENU,
  OPEN_MOBILE_MENU,
  TOGGLE_MOBILE_MENU,
  SET_MOBILE_HEADER_COLORS
} from './mobile-header-actions.js';

const defState = {
  isMenuOpen: false,
  header: {
    color: 'white',
    backgroundColor: 'transparent'
  }
};

export default function learnMoreModal(state = defState, action) {
  switch(action.type) {
    case CLOSE_MOBILE_MENU:
      return Object.assign({}, state, { isMenuOpen: false });
    case OPEN_MOBILE_MENU:
      return Object.assign({}, state, { isMenuOpen: true });
    case TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isMenuOpen: !state.isMenuOpen });
    case SET_MOBILE_HEADER_COLORS:
      return Object.assign({}, state, { header: {
        color: action.color,
        backgroundColor: action.backgroundColor
      }})
    default:
      return state;
  }
}