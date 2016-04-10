import React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import Header from './components/mobile-header/mobile-header-redux';
import RotateScreen from './components/rotate-screen/rotate-screen';
import MobileMenu from './components/mobile-menu/mobile-menu';
import * as headerActionCreators from './components/mobile-header/mobile-header-actions';
import * as menuActionCreators from './components/mobile-menu/mobile-menu-actions.js';
import store from 'common/store';
const EventEmitter = require('event-emitter');
const vent = new EventEmitter();
import Preload from 'inject-prefetch';
import _ from 'lodash';
import chaptersModel from './model/chapters-model.js';
import instructionalVideosModel from './model/instructional-videos-model.js';


// Preload([
//   MobileMenu.backgroundImage,
//   ...(_.flatten(chaptersModel.getAll().map(chapter => {
//     return [
//       ...chapter.articles.map(article => article.iconImage),
//       ...chapter.instructionalVideos.map(video => video.iconImage),
//       chapter.photoEssay && chapter.photoEssay.iconImage,
//       chapter.panorama && chapter.panorama.iconImage,
//       chapter.podcast && chapter.podcast.iconImage,
//     ].filter(Boolean)
//   })))
// ]);

export default class Mobile extends React.Component {
  static childContextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object,
    previousRoute: React.PropTypes.string
  };

  state = {
    isMenuOpen: store.getState().mobileMenu.isOpen
  };

  previousRoute = undefined;
  currentRoute = undefined;
  lastHeaderStyles = {};

  componentDidMount() {
    this.currentRoute = this.props.location.pathname;

    store.subscribe(() => {
      const { mobileHeader, mobileMenu } = store.getState();
      const isMenuOpen = mobileMenu.isOpen;
      const menuStyle = {
        type: 'menu',
        color: '#ffffff',
        backButton: true,
        bottomBorder: false
      };

      if(isMenuOpen !== this.state.isMenuOpen) {
        let nextStyle;

        this.setState({ isMenuOpen });

        // Timeout fixes 2 problems
        // 1: A race condition between this.setState and dispatch
        // 2: A race condition between closing the menu, reusing previousHeader
        //    and a new one if they are going to a new route
        setTimeout(() => {
          if(isMenuOpen) {
            this.lastHeaderStyles = mobileHeader;
            nextStyle = menuStyle;
          } else {
            nextStyle = this.lastHeaderStyles;
            this.lastHeaderStyles = {};
          }
          store.dispatch(headerActionCreators.setHeaderSettings(nextStyle));
        }, 100);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextKey = nextProps.location.pathname.split('/')[2];
    this.previousRoute = this.props.location.pathname;
    this.currentRoute = nextProps.location.pathname;

    if(nextKey === 'videos') {
      this.refs.root.scrollTop = 0;
    }

    if(this.props.location.pathname !== nextProps.location.pathname) {
      this.lastHeaderStyles = {};
      store.dispatch(menuActionCreators.closeMenu());
    }
  }

  getChildContext() {
    return {
      eventBus: vent,
      previousRoute: this.previousRoute
    };
  }

  render () {
    const { pathname } = this.props.location;
    const key = pathname.split('/')[2] || 'root';

    return (
      <div ref="root" className="mobile full-height">
        <Header />
        <RotateScreen />
        <TransitionGroup
          component="div"
          className="menu-wrapper"
        >
          {
            this.state.isMenuOpen
            ? <MobileMenu
                key="mobile-menu"
                currentRoute={this.props.location.pathname}
                closeMenu={() => store.dispatch(menuActionCreators.closeMenu())}
              />
            : null
          }
        </TransitionGroup>
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
