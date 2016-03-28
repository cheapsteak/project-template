export const CLOSE_MOBILE_MENU = 'CLOSE_MOBILE_MENU';
export const OPEN_MOBILE_MENU = 'OPEN__MOBILE_MENU';
export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU';
export const SET_MOBILE_HEADER_COLORS = 'SET_MOBILE_HEADER_COLORS';

export function closeMenu() {
  return {
    type: CLOSE_MOBILE_MENU
  }
}

export function openMenu() {
  return {
    type: OPEN_MOBILE_MENU
  }
}

export function toggleMenuDisplay() {
  return {
    type: TOGGLE_MOBILE_MENU
  }
}

export function setHeaderColors({ color, backgroundColor }) {
  return {
    type: SET_MOBILE_HEADER_COLORS,
    color,
    backgroundColor
  }
}
