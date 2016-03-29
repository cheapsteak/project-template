import data from 'common/data/grid.js';

export default {
  get (slug) {
    return data.find(chapter => chapter.slug === slug);
  },

  getImages() {
    const images = _.mapValues(data, 'image');
    return _.values(images);
  }

}
