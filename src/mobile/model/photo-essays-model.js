import photoEssaysData from 'common/data/photo-essays.js';
import chaptersData from 'common/data/chapters.js';

export default {
  get (slug) {
    const photoEssaySourceData = photoEssaysData.find(photoEssay => photoEssay.slug === slug);
    const chapterSourceData = chaptersData.find(chapter => chapter.slug === photoEssaySourceData.chapterSlug);

    if(!photoEssaySourceData) {
      console.trace('Unable to get model from slug:', slug);
    }

    return {
      ...photoEssaySourceData,
      chapterName: chapterSourceData.title,
      route: `/chapters/photo-essays/${photoEssaySourceData.slug}`
    };
  }
};