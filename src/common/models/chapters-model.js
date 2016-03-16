import data from 'common/data/chapters.js';

export default {
  get (slug) {
    // Transforms goes here
    return data.find(chapter => chapter.slug === slug);
  },

}