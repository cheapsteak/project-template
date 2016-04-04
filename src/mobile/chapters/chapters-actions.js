export const CLOSE_CHAPTERS = 'CLOSE_CHAPTERS';
export const TOGGLE_CHAPTER_DISPLAY = 'TOGGLE_CHAPTER_DISPLAY';

export function closeAllChapters() {
  return {
    type: CLOSE_CHAPTERS
  }
}


export function toggleChapterDisplay(chapterName) {
  return {
    type: TOGGLE_CHAPTER_DISPLAY,
    chapterName
  }
}
