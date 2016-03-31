import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import LearnMoreModal from 'common/components/learn-more-modal/learn-more-modal.jsx';
import store from 'common/store.js';
import * as modalActions from 'common/actions/learn-more-modal-actions.js';
const EventEmitter = require('event-emitter');
const vent = new EventEmitter();

window.REDUX_STORE = store;

export default class App extends React.Component {
  static childContextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object
  };

  getChildContext() {
    return {
      eventBus: vent
    };
  }

  state = {
    showModal: false
  };

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

  render () {
    const { pathname } = this.props.location;
    let key = pathname.split('/')[1] || 'root';

    // TODO: To be removed when we change the grid to use a nested view
    if (key === 'grid' && pathname.split('/')[2]) {
      key += pathname.split('/')[2];
    }

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
              paragraphs={[
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.`,
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.`,
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.`,
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.`
              ]}
            />
          : <div />
        }
        </TransitionGroup>
      </div>
    )
  }
}
