import data from 'common/data/instructional-videos.js';
import chaptersModel from 'common/models/chapters-model.js';

export default {
  get (slug) {
    const videoSourceData = data.find(video => video.slug === slug);
    const chapterData = chaptersModel.get(videoSourceData.chapterSlug);

    if(!videoSourceData || !chapterData) {
      console.trace('Unable to get model from slug:', slug);
    }

    const chapterRoute =  `/chapters/${chapterData.slug}`;

    return {
      ...videoSourceData,
      title: chapterData.title,
      chapterRoute: chapterRoute,
      fullBrowserChapterRoute: `${chapterRoute}/instructional-videos/${videoSourceData.slug}`,
      gridRoute: `/grid/instructional-videos/${videoSourceData.slug}`,
      route: 'math-1'
    };
  },

  getPrev (currentSlug) {
    const videoSourceData = data.find(video => video.slug === currentSlug);
    const chapterData = chaptersModel.get(videoSourceData.chapterSlug);
    const idx = data.indexOf(videoSourceData);
    const prevVideo = data[(idx - 1 >= 0 ? idx : data.length) - 1];

    return this.get(prevVideo.slug);
  },

  getNext (currentSlug) {
    const videoSourceData = data.find(video => video.slug === currentSlug);
    const chapterData = chaptersModel.get(videoSourceData.chapterSlug);
    const idx = data.indexOf(videoSourceData);
    const nextVideo = data[(idx + 1) % data.length];

    return this.get(nextVideo.slug);
  }
};
