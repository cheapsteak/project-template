import React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import Header from 'common/components/mobile-header/mobile-header-redux';
import RotateScreen from 'common/components/rotate-screen/rotate-screen';
const EventEmitter = require('event-emitter');
const vent = new EventEmitter();


export default class Mobile extends React.Component {
  static childContextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object,
    previousRoute: React.PropTypes.string
  };

  previousRoute = undefined;

  componentWillReceiveProps(nextProps) {
    this.previousRoute = nextProps.location.pathname;
    this.refs.root.scrollTop = 0;
  }

  getChildContext() {
    return {
      eventBus: vent,
      previousRoute: this.previousRoute
    };
  }

  render () {
    const { pathname } = this.props.location;
    let key = pathname.split('/')[1] || 'root';

    return (
      <div ref="root" className="full-height" style={{ overflow: 'scroll' }}>
        <Header />
        <RotateScreen />
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
