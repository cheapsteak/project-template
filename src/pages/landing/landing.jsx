import React from 'react';
import {findDOMNode} from 'react-dom';
import IconWatch from '../../assets/svgs/icon-playoutline.svg';
import IconExplore from '../../assets/svgs/icon-explore.svg';
import IconLoader from '../../assets/svgs/icon-sa_monogram.svg';
import {Link} from 'react-router';
import animate from 'gsap-promise';
import Promise from 'bluebird';
import Preload from 'inject-prefetch';
import gridData  from 'common/models/grid-model';
import videoData  from 'common/data/narrative-video';
import RectangularButton  from 'common/components/rectangular-button/rectangular-button.jsx';
import BgCover from 'background-cover';
import landingData  from 'common/data/landing';
import Footer from 'common/components/footer/footer';
import TransitionGroup from 'react-addons-transition-group';
import detect from 'common/utils/detect';
import bodymovin from 'bodymovin';

export default class LandingPage extends React.Component {

  static propTypes = {
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {
    data: {},
    shouldShowFooter: false
  };

  static contextTypes = {
    previousRoute: React.PropTypes.string
  };

  componentWillMount() {
    this.setState({data: {...landingData}});
  }

  componentDidMount() {
    const textPos = (this.refs.ctaContainer.offsetHeight + this.refs.description.offsetHeight) * 0.5;

    this.containerEl = findDOMNode(this);
    this.ctaWatch = findDOMNode(this.refs.ctaWatch);
    this.ctaExplore = findDOMNode(this.refs.ctaExplore);

    animate.set([this.refs.description, this.ctaWatch, this.ctaExplore], {autoAlpha: 0, y: 40});
    animate.set([this.refs.video, this.refs.title], {scale: 1.25});
    animate.set(this.refs.contentContainer, {y: textPos});

    const event = detect.isTablet ? 'loadedmetadata' : 'canplaythrough';
    this.videoLoadPromise = new Promise((resolve, reject) => {
      this.refs.video.addEventListener(event, this.init.bind(this, resolve));
    });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillAppear(callback) {
    this.initAnimateInPromise = this.animateIn(callback, {delay: 0});
  }

  componentWillEnter(callback) {
    animate.set(this.containerEl, {zIndex: 1});
    this.refs.video.pause();
    this.createTitleAnimation();
    this.logoAnimation.goToAndStop(this.logoAnimation.totalFrames, true);

    const staggerEls = [this.refs.description, this.ctaExplore, this.ctaWatch];
    animate.set([this.refs.loaderContainer, this.refs.coverBg], {autoAlpha: 0});
    animate.set([this.refs.contentContainer, staggerEls], {y: 0, autoAlpha: 1});
    animate.set([this.refs.subtitle, this.refs.title, this.refs.video], {scale: 1});

    setTimeout(() => {
      this.setState({shouldShowFooter: true});
      this.refs.video.play();
      animate.set(this.containerEl, {zIndex: 999999});
    }, 700);

    callback();
  }

  componentWillLeave(callback) {
    this.refs.video.pause();
    const path = location.pathname.replace(CONFIG.basePath + '/', '');
    (path === 'grid') ? this.animateOutFade(callback) : this.animateOutSwipe(callback);
  }

  componentWillUnmount() {
    const event = detect.isTablet ? 'loadedmetadata' : 'canplaythrough';
    this.refs.video.removeEventListener(event, this.init);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  createTitleAnimation = () => {
    this.logoAnimation = bodymovin.loadAnimation({
      container: this.refs.title, // the dom element
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(require('./logo-animation-string.js')) // the animation data
    });
  };

  init = (callback) => {
    if (this.isInitialized) {
      return
    }

    this.isInitialized = true;
    callback();

    this.resize();

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
    const documentaryPoster = videoData.poster;

    Preload(gridImages.concat(documentaryVideo).concat(documentaryPoster));
  };

  animateIn = (callback, {delay=0}) => {
    const staggerEls = [this.refs.subtitle, this.refs.title, this.refs.loaderContainer];
    animate.set(staggerEls, {autoAlpha: 0, scale: 1.6});

    const scalingAnimation = animate.staggerTo(staggerEls, 1.7, {
        autoAlpha: 1,
        y: 0,
        scale: 1.2,
        ease: Expo.easeOut,
        delay: 0.3 + delay
      }, 0.3)
      .then(() => callback && callback())

    this.createTitleAnimation();

    this.logoAnimation.setSpeed(1);
    this.logoAnimation.play();
    animate.set(this.refs.title.querySelectorAll('svg g g g g g path'), {stroke: '#f99100'});

    return Promise.all([scalingAnimation]);
  };

  animateOnVideoLoaded = () => {
    const ease = Expo.easeOut;
    const staggerEls = [this.refs.description, this.ctaExplore, this.ctaWatch];

    if (!this.context.previousRoute) this.setState({shouldShowFooter: true});

    this.refs.video.play();

    return animate.all([
      animate.to(this.refs.loaderContainer, 0.3, {autoAlpha: 0}),
      animate.to(this.refs.coverBg, 0.8, {autoAlpha: 0}),
      animate.to(this.refs.contentContainer, 1.5, {y: 0, ease: ease}),
      animate.to([this.refs.subtitle, this.refs.title], 1.7, {scale: 1, ease: ease}),
      animate.to(this.refs.title.querySelectorAll('svg g g g g g path'), 0.6, {stroke: '#fff'}),
      animate.to(this.refs.video, 2, {scale: 1, ease: ease}),
      animate.staggerTo(staggerEls, 1, {autoAlpha: 1, y: 0, delay: 0.3, ease: ease}, 0.2)
    ])
  };

  animateOutFade = (callback) => {
    const staggerEls = [this.refs.subtitle, this.refs.title, this.refs.description, this.ctaWatch, this.ctaExplore];

    this.setState({shouldShowFooter: false});

    return animate
      .all([
        animate.staggerTo(staggerEls, 0.8, {autoAlpha: 0, scale: 0.9, ease: Expo.easeOut}, 0.1),
        animate.to(this.refs.videoContainer, 1.2, {autoAlpha: 0}),
        animate.to(this.containerEl, 0, {backgroundColor: 'rgba(0,0,0,0)'})
      ])
      .then(() => callback && callback())
  };

  animateOutSwipe = (callback) => {
    const duration = 1.2;
    const ease = Expo.easeOut;
    const delay = 0.8;

    const staggerEls = [this.refs.subtitle, this.refs.title, this.refs.description, this.ctaWatch, this.ctaExplore];
    this.setState({shouldShowFooter: false});

    animate.staggerTo(staggerEls, 0.8, {autoAlpha: 0, scale: 0.9, ease: Expo.easeOut}, 0.1);

    return animate.all([
        animate.to(this.containerEl, duration, {x: '-100%', ease, delay}),
        animate.to(this.refs.pageWrapper, duration, {x: '100%', autoAlpha: 0, ease, delay})
      ])
      .then(() => callback && callback())
  };

  handleTouchStart = () => {
    this.refs.video.play()
  };

  render() {
    const isReturn = !!localStorage.getItem('narrative-video-time');

    return (
      <div
        className={`landing-page ${this.props.className}`}
        onTouchStart={this.handleTouchStart}
      >
        <div ref="pageWrapper" className={`page-wrapper`}>

          <div ref="videoContainer" className={`video-container`}>
            <video
              ref="video"
              preload="auto"
              loop={true}
              muted={true}
              poster={this.state.data.posterUrl}
              src={this.state.data.videoUrl}
            >
            </video>
            <div ref="gradient" className={`gradient`}></div>
          </div>

          <div ref="coverBg" className={`cover-bg`}></div>

          <div ref="contentContainer" className={`content-container`}>
            <div ref="subtitle" className={`subtitle`}>{this.state.data.subtitle}</div>
            <div ref="title" className={`title`} data-bodymovin-target></div>
            <div ref="description" className={`description`}>
              {this.state.data.description}
            </div>

            <div ref="ctaContainer" className={`cta-container ${isReturn ? 'resume' : ''}`}>
              <Link
                ref="ctaExplore"
                className={`cta explore`}
                to={`grid`}
              >
                <RectangularButton
                  style={{width: '100%', height: '100%'}}
                  text={`Main Menu`}
                  color={`#fff`}
                  svgIcon={IconExplore}
                  backgroundColor={`rgba(255,255,255,0)`}
                  hoverBackgroundColor={`rgba(255,255,255,0.2)`}
                />
              </Link>
              <Link
                ref="ctaWatch"
                className={`cta watch`}
                to={`narrative-video`}
              >
                <RectangularButton
                  style={{width: '100%', height: '100%'}}
                  text={`${isReturn? 'Resume Documentary' : 'Watch Documentary'}`}
                  color={`#fff`}
                  svgIcon={IconWatch}
                  backgroundColor={`#f7910b`}
                  hoverBackgroundColor={`#de8209`}
                />
              </Link>
            </div>
          </div>

          <div ref="loaderContainer" className={`loader-container`}>
            <div className={`icon`} dangerouslySetInnerHTML={{ __html: IconLoader }}></div>
            <p>Loading</p>
          </div>

          <TransitionGroup className={`footer-container`}>
            {
              this.state.shouldShowFooter && (
                <Footer
                  className={`landing-footer`}
                  primaryBackgroundColor={`rgba(37, 40, 42, 0.4)`}
                  secondaryBackgroundColor={`rgba(138, 141, 142,0.2)`}
                />
              )
            }
          </TransitionGroup>

        </div>
      </div>
    );
  }
}
