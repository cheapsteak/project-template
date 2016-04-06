import chaptersData from '../data/chapters.js';
import articlesData from 'common/data/articles';
import videoModel from './instructional-videos-model.js';
import panoramaModel from './panorama-model.js';
import _ from 'lodash';

export default {
  getAll () {
    return chaptersData.map(chapter => ({
      ...chapter,
      articles: chapter.articles.map(article => ({ 
        ...article,
        route: `/mobile/articles/${article.slug}`,
        title: _.find(articlesData, { slug: article.slug }).title
      })),
      instructionalVideos: chapter.instructionalVideos.map(videoModel.get),
      panorama: chapter.panorama 
        ? {
            ...panoramaModel.get(chapter.panorama.slug),
            image: chapter.panorama.image
          } 
        : undefined
    }));
  }
}