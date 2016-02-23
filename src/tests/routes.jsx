import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

export default <Route>
  <Route path="timeline" component={require('./timeline/timeline.jsx')} />
</Route>
