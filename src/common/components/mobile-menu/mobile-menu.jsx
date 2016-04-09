import React from 'react';
import { Link } from 'react-router';
import animate from 'gsap-promise';
import IconWatch from 'svgs/icon-play.svg';
import ExploreIcon from 'svgs/icon-explore.svg';
import PlayIcon from 'svgs/mobile-play-icon-2.svg';
import LearnMoreIcon from 'svgs/learn-more-icon-2.svg';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import EmailSvg from 'svgs/icon-email.svg';
import FacebookSvg from 'svgs/icon-facebook.svg';
import TwitterSvg from 'svgs/icon-twitter.svg';
import Share from 'easy-share-popup';

const EaseType = Expo;

export default class MobileMenu extends React.Component {

  data = [
    {
      route: '/mobile/chapters',
      name: 'Explore More Content',
      svgIcon: ExploreIcon
    },
    {
      route: '/mobile/videos',
      name: 'Instructional Videos',
      svgIcon: PlayIcon
    },
    {
      route: '/mobile/learn-more',
      name: 'Learn More',
      svgIcon: LearnMoreIcon
    }
  ];

  componentDidMount () {
    animate.set(this.refs.menu, { x: -this.refs.menu.offsetWidth*2 });
    this.share = new Share(location.origin + '/middleschool');
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
    return animate.to(this.refs.menu, 0.4, { x: 0, ease: EaseType.easeOut });
  };

  animateOutMenu = () => {
    return animate.to(this.refs.menu, 0.4, { delay: 0.1, x: -this.refs.menu.offsetWidth, ease: EaseType.easeOut });
  };

  handleFacebookClick = () => {
    this.share.facebook();
  };

  handleTwitterClick = () => {
    this.share.twitter('', 'Visit Success Academy website.');
  };

  handleEmailClick = () => {
    window.location.href = 'mailto:mail@example.org';
  };

  render () {
    const { className, style } = this.props;

    return (
      <div
        ref="menu"
        className="mobile-menu"
      >
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
          <a className="bottom-item" href="http://www.successacademies.org/privacy-policy/" target="_blank">
            Privacy and Terms
          </a>
          <a className="bottom-item"  href="http://www.successacademies.org" target="_blank">
            Successacademy.org
          </a>
          <div className="menu-footer">
            <label>Share</label>
            <span
              className="menu-share-icon"
              dangerouslySetInnerHTML={{ __html: TwitterSvg }}
              onClick={this.handleTwitterClick}
            >
            </span>
            <span
              className="menu-share-icon"
              dangerouslySetInnerHTML={{ __html: FacebookSvg }}
              onClick={this.handleFacebookClick}
            >
            </span>
            <span
              className="menu-share-icon"
              dangerouslySetInnerHTML={{ __html: EmailSvg }}
              onClick={this.handleEmailClick}
            >
            </span>
          </div>
        </div>
      </div>
    )
  }
}