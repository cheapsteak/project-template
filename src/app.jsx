import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

export default class App extends React.Component {
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
