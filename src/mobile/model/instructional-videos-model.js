import data from '../data/instructional-videos.js';

export default {
  get (slug) {
    const videoSourceData = data.find(video => video.slug === slug);

    if(!videoSourceData) {
      console.trace('Unable to get model from slug:', slug);
    }

    return {
      ...videoSourceData,
      route: `/mobile/videos/${videoSourceData.slug}`
    };
  },
  getAll() {
    return data.map((video) => {
      return {
        ...video,
        route: `/mobile/videos/${video.slug}`
      }
    });
  }
};