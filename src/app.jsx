import domready from 'domready';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import TransitionGroup from 'react-transition-group-plus';
import Test from 'common/test/test.jsx';
    
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
        <Route path="test" component={Test} />
      </Route>
    </Router>
  ), document.getElementById('container'));
})