export const SET_MOBILE_HEADER_OPTIONS = 'SET_MOBILE_HEADER_OPTIONS';

export function setHeaderSettings({ type, color, backgroundColor, title, backButton, bottomBorder }) {
  return {
    type: SET_MOBILE_HEADER_OPTIONS,
    styleType: type,
    color,
    backgroundColor,
    title,
    backButton,
    bottomBorder
  };
}
