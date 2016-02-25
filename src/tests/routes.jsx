import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import componentsManifest from './components-manifest.jsx';

export default <Route>
  {
    Object.keys(componentsManifest).map(function (componentName) {
      const Component = componentsManifest[componentName].component || componentsManifest[componentName];
      const props = componentsManifest[componentName].props;

      return <Route
        path={componentName}
        component={() =>
          <Component {...props} />
        }
        key={componentName}
      >
      </Route>
    })
  }
</Route>
