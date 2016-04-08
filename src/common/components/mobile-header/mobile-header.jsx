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

    if(props.backgroundColor) {
      this.refs.backCover.style.backgroundColor = props.backgroundColor;
    }

    if (props.bottomBorder) {
      this.refs.header.classList.add('no-border');
      animate.set(this.refs.coverBorder, { opacity: 0.2 });
    } else {
      this.refs.header.classList.remove('no-border');
      animate.set(this.refs.coverBorder, { opacity: 0 });
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
        this.context.router.replace('/mobile');
      }

      this.props.closeMenu();
    } else {
      this.props.toggleMenu();
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
            ref="menuIcon"
            className="mobile-menu-icon"
            onClick={this.handleMenuIconClick}
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
        </div>
        <div ref="backCover" className="back-cover">
          <div ref="coverBorder" className="cover-border"></div>
        </div>
      </div>
    )
  }
}