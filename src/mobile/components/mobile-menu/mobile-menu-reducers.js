import {
  CLOSE_MOBILE_MENU,
  OPEN_MOBILE_MENU,
  TOGGLE_MOBILE_MENU,
} from './mobile-menu-actions.js';

const defState = {
  isOpen: false,
};

export default function menu(state = defState, action) {
  switch(action.type) {
    case CLOSE_MOBILE_MENU:
      return Object.assign({}, state, { isOpen: false });
    case OPEN_MOBILE_MENU:
      return Object.assign({}, state, { isOpen: true });
    case TOGGLE_MOBILE_MENU:
      return Object.assign({}, state, { isOpen: !state.isOpen });
    default:
      return state;
  }
}