import { ENTER_FULLBROWSER, EXIT_FULLBROWSER, SET_FULLBROWSER_COMPONENT } from './fullbrowser-wrapper-actions.js';

const defState = {
  isFullBrowser: false,
  component: undefined,
  componentProps: undefined
};

module.exports = (state = defState, action) => {
  switch (action.type) {
    case ENTER_FULLBROWSER:
      return { isFullBrowser: true, component: action.component, componentProps: action.componentProps }
    case EXIT_FULLBROWSER:
      return Object.assign({}, state, { isFullBrowser: false });
    case SET_FULLBROWSER_COMPONENT:
      return Object.assign({}, state, { component: action.component, componentProps: action.componentProps });
    default:
      return state;
  }
};
