import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import Header from 'common/components/mobile-header/mobile-header';

export default class Mobile extends React.Component {
  static childContextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object
  };

  state = {
    showMenu: false
  }

  toggleMenuDisplay = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render () {
    const { pathname } = this.props.location;
    let key = pathname.split('/')[1] || 'root';

    return (
      <div className="full-height">
        <Header
          onMenuClick={this.toggleMenuDisplay}
        />
        <TransitionGroup
          component="div"
          className="route-content-wrapper full-height"
          data-route={pathname}
        >
          {React.cloneElement(this.props.children || <div />, { key: key })}
        </TransitionGroup>
      </div>
    )
  }
}
