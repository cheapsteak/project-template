import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import animate from 'gsap-promise';

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

    if(props.color) {
      _.forEach(content, (node) => {
        if(node.firstChild) {
          // For SVGs
          animate.to(node.firstChild, 0.1, { fill: props.color, ease: Cubic.easeOut });
        } else {
          animate.to(node, 0.1, { backgroundColor: props.color, ease: Cubic.easeOut });
        }
      });

      animate.to(this.refs.header, 0.1, { color: props.color, ease: Cubic.easeOut });
    }

    TweenMax.killTweensOf(this.refs.coverBorder);

    if (props.bottomBorder) {
      this.refs.header.classList.add('no-border');
    } else {
      this.refs.header.classList.remove('no-border');
    }

    if(props.backButton) {
      this.refs.menuIcon.classList.add('arrow-mode');
    } else {
      this.refs.menuIcon.classList.remove('arrow-mode');
    }
  };

  handleMenuIconClick = () => {
    if(this.props.backButton && !this.props.menuOpened) {
      if(this.context.previousRoute) {
        this.context.router.goBack();
      } else {
        const nextRoute = this.props.currentKey !== 'learn-more' ? '/chapters' : '/';
        this.context.router.push(nextRoute);
      }

      this.props.closeMenu();
    } else {
      this.props.toggleMenu();
    }
  };

  handleMenuLogoClick = () => {
    if(this.props.currentKey !== '/'){
      this.context.router.push('/');
    } else {
      this.props.closeMenu();
    }
  };

  render () {
    const { className, style, color = '', backgroundColor = '' } = this.props;
    const hiddenStyle = {
      opacity: 0,
      pointerEvents: 'none'
    };

    return (
      <div className="mobile-header-wrapper">
        <div
          ref="header"
          className="mobile-header"
        > 
          <div
            className="icon-wrapper"
            onClick={this.handleMenuIconClick}
          >
            <div
              ref="menuIcon"
              className="mobile-menu-icon"
            >
              {
                _.range(3).map((i) => {
                  return <span key={i} className="menu-content"></span>
                })
              }
            </div>
          </div>
          <div
            ref="title"
            style={ this.props.title === 'SA' ? hiddenStyle : {} }
            className="menu-title"
          >
            {this.props.title}
          </div>
          <div
            className="icon-wrapper"
            onClick={this.handleMenuLogoClick}
          >
            <div
              className="logo-icon menu-content"
              style={ this.props.title === 'SA' ? {} : hiddenStyle }
              dangerouslySetInnerHTML={{ __html: SALogoSvg }}
            >
            </div>
          </div>
        </div>
      </div>
    )
  }
}