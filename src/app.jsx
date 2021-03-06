import domready from 'domready';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import TransitionGroup from 'react-transition-group-plus';

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
      <div></div>
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