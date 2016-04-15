import React from 'react';
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
import config from '../../../../config.js';

const EaseType = Expo;

export default class MobileMenu extends React.Component {

  static propTypes = {
    currentRoute: React.PropTypes.string,
    onMenuClose: React.PropTypes.func
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  data = [
    {
      route: '/chapters',
      name: 'Main Menu',
      svgIcon: ExploreIcon
    },
    {
      route: '/videos',
      name: 'See Classes In Action',
      svgIcon: PlayIcon
    },
    {
      route: '/learn-more',
      name: 'About',
      svgIcon: LearnMoreIcon
    }
  ];

  componentDidMount () {
    animate.set(this.refs.menu, { x: -this.refs.menu.offsetWidth });
    this.share = new Share(location.origin + CONFIG.basePath);
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

    tracking.trackEvent({
      category: 'Mobile - Facebook',
      label: 'Share'
    });
  };

  handleTwitterClick = () => {
    this.share.twitter('', 'Success Academy middle school scholars take you #insideSuccess. Watch the virtual tour: ');

    tracking.trackEvent({
      category: 'Mobile - Twitter',
      label: 'Share'
    });
  };

  handleEmailClick = () => {
    window.location.href = 'mailto:?subject=Success Academy middle school&body=I just took the Success Academy middle school virtual tour! Check it out here: ' + location.origin + CONFIG.basePath;

    tracking.trackEvent({
      category: 'Mobile - Email',
      label: 'Share'
    });
  };

  handleMenuItemClick = (route, e) => {
    if(this.props.currentRoute !== route) {
      this.context.router.push(route);
    }

    var category;
    switch (route) {
      case '/chapters':
        category = 'Mobile - Explore grid CTA';
        break;
      case '/videos':
        category = 'Mobile - Instructional videos grid CTA';
        break;
      case '/learn-more':
        category = 'Mobile - Learn more CTA';
        break;
      default:
        break;
    }

    tracking.trackEvent({
      category: category,
      label: 'Mobile Menu'
    });

    this.props.closeMenu();
  };

  handlePolicyClick = () => {
    tracking.trackEvent({
      category: 'Mobile - Privacy Policy Link',
      label: 'Mobile Menu'
    });
  };

  handleCareersClick = () => {
    tracking.trackEvent({
      category: 'Mobile - Careers Link',
      label: 'Mobile Menu'
    });
  };

  handleSuccessAcademiesClick = () => {
    tracking.trackEvent({
      category: 'Mobile - Success Academies Link',
      label: 'Mobile Menu'
    });
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
              <div
                key={i}
                to={item.route}
                className="menu-item"
                onClick={this.handleMenuItemClick.bind(_, item.route)}
              >
                <span
                  className="menu-item-svg"
                  dangerouslySetInnerHTML={{ __html: item.svgIcon }}
                >
                </span>
                <div className="menu-item-title">
                  { item.name }
                </div>
              </div>
            )
          })
        }
        <div className="menu-bottom">
          <a
            className="bottom-item"
            href="http://www.successacademies.org/privacy-policy/"
            target="_blank"
            onClick={this.handlePolicyClick}
          >
            Privacy Policy
          </a>
          <a
            className="bottom-item"
            href="http://www.successacademies.org"
            target="_blank"
            onClick={this.handleSuccessAcademiesClick}
          >
            Successacademies.org
          </a>
          <a
            className="bottom-item"
            href="http://jobs.successacademies.org/"
            target="_blank"
            onClick={this.handleCareersClick}
          >
            Careers
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
