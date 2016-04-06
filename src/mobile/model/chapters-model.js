import chaptersData from '../data/chapters.js';
import articlesData from 'common/data/articles';
import videoModel from './instructional-videos-model.js';
import _ from 'lodash';

export default {
  getAll () {
    return chaptersData.map(chapter => ({
      ...chapter,
      articles: chapter.articles.map(article => ({ 
        ...article,
        route: `/mobile/article/${article.slug}`,
        title: _.find(articlesData, { slug: article.slug }).title
      })),
      instructionalVideos: chapter.instructionalVideos.map(videoModel.get)
    }));
  }
}