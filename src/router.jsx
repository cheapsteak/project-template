import React from 'react';
import {Router, Route, Link, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import appHistory from 'common/app-history.js';
import App from './app.jsx';
import store from 'common/store.js';
import {Provider} from 'react-redux';
import Chapter from 'chapter/chapter.jsx';
import GridPage from 'common/pages/grid-page/grid-page.jsx';
import LandingPage from 'common/pages/landing-page/landing-page.jsx';
import FullBrowserWrapper from 'common/components/fullbrowser-wrapper/fullbrowser-wrapper.jsx';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux.jsx';
import ChapterVideoPlayer from 'common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';
import NarrativeVideoPlayer from 'common/components/video-players/narrative/narrative-video-player-redux.jsx';
import InstructionalVideoPlayer from 'common/components/video-players/instructional/grid/grid-video-player-redux.jsx';

import MobileApp from './mobile/mobile.jsx';
import MobileLanding from './mobile/landing/landing.jsx';
import MobileChapters from './mobile/chapters/chapters.jsx';

function handleRouteUpdate() {
  console.log('route updated');
  ga('send', 'pageview');
}

const testRoutes = process.env.NODE_ENV !== 'production' ?
  <Route path="/tests" component={require('./tests/tests.jsx')}>
    {require('./tests/routes.jsx')}
  </Route>
  : null;

export default <Provider store={store}>
  <Router history={appHistory} onUpdate={handleRouteUpdate}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage}/>
      <Route path="grid" component={GridPage}/>
      <Route path="grid/instructional-videos/:slug" component={InstructionalVideoPlayer}/>
      <Route path="narrative-videos/:slug" component={NarrativeVideoPlayer}/>
      <Route path="chapters/:chapter_slug" component={Chapter}>
        <Route
          path="instructional-videos/:slug"
          component={FullBrowserWrapper}
          childComponent={ChapterVideoPlayer}
        />
        <Route
          path="photo-essay/:slug"
          component={FullBrowserWrapper}
          childComponent={PhotoEssay}
        />
      </Route>
    </Route>
    <Route path="/mobile" component={MobileApp}>
      <IndexRoute component={MobileLanding}/>
      <Route path="chapters" component={MobileChapters}/>
    </Route>

    {testRoutes}
  </Router>
</Provider>
