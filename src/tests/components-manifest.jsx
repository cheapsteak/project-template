/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  'panorama-gallery': require('./panorama-gallery/panorama-gallery'),
  panorama: require('./panorama/panorama'),
  photoessay: {
    component: require('./photo-essay/photo-essay.jsx')
  }
};
