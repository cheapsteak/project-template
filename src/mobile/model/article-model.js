import data from 'common/data/articles.js';

export default {
  get (slug) {
    const articleSourceData = data.find(article => article.slug === slug);

    if(!articleSourceData) {
      console.trace('Unable to get model from slug:', slug);
    }

    return articleSourceData;
  }
};