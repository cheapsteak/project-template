import data from 'common/data/instructional-videos.js';
import chaptersModel from 'common/models/chapters-model.js';

export default {
  get (slug) {
    const photoEssaySourceData = data.find(video => video.slug === slug);
    const chapterData = chaptersModel.get(videoSourceData.chapterSlug);

    if(!videoSourceData || !chapterData) {
      console.trace('Unable to get model from slug:', slug);
    }

    const chapterRoute =  `/chapters/${chapterData.slug}/`; 

    return {
      ...videoSourceData,
      fullBrowserRoute: chapterRoute,
      fullBrowserExitRoute: `${chapterRoute}/photo-essay/${photoEssaySourceData.slug}`
    };
  }
};