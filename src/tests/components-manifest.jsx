/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  photoessay: require('./photo-essay/photo-essay.jsx'),
  chapter: require('./chapter/chapter.jsx'),
  'parallax-video-wrapper': require('./parallax-video-wrapper/parallax-video-wrapper'),
  'parallax-video-history': require('./parallax-video/history'),
  'parallax-video-welcome': require('./parallax-video/welcome'),
  'parallax-video-welcome-2': require('./parallax-video/welcome-2'),
  'parallax-video-character-development': require('./parallax-video/character-development'),
  'parallax-video-science': require('./parallax-video/science'),
  'parallax-video-computer-science': require('./parallax-video/computer-science'),
  'parallax-video-electives': require('./parallax-video/electives'),
  'parallax-video-math': require('./parallax-video/math'),
  'panorama-gallery': require('./panorama-gallery/panorama-gallery'),
  panorama: require('./panorama/panorama'),
  'narrative-video-player': require('./narrative-video-player/narrative-video-player.jsx'),
  //'instructional-video-player': require('./instructional-video-player/instructional-video-player.jsx'),
  'grid': require('common/components/grid-manager/grid-manager.jsx'),
  //'grid-layout-890': require('./grid/grid-890.jsx'),
  //'grid-layout-1060': require('./grid/grid-1060.jsx'),
  //'grid-layout-1230': require('./grid/grid-1230.jsx'),
  //'grid-layout-1400': require('./grid/grid-1400.jsx'),
  //'grid-layout-1570': require('./grid/grid-1570.jsx'),
  //'grid-layout-1740': require('./grid/grid-1740.jsx'),
  //'grid-layout-1920': require('./grid/grid-1920.jsx'),
  'scroll-parallax': require('./scroll-parallax/scroll-parallax.jsx'),
};
