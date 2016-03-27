import React from 'react';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import EmailSvg from 'svgs/icon-email.svg';
import FacebookSvg from 'svgs/icon-facebook.svg';
import TwitterSvg from 'svgs/icon-twitter.svg';

const EaseType = Quad;
const duration = 0.75;

export default class MobileMenu extends React.Component {

  data = [
    {
      route: '/mobile/chapters',
      name: 'Explore More Content',
      svgIcon: IconExplore
    },
    {
      route: '/mobile',
      name: 'Instructional Videos',
      svgIcon: IconWatch
    },
    {
      route: '/mobile',
      name: 'Learn More',
      svgIcon: SALogoSvg
    }
  ];

  componentDidMount () {
    animate.set(this.refs.menu, { x: -this.refs.menu.offsetWidth*2 });
  }

  componentWillAppear (callback) {
    this.animateInMenu()
      .then(callback);
  }

  componentWillEnter (callback) {
    this.animateInMenu()
      .then(callback);
  }

  componentWillLeave (callback) {
    this.animateOutMenu()
      .then(callback);
  };

  animateInMenu = () => {
    return animate.to(this.refs.menu, duration, { x: 0, ease: EaseType.easeOut });
  };

  animateOutMenu = () => {
    return animate.to(this.refs.menu, duration, { x: -this.refs.menu.offsetWidth*2, ease: EaseType.easeIn });
  };

  render () {
    const { className, style } = this.props;

    return (
      <div
        ref="menu"
        className="mobile-menu"
      >
        <div className="menu-header">
          <div
            className="back-arrow-wrapper"
            onClick={this.props.onBackIconClick}
          >
            <div
              className="back-arrow"
            >
            </div>
          </div>
          <Link
            to="/mobile"
            onClick={this.props.closeMenu}
          >
            <div
              className="logo-icon"
              dangerouslySetInnerHTML={{ __html: SALogoSvg }}
            >
            </div>
          </Link>
        </div>
        {
          this.data.map((item, i) => {
            return (
              <Link
                key={i}
                to={item.route}
                className="menu-item"
                onClick={this.props.closeMenu}
              >
                <span
                  className="menu-item-svg"
                  dangerouslySetInnerHTML={{ __html: item.svgIcon }}
                >
                </span>
                <div className="menu-item-title">
                  { item.name }
                </div>
              </Link>
            )
          })
        }
        <div className="menu-bottom">
          <Link className="bottom-item" to="/mobile">
            Privacy and Terms
          </Link>
          <Link className="bottom-item" to="/mobile">
            Successacademy.org
          </Link>
          <div className="menu-footer">
            <label>Share</label>
            <span
              className="menu-share-icon"
              dangerouslySetInnerHTML={{ __html: TwitterSvg }}
            >
            </span>
            <span
              className="menu-share-icon"
              dangerouslySetInnerHTML={{ __html: FacebookSvg }}
            >
            </span>
            <span
              className="menu-share-icon"
              dangerouslySetInnerHTML={{ __html: EmailSvg }}
            >
            </span>
          </div>
        </div>
      </div>
    )
  }
}