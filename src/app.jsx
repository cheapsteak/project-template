import React from 'react';
// import TransitionGroup from 'react-addons-transition-group';
import TransitionGroup from 'react-transition-group-plus';

import LearnMoreModal from 'common/components/learn-more-modal/learn-more-modal.jsx';
import store from 'common/store.js';
import * as modalActions from 'common/actions/learn-more-modal-actions.js';
const EventEmitter = require('event-emitter');
const vent = new EventEmitter();
import learnMoreData from 'common/data/learn-more.js';

window.REDUX_STORE = store;

export default class App extends React.Component {
  static childContextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object,
    previousRoute: React.PropTypes.string
  };

  state = {
    showModal: false
  };

  previousRoute = undefined;

  componentDidMount() {
    store.subscribe(() => {
      const currentState = store.getState().showLearnMoreModal;

      if(this.state.showModal !== currentState) {
        this.setState({
          showModal: store.getState().showLearnMoreModal
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.previousRoute = nextProps.location.pathname;
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
      <div className="route-content-wrapper full-height">
        <TransitionGroup
          component="div"
          className="route-content-wrapper full-height"
          data-route={pathname}
        >
          {React.cloneElement(this.props.children || <div />, { key: key })}
        </TransitionGroup>
        <TransitionGroup
          component="div"
          className="route-content-wrapper full-height"
        >
        {
          this.state.showModal
          ? <LearnMoreModal
              key="learn-more-modal"
              close={ store.dispatch.bind(null, modalActions.closeModal()) }
              title={learnMoreData.title}
              content={learnMoreData.content}
            />
          : <div />
        }
        </TransitionGroup>
      </div>
    )
  }
}
