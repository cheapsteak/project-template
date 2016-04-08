import React from 'react';
import {findDOMNode} from 'react-dom';
import BackButtonSvg from 'svgs/photo-essay-prev-button.svg';
import NextButtonSvg from 'svgs/photo-essay-next-button.svg';
import FullscreenButtonSvg from 'svgs/photo-essay-fullscreen-button.svg';
import {Link} from 'react-router';
import animate from 'gsap-promise';

class PhotoEssay extends React.Component {
  constructor(props) {
    super(props)
  }

  handlePrevClick = () => {
    audio.play('button-click');
    this.props.onPrevClick();
  };

  handleNextClick = () => {
    audio.play('button-click');
    this.props.onNextClick();
  };

  handleButtonMouseOver = () => {
    audio.play('button-rollover');
  };

  render() {
    const {style, photos, index, isFullBrowser, fullBrowserRoute, fullBrowserExitRoute, className} = this.props;
    const photo = photos && photos[index] || {};
    let currentPhotoNumber = photos ? index + 1 : 0;
    let maxPhotoNumber = photos ? photos.length : 0;
    const route = (isFullBrowser ? fullBrowserRoute : fullBrowserExitRoute) || '/';

    return (
      <div className={`photo-essay ${className || ''}`} style={style}>
        <div className="image-wrapper">
          <img src={photo.image}/>
        </div>
        <div className="photo-description">
          <p>{ photo.description }</p>
        </div>
        <div className="photo-controls">
          <div
            className="button back-button"
            onClick={this.handlePrevClick}
            onMouseEnter={this.handleButtonMouseOver}
            dangerouslySetInnerHTML={{ __html: BackButtonSvg }}
          ></div>
          <div
            className="button next-button"
            onClick={this.handleNextClick}
            onMouseEnter={this.handleButtonMouseOver}
            dangerouslySetInnerHTML={{ __html: NextButtonSvg }}
          ></div>
          {
            isFullBrowser
            ? <div
                className="button fullscreen-button"
                onMouseEnter={this.handleButtonMouseOver}
                onClick={ () => this.props.exitFullBrowser(route) }
              >
                <span dangerouslySetInnerHTML={{ __html: FullscreenButtonSvg }}></span>
              </div>
            : <Link
                className="button fullscreen-button"
                onMouseEnter={this.handleButtonMouseOver}
                to={route}
              >
                <span dangerouslySetInnerHTML={{ __html: FullscreenButtonSvg }}></span>
              </Link>
          }
          <div className="page-display">{`${currentPhotoNumber} of ${maxPhotoNumber}`}</div>
        </div>
      </div>
    )
  }
}

export default PhotoEssay
