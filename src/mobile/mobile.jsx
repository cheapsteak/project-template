import React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import Header from 'common/components/mobile-header/mobile-header-redux';

export default class Mobile extends React.Component {
  static childContextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object
  };

  render () {
    const { pathname } = this.props.location;
    let key = pathname.split('/')[1] || 'root';

    return (
      <div className="full-height" style={{ overflow: 'scroll' }}>
        <Header />
        <TransitionGroup
          component="div"
          
          className="route-content-wrapper full-height"
          data-route={pathname}
        >
          {React.cloneElement(this.props.children || <div />, { key: key, getTarget: () => findDOMNode(this) })}
        </TransitionGroup>
      </div>
    )
  }
}
