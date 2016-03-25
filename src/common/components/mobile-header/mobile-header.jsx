import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import MobileMenu from 'common/components/mobile-menu/mobile-menu';

export default class MobileHeader extends React.Component {

  state = {
    showMenu: true
  };

  handleMenuClick = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render () {
    const { className, style } = this.props;

    return (
      <div
        ref="header"
        className="mobile-header"
      >
        <div
          className="menu-icon"
          onClick={this.handleMenuClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className="logo-icon"
          dangerouslySetInnerHTML={{ __html: SALogoSvg }}>
        </div>
        <TransitionGroup
          component="div"
          className="menu-wrapper"
        >
          {
            this.state.showMenu
            ? <MobileMenu
                onClick={this.handleMenuClick}
              />
            : null
          }
        </TransitionGroup>
      </div>
    )
  }
}