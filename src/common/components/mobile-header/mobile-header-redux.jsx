import React from 'react';
import MobileHeader from './mobile-header.jsx'
import * as menuActionCreators from 'common/components/mobile-menu/mobile-menu-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({ ...state.mobileHeader, menuOpened: state.mobileMenu.isOpen }), undefined, undefined, { withRef: true })
class MobileHeaderRedux extends React.Component {
  constructor(props) {
    super(props);
    this.menuBoundActionCreators = bindActionCreators(menuActionCreators, props.dispatch);
  }

  render () {
    return <MobileHeader
      openMenu={this.menuBoundActionCreators.openMenu}
      closeMenu={this.menuBoundActionCreators.closeMenu}
      toggleMenu={this.menuBoundActionCreators.toggleMenuDisplay}
      {...this.props}
    />
  }
}

export default MobileHeaderRedux