import data from 'common/data/chapters.js';
import articleModel from 'common/models/articles-model.js';
import instrVideoModel from 'common/models/instructional-videos-model';

export default {
  get (slug) {
    // Transforms go here
    const chapter = data.find(chapter => chapter.slug === slug);
    //const chapterInstructionalVideos = chapter.instructionalVideos.map(instrVideoModel.get);

    return {
      ...chapter,
      articles: chapter.articles.map(articleModel.get),
      //instructionalVideos: chapterInstructionalVideos,
      routes: {
        narrativeVideo: '/narrative-videos/' + chapter.slug,
        //instructionalVideo: '/grid/instructional-videos/' + chapterInstructionalVideos[0],
        instructionalVideo: '/grid/instructional-videos/' + 'math-1',
      }
    };
  },

  getAll () {
    return data.map(chapter => this.get(chapter.slug));
  },

}
