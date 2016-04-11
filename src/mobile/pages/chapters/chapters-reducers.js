import {
  CLOSE_CHAPTERS,
  TOGGLE_CHAPTER_DISPLAY,
} from './chapters-actions.js';

import model from '../../model/chapters-model.js';

const defState = model.getAll().map((chapter) => ({ ...chapter, isOpen: false }));

function chapters(state = defState, action) {
  switch (action.type) {
    case CLOSE_CHAPTERS:
      return state.map(chapter => Object.assign({}, chapter, { isOpen: false }));

    case TOGGLE_CHAPTER_DISPLAY:
      const chapterIndex = state.findIndex((chapter) => chapter.name === action.chapterName);

      return [
        ...state.slice(0, chapterIndex),
        Object.assign({}, state[chapterIndex], { isOpen: !state[chapterIndex].isOpen }),
        ...state.slice(chapterIndex + 1)
      ]

    default:
      return state;
  }
}

export default chapters;