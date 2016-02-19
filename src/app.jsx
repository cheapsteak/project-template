import domready from 'domready';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import TransitionGroup from 'react-transition-group-plus';
import Stats from './common/utils/stats';
import ParallaxVideo from './common/components/parallax-video/parallax-video.jsx';
import VideoPlayer from './common/components/video-player/video-player.jsx';
import ThreeSixty from './common/components/panorama/panorama.jsx';

class App extends React.Component {
  render () {
    console.log('render');
    const { pathname } = this.props.location;
    let key = pathname.split('/')[1] || 'root';

    return <TransitionGroup
      component="div"
      className="route-content-wrapper"
      data-route={pathname}
      >
      <ThreeSixty/>
      {React.cloneElement(this.props.children || <div />, { key: key })}
    </TransitionGroup>;
  }
}

function handleRouteUpdate () {
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
})
