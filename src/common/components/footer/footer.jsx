import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import EmailSvg from 'svgs/icon-email.svg';
import FacebookSvg from 'svgs/icon-facebook.svg';
import TwitterSvg from 'svgs/icon-twitter.svg';
import FibonacciSVG from 'svgs/fibonacci.svg';
import Share from 'easy-share-popup';
import store from 'common/store';
import * as actionCreators from 'common/actions/learn-more-modal-actions';
import {Link} from 'react-router';

export default class Footer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    primaryBackgroundColor: React.PropTypes.string,
    secondaryBackgroundColor: React.PropTypes.string
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.share = new Share(location.origin + '/middleschool');
  }

  componentWillAppear(callback) {
    this.animateIn(callback);
  }

  componentWillEnter(callback) {
    this.animateIn(callback);
  }

  componentWillLeave(callback) {
    this.animateOut(callback);
  }

  animateIn = (callback) => {
    animate.set(this.containerEl, {y: '100%'});

    animate.to(this.containerEl, 0.7, {y: '0%', ease: Expo.easeOut, delay: 0.9})
      .then(() => {
        callback && callback()
      })
  };

  animateOut = (callback) => {
    animate.to(this.containerEl, 0.4, {y: '100%', ease: Expo.easeOut})
      .then(() => {
        callback && callback()
      })
  };

  handleFacebookClick = () => {
    this.share.facebook();
    this.playClickSound();
  };

  handleTwitterClick = () => {
    this.share.twitter('', 'Visit Success Academy website.');
    this.playClickSound();
  };

  handleEmailClick = () => {
    window.location.href = 'mailto:mail@example.org';
    this.playClickSound();
  };

  handleLearnMoreClick = () => {
    store.dispatch(actionCreators.openModal());
    this.playClickSound();
  };

  playClickSound = () => {
    audio.play('button-click');
  };

  playMouseEnterSound = () => {
    audio.play('button-rollover');
  };

  render() {
    const {className = '', style} = this.props;

    return (
      <div
        ref="footer"
        className={`footer ${className}`}
        style={style}
      >
        <div className="fibonacci-container">
          <div className="fibonacci" dangerouslySetInnerHTML={{ __html: FibonacciSVG }}></div>
          <div className="fibonacci" dangerouslySetInnerHTML={{ __html: FibonacciSVG }}></div>
          <div className="fibonacci" dangerouslySetInnerHTML={{ __html: FibonacciSVG }}></div>
        </div>

        <div className="footer-wrapper">
          <div
            className="main-links"
            style={{ backgroundColor: this.props.primaryBackgroundColor }}
          >
            <a
              className="logo-link"
              href="http://www.successacademies.org" target="_blank"
              onClick={this.playClickSound}
              onMouseEnter={this.playMouseEnterSound}
            >
              <div
                className="svg-logo"
                dangerouslySetInnerHTML={{ __html: SALogoSvg }}
              >
              </div>
            </a>
            <Link to={`/`} className="home-link">Home</Link>
            <a
              onClick={this.handleLearnMoreClick}
              onMouseEnter={this.playMouseEnterSound}
            >
              About
            </a>
            <a
              href="http://www.successacademies.org/privacy-policy/"
              target="_blank"
              onClick={this.playClickSound}
              onMouseEnter={this.playMouseEnterSound}
            >
              Privacy Policy
            </a>
          </div>
          <div
            className="share-links"
            style={{ backgroundColor: this.props.secondaryBackgroundColor }}
          >
            <label>Share</label>
            <div className="share-icons">
              <div
                className="svg-icon"
                dangerouslySetInnerHTML={{ __html: TwitterSvg }}
                onClick={this.handleTwitterClick}
                onMouseEnter={this.playMouseEnterSound}
              ></div>
              <div
                className="svg-icon"
                dangerouslySetInnerHTML={{ __html: FacebookSvg }}
                onClick={this.handleFacebookClick}
                onMouseEnter={this.playMouseEnterSound}
              ></div>
              <div
                className="svg-icon"
                dangerouslySetInnerHTML={{ __html: EmailSvg }}
                onClick={this.handleEmailClick}
                onMouseEnter={this.playMouseEnterSound}
              ></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
