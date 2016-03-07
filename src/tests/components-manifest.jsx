/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  photoessay: require('./photo-essay/photo-essay.jsx'),
  chapter: require('./chapter/chapter.jsx'),
  'parallax-video-wrapper': require('./parallax-video-wrapper/parallax-video-wrapper'),
  'parallax-video': require('./parallax-video/parallax-video'),
  'panorama-gallery': require('./panorama-gallery/panorama-gallery'),
  panorama: require('./panorama/panorama'),
  'narrative-video-player': require('./narrative-video-player/narrative-video-player.jsx'),
  'instructional-video-player': require('./instructional-video-player/instructional-video-player.jsx')
};
