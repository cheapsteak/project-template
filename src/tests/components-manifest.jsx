/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  'parallax-video-wrapper': {
    component: require('common/components/parallax-video-wrapper/parallax-video-wrapper'),
    props: {
      inHomePage: true
    }
  },
};
