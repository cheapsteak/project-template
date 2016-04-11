import articlesData from 'common/data/articles.js';
import chaptersData from 'common/data/chapters.js';

export default {
  get (slug) {
    const articleSourceData = articlesData.find(article => article.slug === slug);
    const chapterSourceData = chaptersData.find(chapter => chapter.slug === articleSourceData.chapterSlug);

    if(!articleSourceData) {
      console.trace('Unable to get model from slug:', slug);
    }

    return {
      ...articleSourceData,
      chapterName: chapterSourceData.title
    };
  }
};