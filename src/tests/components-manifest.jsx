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
  'grid-manager': require('./grid/grid-manager.jsx'),
  videoplayer: require('./video-player/video-player.jsx')
};
