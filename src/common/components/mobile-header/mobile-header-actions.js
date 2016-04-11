export const SET_MOBILE_HEADER_OPTIONS = 'SET_MOBILE_HEADER_OPTIONS';

export function setHeaderSettings({ color, backgroundColor, title, backButton = false, bottomBorder = false }) {
  return {
    type: SET_MOBILE_HEADER_OPTIONS,
    color,
    backgroundColor,
    title,
    backButton,
    bottomBorder
  };
}
