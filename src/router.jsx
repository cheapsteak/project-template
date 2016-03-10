import React from 'react';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import appHistory from 'common/app-history.js';
import App from './app.jsx';
import store from 'common/store.js';
import { Provider } from 'react-redux';
import Chapter from 'chapter/chapter.jsx';

function handleRouteUpdate () {
  console.log('route updated');
  ga('send', 'pageview');
}

const testRoutes = process.env.NODE_ENV !== 'production' ?
  <Route path="/tests" component={require('./tests/tests.jsx')}>
    {require('./tests/routes.jsx')}
  </Route>
  : null ;

export default <Provider store={store}>
<Router history={appHistory} onUpdate={handleRouteUpdate}>
  <Route path="/" component={App}>
    <Route path="chapters/:id" component={Chapter}/>

  </Route>

  {testRoutes}
</Router>
</Provider>
