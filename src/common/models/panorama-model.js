import data from 'common/data/panorama.js';
import chaptersModel from 'common/models/chapters-model.js';

export default {
  get (slug) {
    const panoramaSourceData = data.find(panorama => panorama.slug === slug);
    const chapterData = chaptersModel.get(panoramaSourceData.chapterSlug);

    if (!panoramaSourceData || !chapterData) {
      console.trace('Unable to get model from slug:', slug);
    }

    const chapterRoute = `/chapters/${chapterData.slug}/`;

    return {
      ...panoramaSourceData
    };
  }
};
