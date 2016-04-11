import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import RotateIcon from 'svgs/rotate-icon.svg';
import SALogoSvg from 'svgs/icon-sa_monogram.svg';

export default class RotateScreen extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  };

  isVisible: false;

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    if(window.innerHeight < window.innerWidth) {
      this.show();
    } else {
      this.hide();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  show = () => {
    this.isVisible = true;
    animate.set(this.refs.root, { visibility: 'visible' });
  };

  hide = () => {
    this.isVisible = false;
    animate.set(this.refs.root, { visibility: 'hidden' });
  };

  handleResize = () => {
    if(window.innerHeight < window.innerWidth && !this.isVisible) {
      this.show();
    } else if(window.innerHeight > window.innerWidth && this.isVisible) {
      this.hide();
    }
  };

  render() {
    const { className = '', style, bannerImage } = this.props;

    return (
      <div
        ref="root"
        className={`rotate-screen className`}
        style={style}
      >
        <div className="rotate-icon" dangerouslySetInnerHTML={{ __html: RotateIcon }}></div>
        <p>Please rotate your screen into portrait mode.</p>
        <div className="sa-logo" dangerouslySetInnerHTML={{ __html: SALogoSvg }}></div>
      </div>
    )
  }
}
