import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import componentsManifest from './components-manifest.jsx';
import FullBrowserWrapper from './fullbrowser-wrapper/fullbrowser-wrapper.jsx';
import FullBrowserWrapperMaximized from './fullbrowser-wrapper-maximized/fullbrowser-wrapper-maximized.jsx';
import PhotoEssay from './photo-essay/photo-essay.jsx';
import Test from './photo-essay/photo-essay.jsx';

export default <Route>
  {
    Object.keys(componentsManifest).map(function (componentName) {
      const componentData = componentsManifest[componentName];
      const Component = componentData.component || componentData;
      const props = componentData.props;

      return (
        <Route 
            key={componentName}
        >
          <Route
            path={componentName}
            component={() =>
              <Component {...props} />
            }
          >
          </Route>
          <Route
            path={'chapter'}
            component={componentsManifest.chapter}
            key={'chapter-abcde'}
          >
            <IndexRoute component={FullBrowserWrapper} />
            <Route
              path="photo-essay/:id"
              component={FullBrowserWrapperMaximized}>
            </Route>
          </Route>
        </Route>
      )
    })
  }
</Route>
