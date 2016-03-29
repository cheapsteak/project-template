import React from 'react';
import {findDOMNode} from 'react-dom';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import IconLoader from 'svgs/icon-sa_monogram.svg';
import {Link} from 'react-router';
import animate from 'gsap-promise';
import Promise from 'bluebird';
import Preload from 'inject-prefetch';
import gridData  from '../../models/grid-model';
import videoData  from '../../data/narrative-video';
import RectangularButton  from '../../../../node_modules/common/components/rectangular-button/rectangular-button.jsx';
import BgCover from 'background-cover';

export default class LandingPage extends React.Component {

  static propTypes = {
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {};

  componentDidMount() {
    const textPos = (this.refs.ctaContainer.offsetHeight + this.refs.description.offsetHeight) * 0.5;

    this.containerEl = findDOMNode(this);
    this.ctaWatch = findDOMNode(this.refs.ctaWatch);
    this.ctaExplore = findDOMNode(this.refs.ctaExplore);

    animate.set([this.refs.description, this.ctaWatch, this.ctaExplore], {autoAlpha: 0, y: 40});
    animate.set([this.refs.video, this.refs.title], {scale: 1.25});
    animate.set(this.refs.contentContainer, {y: textPos});

    this.videoLoadPromise = new Promise((resolve, reject) => {
      this.refs.video.addEventListener('canplaythrough', () => {
        this.init();
        resolve();
      });
    });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillAppear(callback) {
    this.initAnimateInPromise = this.animateIn(callback, {delay: 0});
  }

  componentWillEnter(callback) {
    this.initAnimateInPromise = this.animateIn(callback, {delay: 0});
  }

  componentWillLeave(callback) {
    this.refs.video.pause();
    const path = location.pathname.replace(CONFIG.basePath + '/', '');
    (path === 'grid') ? this.animateOutToGrid(callback) : this.animateOutToVideo(callback);
  }

  componentWillUnmount() {
    this.refs.video.removeEventListener('canplaythrough', this.init);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  init = () => {
    this.resize();
    this.refs.video.play();

    return Promise.all([
      this.initAnimateInPromise,
      this.videoLoadPromise
    ]).then(() => {
      this.preloadNextContent();
      this.animateOnVideoLoaded();
    })
  };

  resize = () => {
    this.handleWindowResize();
  };

  handleWindowResize = () => {
    BgCover.BackgroundCover(this.refs.video, this.refs.videoContainer);
  };

  preloadNextContent = () => {
    const gridImages = gridData.getImages();
    const documentaryVideo = videoData.src;

    Preload(gridImages.concat(documentaryVideo));
  };

  animateIn = (callback, {delay=0}) => {
    const staggerEls = [this.refs.subtitle, this.refs.title, this.refs.loaderContainer];
    animate.set(staggerEls, {autoAlpha: 0, scale: 1.6});

    return animate.staggerTo(staggerEls, 1.7, {
        autoAlpha: 1,
        y: 0,
        scale: 1.2,
        ease: Expo.easeOut,
        delay: 0.3 + delay
      }, 0.3)
      .then(() => callback && callback())
  };

  animateOnVideoLoaded = () => {
    const ease = Expo.easeOut;
    const staggerEls = [this.refs.description, this.ctaWatch, this.ctaExplore];

    return animate.all([
      animate.to(this.refs.loaderContainer, 0.3, {autoAlpha: 0}),
      animate.to(this.refs.coverBg, 1.2, {autoAlpha: 0}),
      animate.to(this.refs.contentContainer, 1.5, {y: 0, ease: ease}),
      animate.to([this.refs.subtitle, this.refs.title], 1.7, {scale: 1, ease: ease}),
      animate.to(this.refs.video, 2, {scale: 1, ease: ease}),
      animate.staggerTo(staggerEls, 1, {autoAlpha: 1, y: 0, delay: 0.3, ease: ease}, 0.2)
    ])
  };

  animateOutToGrid = (callback) => {
    const staggerEls = [this.refs.subtitle, this.refs.title, this.refs.description, this.ctaWatch, this.ctaExplore];

    return animate
      .all([
        animate.staggerTo(staggerEls, 0.6, {autoAlpha: 0, scale: 0.9, ease: Expo.easeOut}, 0.1),
        animate.to(this.refs.videoContainer, 1, {autoAlpha: 0}),
        animate.to(this.containerEl, 0, {backgroundColor: 'rgba(0,0,0,0)'})
      ])
      .then(() => callback && callback())
  };

  animateOutToVideo = (callback) => {
    const duration = 1;
    const ease = Expo.easeOut;

    return animate.all([
        animate.to(this.containerEl, duration, {x: '-100%', ease: ease}),
        animate.to(this.refs.mainContainer, duration, {x: '100%', ease: ease}),
        animate.to(this.refs.contentContainer, 0.2, {autoAlpha: 0})
      ])
      .then(() => callback && callback())
  };

  render() {

    return (
      <div className={`landing-page ${this.props.className}`}>
        <div ref="mainContainer" className={`main-container`}>

          <div ref="videoContainer" className={`video-container`}>
            <video
              ref="video"
              preload={true}
              loop={true}
              muted={true}
              src={`${ASSET_PATH}/videos/landing-video.mp4`}
            >
            </video>
            <div ref="gradient" className={`gradient`}></div>
          </div>

          <div ref="coverBg" className={`cover-bg`}></div>

          <div ref="contentContainer" className={`content-container`}>
            <div ref="subtitle" className={`subtitle`}>Welcome to our</div>
            <div ref="title" className={`title`}>Middle School Tour</div>
            <div ref="description" className={`description`}>
              Take an inside look at our culture and curriculum through the eyes of our scholars.
            </div>

            <div ref="ctaContainer" className={`cta-container`}>
              <Link
                ref="ctaWatch"
                className={`cta watch`}
                to={`narrative-video`}
              >
                <RectangularButton
                  style={{width: '100%', height: '100%'}}
                  text={`Watch Documentary`}
                  color={`#fff`}
                  svgIcon={IconWatch}
                  backgroundColor={`#8f8f8f`}
                  hoverBackgroundColor={`#6a6969`}
                />
              </Link>
              <Link
                ref="ctaExplore"
                className={`cta explore`}
                to={`grid`}
              >
                <RectangularButton
                  style={{width: '100%', height: '100%'}}
                  text={`Chapter Menu`}
                  color={`#fff`}
                  svgIcon={IconExplore}
                  backgroundColor={`rgba(255,255,255,0)`}
                  hoverBackgroundColor={`rgba(255,255,255,0.2)`}
                />
              </Link>
            </div>
          </div>

          <div ref="loaderContainer" className={`loader-container`}>
            <div className={`icon`} dangerouslySetInnerHTML={{ __html: IconLoader }}></div>
            <p>Loading</p>
          </div>

        </div>
      </div>
    );
  }
}
