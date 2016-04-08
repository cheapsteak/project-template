import React from 'react';
import { Route, Link, IndexRoute } from 'react-router';
import MobileApp from './mobile.jsx';
import MobileLanding from './pages/landing/landing.jsx';
import MobileChapters from './pages/chapters/chapters.jsx';
import MobileArticle from './pages/article/article.jsx';
import MobilePanorama from './pages/panorama/panorama.jsx';
import MobileVideos from './pages/videos/videos.jsx';
import MobileLearnMore from './pages/learn-more/learn-more.jsx';

export default <Route path="mobile" component={MobileApp}>
  <IndexRoute component={MobileLanding}/>
  <Route path="chapters" component={MobileChapters}>
    <Route path="articles/:slug" component={MobileArticle} />
    <Route path="panoramas/:slug" component={MobilePanorama} />
  </Route>
  <Route path="videos" component={MobileVideos} />
  <Route path="learn-more" component={MobileLearnMore} />
</Route>