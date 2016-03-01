export const ENTER_FULLBROWSER = 'ENTER_FULLBROWSER';
export const EXIT_FULLBROWSER = 'EXIT_FULLBROWSER';
export const SET_FULLBROWSER_COMPONENT = 'SET_FULLBROWSER_COMPONENT';

export function setFULLBrowserComponent (Component, props) {
  return {
    type: SET_FULLBROWSER_COMPONENT,
    Component,
    props
  }
}

export function enterFullBrowser(Component, props) {
  return {
    type: ENTER_FULLBROWSER,
    Component,
    props
  };
}

export function exitFullBrowser () {
  return {
    type: EXIT_FULLBROWSER
  };
}
