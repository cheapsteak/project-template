import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

export default <Route>
  <Route path="timeline" component={require('./timeline/timeline.jsx')} />
  <Route path="video-player" component={require('./video-player/video-player.jsx')} />
</Route>
