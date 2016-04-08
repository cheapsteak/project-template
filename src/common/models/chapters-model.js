import data from 'common/data/chapters.js';
import photoEssayData from 'common/data/photo-essays.js';
import instructionalVideoData from 'common/data/instructional-videos.js';
import articleModel from 'common/models/articles-model.js';

export default {
  get (slug) {
    // Transforms go here
    const chapter = data.find(chapter => chapter.slug === slug);

    return {
      ...chapter,
      articles: chapter.articles.map(articleModel.get),
      routes: {
        narrativeVideo: '/narrative-video#' + chapter.slug,
        instructionalVideos: chapter.instructionalVideos.map(slug => '/grid/instructional-videos/' + slug),
      },
      instructionalVideos: chapter.instructionalVideos.map(instructionalVideoSlug => {
        const data = instructionalVideoData.find(instructionalVideo => instructionalVideo.slug === instructionalVideoSlug);

        return {
          title: data.title,
          slug: instructionalVideoSlug
        };
      }),
      photoEssays: chapter.photoEssays.map(photoEssaySlug => {
        const data = photoEssayData.find(photoEssay => photoEssay.slug === photoEssaySlug);

        return {
          title: data.title,
          slug: photoEssaySlug
        };
      })
    };
  },

  getAll () {
    return data.map(chapter => this.get(chapter.slug));
  },

}
