/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  photoessay: {
    component: require('./photo-essay/photo-essay.jsx')
  },
  chapter: require('./chapter/chapter.jsx')
};
