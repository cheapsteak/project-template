import React from 'react';
import { Route, Link, IndexRoute } from 'react-router';
import MobileApp from './mobile.jsx';
import MobileLanding from './pages/landing/landing.jsx';
import MobileChapters from './pages/chapters/chapters.jsx';
import MobileArticle from './pages/article/article.jsx';
import MobileVideos from './pages/videos/videos.jsx';
import MobileVideoPage from './pages/video-page/video-page.jsx';

export default <Route path="mobile" component={MobileApp}>
  <IndexRoute component={MobileLanding}/>
  <Route path="chapters" component={MobileChapters} />
  <Route path="article/:slug" component={MobileArticle} />
  <Route path="videos"  component={MobileVideos} />
  <Route path="videos/:slug" component={MobileVideoPage} />
</Route>