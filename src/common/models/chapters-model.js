import data from 'common/data/chapters.js';
import articleModel from 'common/models/articles-model.js';

export default {
  get (slug) {
    // Transforms go here
    const chapter = data.find(chapter => chapter.slug === slug);

    return {
      ...chapter,
      articles: chapter.articles.map(articleModel.get),
      routes: {
        narrativeVideo: '/narrative-videos/' + chapter.slug,
        //instructionalVideo: '/grid/instructional-videos/' + chapterInstructionalVideos[0],
        instructionalVideos: chapter.instructionalVideos.map(slug => '/grid/instructional-videos/' + slug),
      }
    };
  },

  getAll () {
    return data.map(chapter => this.get(chapter.slug));
  },

}
