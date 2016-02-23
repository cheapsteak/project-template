import domready from 'domready';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import TransitionGroup from 'react-transition-group-plus';
import Stats from './common/utils/stats';
import ParallaxVideo from './common/components/parallax-video/parallax-video.jsx';
import VideoPlayer from './common/components/video-player/video-player.jsx';

class App extends React.Component {
  render() {
    console.log('render');
    const { pathname } = this.props.location;
    let key = pathname.split('/')[1] || 'root';

    return <TransitionGroup
      component="div"
      className="route-content-wrapper"
      data-route={pathname}
    >
      <ParallaxVideo
        bgVideo={ {path: '../videos/bg-1080.mp4'} }
        fgVideo={ {path: '../videos/fg-1080.mp4'} }
        animateIn={ () => {console.log('animateIn passed prop')} }
      >
          <span className={`layer`} data-depth="0.3">
            <div className={`text-container`}>
              <div className={`title`}>Explore</div>
              <div className={`subtitle`}>Science</div>
              <div className={`description`}>At Success Academy we completely redefined how to teach Science.</div>
            </div>
          </span>
      </ParallaxVideo>

    </TransitionGroup>;
  }
}

function handleRouteUpdate() {
  console.log('route updated');
  ga('send', 'pageview');
}

domready(function () {
  render((
    <Router history={browserHistory} onUpdate={handleRouteUpdate}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  ), document.getElementById('container'));
});
