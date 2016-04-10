import React from 'react';
import MobileMenu from './mobile-menu.jsx'
import * as actionCreators from './mobile-menu-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({ ...state.mobileMenu }), undefined, undefined, { withRef: true })
class MobileMenuRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
  }

  render () {
    return <MobileMenu
      onMenuClick={this.boundActionCreators.toggleMenuDisplay}
      {...this.props}
    />
  }
}

export default MobileMenuRedux