/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  'panorama-gallery': {
    component: require('common/components/panorama-gallery/panorama-gallery'),
    props: {
      index: 0,
      images: [
        '../images/pan-1.jpg',
        '../images/pan-2.jpg',
        '../images/pan-3.jpg'
      ]
    }
  },
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
