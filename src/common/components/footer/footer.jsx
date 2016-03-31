import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import EmailSvg from 'svgs/icon-email.svg';
import FacebookSvg from 'svgs/icon-facebook.svg';
import TwitterSvg from 'svgs/icon-twitter.svg';
import Share from 'easy-share-popup';
import store from 'common/store';
import * as actionCreators from 'common/actions/learn-more-modal-actions';

export default class Footer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    primaryBackgroundColor: React.PropTypes.string,
    secondaryBackgroundColor: React.PropTypes.string
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.share = new Share(location.origin);
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
  };

  handleTwitterClick = () => {
    this.share.twitter('', 'Visit Success Academy website.');
  };

  handleEmailClick = () => {
    window.location.href = 'mailto:mail@example.org';
  };

  handleLearnMoreClick = () => {
    store.dispatch(actionCreators.openModal());
  };

  render() {
    const {className = '', style} = this.props;

    return (
      <div
        ref="footer"
        className={`footer ${className}`}
        style={style}
      >
        <div
          className="main-links"
          style={{ backgroundColor: this.props.primaryBackgroundColor }}
        >
          <div
            className="svg-logo"
            dangerouslySetInnerHTML={{ __html: SALogoSvg }}
          >
          </div>
          <a href="#">Home</a>
          <div className={'link'} onClick={this.handleLearnMoreClick}>Learn More</div>
          <a href="http://successacademy.org/privacy_policy.html" target="_blank">Privacy & Terms</a>
          <a href="http://successacademy.org" target="_blank">Successacademy.org</a>
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
            ></div>
            <div
              className="svg-icon"
              dangerouslySetInnerHTML={{ __html: FacebookSvg }}
              onClick={this.handleFacebookClick}
            ></div>
            <div
              className="svg-icon"
              dangerouslySetInnerHTML={{ __html: EmailSvg }}
              onClick={this.handleEmailClick}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}
