import React from 'react';
import { Route, Link, IndexRoute } from 'react-router';
import MobileApp from './mobile.jsx';
import MobileLanding from './landing/landing.jsx';
import MobileChapters from './chapters/chapters.jsx';
import MobileArticle from './article/article.jsx';




export default <Route path="mobile" component={MobileApp}>
  <IndexRoute component={MobileLanding}/>
  <Route path="chapters" component={MobileChapters} />
  <Route path="article/:slug"  component={MobileArticle} />
</Route>