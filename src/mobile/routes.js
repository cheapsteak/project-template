import React from 'react';
import { Route, Link, IndexRoute } from 'react-router';
import MobileApp from './mobile.jsx';
import MobileLanding from './landing/landing.jsx';
import MobileChapters from './chapters/chapters.jsx';


export default <Route path="mobile" component={MobileApp}>
  <IndexRoute component={MobileLanding}/>
  <Route path="chapters" component={MobileChapters}/>
</Route>