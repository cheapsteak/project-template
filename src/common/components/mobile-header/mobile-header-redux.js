import React from 'react';
import MobileHeader from './mobile-header.jsx'
import * as actionCreators from './mobile-header-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({ ...state.mobileHeaderMenu }), undefined, undefined, { withRef: true })
class MobileHeaderRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
  }

  render () {
    return <MobileHeader
      {...this.props}
      {...this.props.data}
      closeMenu={this.boundActionCreators.closeMenu}
      openMenu={this.boundActionCreators.openMenu}
      onMenuClick={this.boundActionCreators.toggleMenuDisplay}
      isMenuOpen={this.props.isMenuOpen}
      color={this.props.header.color}
      backgroundColor={this.props.header.backgroundColor}
    />
  }
}

export default MobileHeaderRedux