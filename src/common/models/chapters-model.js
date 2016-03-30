import data from 'common/data/chapters.js';
import articleModel from 'common/models/articles-model.js';

export default {
  get (slug) {
    // Transforms go here
    const chapter = data.find(chapter => chapter.slug === slug);

    return {
      ...chapter,
      articles: chapter.articles.map(articleModel.get)
    };
  },

  getAll () {
    return data.map( chapter => this.get(chapter.slug) );
  },

}
