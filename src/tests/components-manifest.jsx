/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  'panorama-gallery': require('./panorama-gallery/panorama-gallery'),
  'panorama': {
    component: require('common/components/panorama/panorama'),
    props: {
      src: '../images/pan-1.jpg'
    }
  },
  photoessay: {
    component: require('./photo-essay/photo-essay.jsx')
  }
};
