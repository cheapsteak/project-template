import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

export default class Chapter extends React.Component {
  render () {
    const { pathname } = this.props.location;
    let key = pathname.split('/')[3] || 'root';

    return <TransitionGroup
      component="div"
      className="route-content-wrapper"
      data-route={pathname}
      >
      {React.cloneElement(this.props.children || <div />, { key: key })}
    </TransitionGroup>;
  }
}