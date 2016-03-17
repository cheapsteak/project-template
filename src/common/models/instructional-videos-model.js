import data from 'common/data/instructional-videos.js';
import chaptersModel from 'common/models/chapters-model.js';

export default {
  get (slug) {
    const videoSourceData = data.find(video => video.slug === slug);
    const chapterData = chaptersModel.get(videoSourceData.chapterSlug);

    if(!videoSourceData || !chapterData) {
      console.trace('Unable to get model from slug:', slug);
    }

    const chapterRoute =  `/chapters/${chapterData.slug}/`;

    return {
      ...videoSourceData,
      fullBrowserRoute: chapterRoute,
      fullBrowserExitRoute: `${chapterRoute}instructional-videos${videoSourceData.slug}`,
      gridRoute: `/grid/instructional-videos${videoSourceData.slug}`
    };
  },

  getNext (currentSlug) {
    const videoSourceData = data.find(video => video.slug === currentSlug);
    const chapterData = chaptersModel.get(videoSourceData.chapterSlug);
    const idx = data.indexOf(videoSourceData);
    const nextVideo = data[(idx + 1) % data.length];

    return this.get(nextVideo.slug);
  }
};