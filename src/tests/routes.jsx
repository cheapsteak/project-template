import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import componentsManifest from './components-manifest.jsx';
import FullBrowserWrapper from 'common/components/fullbrowser-wrapper/fullbrowser-wrapper.jsx'
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux.jsx';
import ChapterVideoPlayer from 'common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';

function fullbrowserWrap(component) {
  return class TestPhotoEssay extends React.Component {
    render () {
      return <div>{component}</div>
    }
  };
}

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
            <Route
              path="instructional-videos/:slug"
              key={'chapter-abcdef'}
              component={FullBrowserWrapper}
              childComponent={ChapterVideoPlayer}
              childComponentProps={{ basePath: 'tests/chapter'}}
            >
            </Route>
            <Route
              path="photo-essays/:slug"
              key={'chapter-abcdef'}
              component={FullBrowserWrapper}
              childComponent={PhotoEssay}
              childComponentProps={{ basePath: 'tests/chapter'}}
            >
            </Route>
          </Route>
        </Route>
      )
    })
  }
</Route>
