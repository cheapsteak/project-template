import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import MobileMenu from 'common/components/mobile-menu/mobile-menu';

export default class MobileHeader extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string
  };

  componentDidMount() {
    this.setColor(this.props.color, this.props.backgroundColor);
  }

  componentWillReceiveProps(nextProps) {
    this.setColor(nextProps.color, nextProps.backgroundColor);
  }

  setColor = (color, backgroundColor) => {
    const content = this.refs.header.querySelectorAll('.menu-content');

    _.forEach(content, (node) => {
      if(node.firstChild) {
        node.firstChild.style.fill = color;
      } else {
        node.style.backgroundColor = color;
      }
    });

    this.refs.header.style.backgroundColor = backgroundColor;
  };

  render () {
    const { className, style, color = '', backgroundColor = '' } = this.props;

    return (
      <div
        ref="header"
        className="mobile-header"
      >
        <div
          className="menu-icon"
          onClick={this.props.onMenuClick}
        >
          {
            _.range(3).map((i) => {
              return <span key={i} className="menu-content"></span>
            })
          }
        </div>
        <div
          className="logo-icon menu-content"
          data-color={color}
          dangerouslySetInnerHTML={{ __html: SALogoSvg }}>
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