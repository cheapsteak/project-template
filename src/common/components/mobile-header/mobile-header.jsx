import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import MobileMenu from 'common/components/mobile-menu/mobile-menu';

export default class MobileHeader extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    title: React.PropTypes.string
  };

  static contextTypes = {
    router: React.PropTypes.object,
    previousRoute: React.PropTypes.string
  }

  componentDidMount() {
    this.setStyle(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setStyle(nextProps);
  }

  setStyle = (props) => {
    const content = this.refs.header.querySelectorAll('.menu-content');

    _.forEach(content, (node) => {
      if(node.firstChild) {
        node.firstChild.style.fill = props.color;
      } else {
        node.style.backgroundColor = props.color;
      }
    });

    this.refs.header.style.color = props.color;
    this.refs.header.style.backgroundColor = props.backgroundColor;

    if (props.bottomBorder) {
      this.refs.header.classList.add('thick-bottom-border');
    } else {
      this.refs.header.classList.remove('thick-bottom-border');
    }
  };

  handleBackClick = () => {
    if(this.context.previousRoute) {
      this.context.router.goBack();
    } else {
      window.history.back();
    }
  };

  render () {
    const { className, style, color = '', backgroundColor = '' } = this.props;
    const hiddenStyle = {
      opacity: 0,
      pointerEvents: 'none'
    };

    return (
      <div
        ref="header"
        className="mobile-header"
      > 
        <div
          ref="backArrow"
          className="back-arrow"
          style={ !this.props.backButton ? hiddenStyle : {} }
          onClick={this.handleBackClick}
        >
          {
            _.range(3).map((i) => {
              return <span key={i} className="menu-content"></span>
            })
          }
        </div>
        <div
          className="menu-icon"
          style={ this.props.backButton ? hiddenStyle : {} }
          onClick={this.props.onMenuClick}
        >
          {
            _.range(3).map((i) => {
              return <span key={i} className="menu-content"></span>
            })
          }
        </div>
        <div
          ref="title"
          style={ !this.props.title ? hiddenStyle : {} }
          className="menu-title"
        >
          {this.props.title}
        </div>
        <div
          className="logo-icon menu-content"
          style={ this.props.title ? hiddenStyle : {} }
          dangerouslySetInnerHTML={{ __html: SALogoSvg }}
        >
        </div>
        <TransitionGroup
          component="div"
          className="menu-wrapper"
        >
          {
            this.props.isMenuOpen
            ? <MobileMenu
                closeMenu={this.props.closeMenu}
                openMenu={this.props.openMenu}
                onBackIconClick={this.props.onMenuClick}
              />
            : null
          }
        </TransitionGroup>
      </div>
    )
  }
}