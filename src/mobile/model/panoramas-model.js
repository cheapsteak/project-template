import data from 'common/data/panorama.js';

export default {
  get (slug) {
    const panoramaSourceData = data.find(panorama => panorama.slug === slug);

    if (!panoramaSourceData) {
      console.trace('Unable to get model from slug:', slug);
    }

    return {
      ...panoramaSourceData,
      route: `/chapters/panoramas/${panoramaSourceData.slug}`
    };
  }
};
