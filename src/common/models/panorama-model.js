import data from '../data/panorama.js';
import chaptersModel from 'common/models/chapters-model.js';

export default {
  get (slug) {
    const panoramaSourceData = data.find(panorama => panorama.slug === slug);

    if (!panoramaSourceData) {
      console.trace('Unable to get model from slug:', slug);
    }

    return {
      ...panoramaSourceData
    };
  }
};
