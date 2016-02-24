import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import componentsManifest from './components-manifest.jsx';

export default <Route>
  {
    Object.keys(componentsManifest).map(function (componentName) {
      return <Route
        path={componentName}
        component={componentsManifest[componentName]}
        key={componentName}
      />;
      })
    }
</Route>
