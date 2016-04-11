import React from 'react';
import {findDOMNode} from 'react-dom';
import BackButtonSvg from 'svgs/photo-essay-prev-button.svg';
import NextButtonSvg from 'svgs/photo-essay-next-button.svg';
import FullscreenButtonSvg from 'svgs/photo-essay-fullscreen-button.svg';
import {Link} from 'react-router';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';

import TransitionItem from './transition-item.jsx';

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
        {/* need a wrapper for scrollmagic / parallax effect */}
        <div className="parallax-target">
          {/* need another wrapper for slideshow */}
          <div
            className="photo-slider"
            style={{
              transform: `translateX( ${-100 * index}%)`,
              transition: `transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)`,
            }}
          >
            {
              photos && photos.map((photo, index) => {
                const style = index === 0
                  ? {
                    position:  'static'
                  }
                  : {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `translateX(${100 * index}%)`
                  };

                return <div
                    key={index}
                    className="image-wrapper"
                    style={style}
                  >
                    <img src={photo.image}/>
                  </div>
              })
            }
          </div>
        </div>
        <div className="photo-description">
          <h3>About this picture</h3>
          <TransitionGroup component="div" className="is-relative pin-non-first-children">
            <TransitionItem
              duration={0.3}
              key={index}
              beforeEnter={{ opacity: 0 }}
              idle={{ opacity: 1 }}
              afterLeave={{ opacity: 0 }}
              ease={{
                enter: Sine.easeIn,
                leave: Sine.easeOut,
              }}
            >
              <p>{ photo.description }</p>
            </TransitionItem>
          </TransitionGroup>
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
