import React from 'react';
import {findDOMNode} from 'react-dom';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import IconLoader from 'svgs/icon-loader.svg';
import {Link} from 'react-router';
import animate from 'gsap-promise';
import Promise from 'bluebird';
const BackgroundCover = require('background-cover').BackgroundCover;

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

    window.addEventListener('resize', this.positionVideo);
  }

  componentWillAppear(callback) {
    this.initAnimateInPromise = this.animateIn(callback);
  }

  componentWillEnter(callback) {
    this.initAnimateInPromise = this.animateIn(callback);
  }

  componentWillLeave(callback) {
    this.refs.video.pause();
    const path = location.pathname.replace(CONFIG.basePath + '/', '');
    (path === 'grid') ? this.animateOutToGrid(callback) : this.animateOutToVideo(callback);
  }

  componentWillUnmount() {
    this.refs.video.removeEventListener('canplaythrough', this.init);
    window.removeEventListener('resize', this.positionVideo);
  }

  init = () => {
    this.positionVideo();
    this.refs.video.play();

    return Promise.all([
      this.initAnimateInPromise,
      this.videoLoadPromise
    ]).then(() => {
      this.animateOnVideoLoaded();
    })
  };

  animateIn = (callback) => {
    const staggerEls = [this.refs.subtitle, this.refs.title, this.refs.loaderContainer];

    animate.set(staggerEls, {autoAlpha: 0, scale: 1.6});

    return animate.staggerTo(staggerEls, 1.7, {autoAlpha: 1, y: 0, scale: 1.2, ease: Expo.easeOut, delay: 0.3}, 0.3)
      .then(() => callback && callback())
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
        animate.to(this.refs.mainContainer, duration, {x: '100%', ease: ease})
      ])
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

  positionVideo = () => {
    BackgroundCover(this.refs.video, this.refs.videoContainer);
  };

  render() {

    return (
      <div className={`landing-page ${this.props.className}`}>
        <div ref="mainContainer" className={`main-container`}>

          <div ref="videoContainer" className={`video-container`}>
            <video ref="video" preload={true} loop={true} muted={true}>
              <source src={`http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4`}/>
            </video>
            <div ref="gradient" className={`gradient`}></div>
          </div>

          <div ref="coverBg" className={`cover-bg`}></div>

          <div ref="contentContainer" className={`content-container`}>
            <div ref="subtitle" className={`subtitle`}>Welcome to our</div>
            <div ref="title" className={`title`}>Middle School Tour</div>
            <div ref="description" className={`description`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
            </div>

            <div ref="ctaContainer" className={`cta-container`}>
              <Link ref="ctaWatch" className={`cta watch`} to={`video`}>
                <div className={`icon`} dangerouslySetInnerHTML={{ __html: IconWatch }}></div>
                <p>Start the Tour</p>
              </Link>
              <Link ref="ctaExplore" className={`cta explore`} to={`grid`}>
                <div className={`icon`} dangerouslySetInnerHTML={{ __html: IconExplore }}></div>
                <p>Explore</p>
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
