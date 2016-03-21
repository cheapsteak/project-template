import data from 'common/data/photo-essays.js';
import chaptersModel from 'common/models/chapters-model.js';

export default {
  get (slug) {
    const photoEssaySourceData = data.find(photoEssay => photoEssay.slug === slug);
    const chapterData = chaptersModel.get(photoEssaySourceData.chapterSlug);

    if(!photoEssaySourceData || !chapterData) {
      console.trace('Unable to get model from slug:', slug);
    }

    const chapterRoute =  `/chapters/${chapterData.slug}/`; 

    return {
      ...photoEssaySourceData,
      fullBrowserRoute: chapterRoute,
      fullBrowserExitRoute: `${chapterRoute}photo-essay/${photoEssaySourceData.slug}`
    };
  }
};