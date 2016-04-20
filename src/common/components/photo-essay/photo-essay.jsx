import React from 'react';
import {findDOMNode} from 'react-dom';
import BackButtonSvg from 'svgs/photo-essay-prev-button.svg';
import NextButtonSvg from 'svgs/photo-essay-next-button.svg';
import FullscreenButtonSvg from 'svgs/photo-essay-fullscreen-button.svg';
import {Link} from 'react-router';
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import TransitionItem from './transition-item.jsx';
import Slider from './slider/slider.jsx';  


class PhotoEssay extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    isHoveringNext: false,
    isHoveringPrevious: false,
  };

  handlePrevClick = () => {
    audio.play('button-click');
    this.props.onPrevClick();
  };

  handleNextClick = () => {
    audio.play('button-click');
    this.props.onNextClick();
  };

  handleNextMouseEnter = () => {
    audio.play('button-rollover');
    // might need to disable this for tablet
    this.setState({isHoveringNext: true });
  };

  handlePreviousMouseEnter = () => {
    audio.play('button-rollover');
    // might need to disable this for tablet
    this.setState({isHoveringPrevious: true });
  };

  handleNextMouseLeave = () => {
    this.setState({isHoveringNext: false });
  };

  handlePreviousMouseLeave = () => {
    this.setState({isHoveringPrevious: false });
  };

  componentWillEnterFullBrowser = (originalComponent) => {
    const cloneEl = findDOMNode(this);
    const originalEl = findDOMNode(originalComponent);

    const cloneParallaxTarget = cloneEl.querySelector('.parallax-target');
    const originalParallaxTarget = originalEl.querySelector('.parallax-target');

    cloneParallaxTarget.setAttribute('style', originalParallaxTarget.getAttribute('style'));
    animate.to(cloneParallaxTarget, 0.5, {y: 0, opacity: 0.5});

    return Promise.resolve();
  }

  componentWillLeaveFullBrowser = (originalComponent) => {
    const cloneEl = findDOMNode(this);
    const originalEl = findDOMNode(originalComponent);

    const cloneParallaxTarget = cloneEl.querySelector('.parallax-target');
    const originalParallaxTarget = originalEl.querySelector('.parallax-target');

    const originalParallaxOffset = originalParallaxTarget.parentNode.getBoundingClientRect().top - originalParallaxTarget.getBoundingClientRect().top;

    animate.to(cloneParallaxTarget, 0.5, {y: originalParallaxOffset});
    return Promise.resolve();
  }

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
          <Slider
            currentIndex={index || 0}
            photos={photos || []}
            shouldPreviewPreviousPhoto={this.state.isHoveringPrevious}
            shouldPreviewNextPhoto={this.state.isHoveringNext}
          >
          </Slider>
        </div>
        <div className="photo-description">
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
              shouldTransitionParentNodeHeight={true}
            >
              <p>{ photo.description }</p>
            </TransitionItem>
          </TransitionGroup>
        </div>
        <div className="photo-controls">
          <div
            className="button back-button"
            onClick={this.handlePrevClick}
            onMouseEnter={this.handlePreviousMouseEnter}
            onMouseLeave={this.handlePreviousMouseLeave}
            dangerouslySetInnerHTML={{ __html: BackButtonSvg }}
          ></div>
          <div
            className="button next-button"
            onClick={this.handleNextClick}
            onMouseEnter={this.handleNextMouseEnter}
            onMouseLeave={this.handleNextMouseLeave}
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
