export const TOGGLE_CHAPTER_DISPLAY = 'TOGGLE_CHAPTER_DISPLAY';

export function toggleChapterDisplay(chapterName) {
  return {
    type: TOGGLE_CHAPTER_DISPLAY,
    chapterName
  }
}
