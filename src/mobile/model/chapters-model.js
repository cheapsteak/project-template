import data from '../data/chapters.js';

export default {
  getAll () {
    return data.map(chapter => ({
      ...chapter,
      articles: chapter.articles.map(article => ({ ...article, route: `/mobile/article/${article.slug}`}))
    }));
  }
}