import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';
import EmailSvg from 'svgs/icon-email.svg';
import FacebookSvg from 'svgs/icon-facebook.svg';
import TwitterSvg from 'svgs/icon-twitter.svg';

export default class Footer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    primaryBackgroundColor: React.PropTypes.string,
    secondaryBackgroundColor: React.PropTypes.string
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
          <a href="#">Learn More</a>
          <a href="#">Privacy & Terms</a>
          <a href="http://successacademy.org">Successacademy.org</a>
        </div>
        <div
          className="share-links"
          style={{ backgroundColor: this.props.secondaryBackgroundColor }}
        >
          <label>Share</label>
          <div className="share-icons">
            <div className="svg-icon" dangerouslySetInnerHTML={{ __html: TwitterSvg }}></div>
            <div className="svg-icon" dangerouslySetInnerHTML={{ __html: FacebookSvg }}></div>
            <div className="svg-icon" dangerouslySetInnerHTML={{ __html: EmailSvg }}></div>
          </div>
        </div>
      </div>
    )
  }
}
