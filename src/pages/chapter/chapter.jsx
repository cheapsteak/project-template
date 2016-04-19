import React from 'react';
import InstructionalVideo from '../../common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';
import Panorama from '../../common/components/panorama/panorama-redux.jsx';
import PhotoEssay from '../../common/components/photo-essay/photo-essay-redux.jsx';
import Podcast from '../../../node_modules/common/components/podcast/podcast.jsx';
import RectangularButton from '../../../node_modules/common/components/rectangular-button/rectangular-button.jsx';
import IconLeftArrow from '../../../node_modules/svgs/icon-left-arrow.svg';
import IconScroll from '../../assets/svgs/icon-scroll.svg';
import Article from '../../../node_modules/common/components/article/article';
import Footer from '../../../node_modules/common/components/footer/footer';
import TransitionGroup from 'react-addons-transition-group';
import unwrapComponent from 'common/utils/unwrap-component.js';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import ScrollMagic from 'scrollmagic';
import IconExplore from 'svgs/icon-explore.svg';
import IconPlay from 'svgs/icon-play.svg';
import IconPlayOutline from 'svgs/icon-playoutline.svg';
import chaptersModel from '../../common/models/chapters-model';
import BgCover from 'background-cover';
import detect from 'common/utils/detect';
import scrollbarSize from '../../common/utils/scrollbar-size';
import animate from 'gsap-promise';
import clamp from 'clamp';

export default class Chapter extends React.Component {

  state = {
    isReady: false,
    isMobile: detect.isMobile
  };

  cleanupOperations = [];

  componentWillMount() {
    const slug = this.props.params.chapter_slug;
    const data = chaptersModel.get(slug);
    this.setState({data});
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.setupParallax();
  }

  componentDidUpdate () {
    this.setupParallax();
  }

  componentWillAppear(callback) {
    this.refs.heroVideo.play();
    callback();
  }

  componentWillEnter(callback) {
    // timeout is needed because we want to start playing video only after previous page animateOut is done
    setTimeout(() => {
      this.refs.heroVideo.play();
      callback();
    }, 1500);
  }

  componentWillLeave(callback) {
    this.refs.heroVideo.pause();
    animate.set(this.containerEl, {zIndex: 999999});
    const path = location.pathname.replace(CONFIG.basePath + '/', '');
    (path === 'grid') ? this.animateOutFade(callback) : this.animateOutSwipe(callback);
  }

  componentWillUnmount() {
    this.cleanup();
    window.removeEventListener('resize', this.handleResize);
  };

  animateOutSwipe = (callback) => {
    const duration = 1.2;
    const ease = Expo.easeOut;
    const delay = 0.8;

    animate.staggerTo(document.querySelectorAll('.chapter-page .page-component'), 1, {
      autoAlpha: 0,
      scale: 0.9,
      ease
    }, 0.1);
    animate.to(this.refs.main, 1.2, {backgroundColor: '#000', ease});
    animate.to(this.refs.nav, 0.4, {y: '-100%', ease});

    return animate.all([
        animate.to(this.containerEl, duration, {x: '-100%', ease, delay}),
        animate.to(this.containerEl, duration, {autoAlpha: 0.6, delay}),
        animate.to(this.refs.pageWrapper, duration, {x: '100%', ease, delay}),
      ])
      .then(() => callback && callback())
  };

  animateOutFade = (callback) => {
    const duration = 1.2;
    const ease = Expo.easeOut;
    const delay = 0.8;

    animate.staggerTo(document.querySelectorAll('.chapter-page .page-component'), 1, {
      autoAlpha: 0,
      scale: 0.9,
      ease
    }, 0.1);

    animate.to(this.refs.nav, 0.4, {y: '-100%', ease});
    animate.to(this.refs.main, 2, {backgroundColor: '#000', ease});

    return animate.all([
        animate.to(this.containerEl, duration, {autoAlpha: 0, ease, delay})
      ])
      .then(() => callback && callback())
  };

  getTarget = (component, slug) => {
    if (component instanceof InstructionalVideo) {

      return this.refs.instructionalVideo;
    }
    if (component instanceof PhotoEssay) {
      return this.refs.photoEssay;
    }
  };

  getContainer = () => {
    return this.refs.chapter;
  };

  setupParallax = () => {
    this.cleanup();

    const el = findDOMNode(this);
    const scrollController = new ScrollMagic.Controller({
      //container: el,
      globalSceneOptions: {},
      loglevel: 2
    });

    this.cleanupOperations.push(() => {
      scrollController.destroy();
    });

    const getY = function (progress, min = 50, max = -50) {
      //const amplitude = max - min;
      //return progress * amplitude - amplitude/2;
      return min + (max - min) * progress;
    };

    const getOpacity = function (progress) {
      return Math.min(3 * progress, 1);
    };

    const parallaxTargetSelectors = [
      '.photo-essay .parallax-target',
      '.panorama-container .parallax-target',
      '.podcast .text-container',
      '.chapter-video-poster img'
    ];

    const scrollScenes = Array
      .from(el.querySelectorAll(parallaxTargetSelectors.join(', ')))
      .map((el, i) => {

      if (i === 10) {
        el.style.color = 'red';
      }

      TweenMax.set(el, {
        //opacity: 0,
        // y: 100
      });

      const scene = new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        triggerElement: el,
        duration: window.innerHeight + el.clientHeight,
      })

      scene.on('enter', (e) => {
        // TweenMax.to(el, 1, {
        //   opacity: 1,
        //   y: 0
        // });
      })
      scene.on('leave', (e) => {
        //console.log('leave');
      })

      scene.on('progress', (e) => {
        TweenMax.killTweensOf(el);
        const min = clamp(100/1920 * window.innerWidth, 50, 100);
        const max = - min;
        TweenMax.to(el, 0.3, {
          y: getY(e.progress, min, max),
          ease: ViniEaseOut,
        })
      })

      //scene.addIndicators();
      return scene;
    });
    scrollController.addScene(scrollScenes);

    window.addEventListener('resize', this.handleResize);
  }

  cleanup = () => {
    try {
      this.cleanupOperations.forEach(fn => fn());
      this.cleanupOperations = [];
    } catch (e) {
      console.error(e);
    }
  };

  getScrollContainer = () => {
    return this.refs.main;
  };

  handleResize = () => {
    const scrollbarWidth = scrollbarSize.get();
    animate.set(this.refs.nav, {width: window.innerWidth - scrollbarWidth});
    BgCover.BackgroundCover(this.refs.heroVideo, this.refs.heroVideoContainer);
  };

  handleMetadataLoaded = () => {
    this.handleResize();
    this.setState({isReady: true});
  };

  render() {
    if (!this.state.data) return <div/>;

    const isReturn = !!localStorage.getItem('narrative-video-time');

    return (
      <section
        ref="chapter"
        className={`chapter-page`}
        style={{visibility: this.state.isReady ? 'visible' : 'hidden'}}
      >
      <div ref="pageWrapper" className={`page-wrapper`}>

      <div ref="main" className="main">

        <nav ref="nav" className="nav">
          <Link
            className={`nav-button left`}
            to={`/narrative-video`}
          >
            <RectangularButton
              style={{height: '100%'}}
              text={` ${isReturn ? 'Return to Documentary' : 'Watch Documentary'}`}
              color={`#adafaf`}
              svgIcon={isReturn ? IconLeftArrow : IconPlayOutline}
              backgroundColor={`#565d60`}
              hoverBackgroundColor={`#3e4548`}
            />
          </Link>
          <Link
            className={`nav-button right`}
            to={`grid`}
          >
            <RectangularButton
              style={{height: '100%'}}
              text={`Main Menu`}
              color={`#adafaf`}
              svgIcon={IconExplore}
              backgroundColor={`#565d60`}
              hoverBackgroundColor={`#3e4548`}
            />
          </Link>
        </nav>

        <div ref="heroVideoContainer" className="page-component chapter-header">
          <video
            ref="heroVideo"
            autoPlay={false}
            loop={true}
            src={this.state.data.hero.bgVideoUrl}
            poster={this.state.data.hero.poster}
            onLoadedMetadata={this.handleMetadataLoaded}
          ></video>
          <div className={`hero-content`}>
            <div className={`hero-title`}>{this.state.data.title}</div>
            <div className={`hero-description`}>{this.state.data.hero.description}</div>
            <Link
              className={`hero-button`}
              to={`${this.state.data.routes.narrativeVideo}`}
              onMouseEnter={() => audio.play('button-rollover')}
              onClick={() => audio.play('button-click')}
            >
              <div className={`thumb-container`}>
                <div className={`thumb`} style={{backgroundImage: `url('${this.state.data.hero.thumbUrl}')`}}></div>
                <div className={`icon`} dangerouslySetInnerHTML={{__html: IconPlay}}></div>
              </div>
              <div className={`button`} style={{ width: 'auto', padding: '0 20px' }}>
                <p>{ `Meet ${this.state.data.scholar}` }</p>
              </div>
            </Link>
          </div>

          <div className={`arrow-cta`} dangerouslySetInnerHTML={{__html: IconScroll}}></div>
        </div>

        {
          /***   Instructional Video  ***/

          this.state.data.instructionalVideos.length
          ? this.state.data.instructionalVideos.map(video => {
              return (
                <div className="page-component" key={video.slug}>
                  <h2 className="component-title">{ video.title }</h2>
                  <InstructionalVideo
                    className="margin-auto-horizontal instructional-video-component"
                    id="instructionalVideo"
                    ref='instructionalVideo'
                    slug={video.slug}
                    noZoom={true}
                  />
                </div>
              )
            })
          : null
        }
        {
          /***   Panorama  ***/

          this.state.data.panoramas.length ?
            (
              <div className="page-component">
                <h2 className="component-title">360° Photos</h2>
                <div className="panorama-container">
                  <Panorama
                    slug={this.state.data.panoramas[0]}
                    hasMenu={this.state.data.panoramas.length > 1}
                  />
                </div>
              </div>
            ) : null
        }
        {
          /***   Photo Essay  ***/

          this.state.data.photoEssays.length
            ? <div className="page-component">
            <h2 className="component-title">
              {this.state.data.photoEssays[0].title}
            </h2>
            <PhotoEssay
              ref="photoEssay"
              slug={this.state.data.photoEssays[0].slug}
            />
          </div>
            : null
        }
        {
          /***   Articles   ***/

          this.state.data.articles.length
            ? <div className="page-component">
            <h2 className="component-title">
              Articles
            </h2>
            {
              this.state.data.articles
                ? this.state.data.articles.map((article, i) => {
                return (
                  <div
                    key={i}
                    className={`article-row ${article.image ? 'has-image' : ''}`}
                  >
                    <Article
                      className="col-3"
                      scrollTopPadding={80}
                      title={article.title}
                      bannerImage={article.image}
                      aboveFoldSelector={article.aboveFoldSelector}
                      getTarget={this.getScrollContainer}
                    >
                      { article.content }
                    </Article>
                  </div>
                )
              }) : null
            }
          </div>
            : null
        }
        {
          /***   Podcast   ***/

          this.state.data.slug === 'welcome'
            ? <div className="page-component">
                <h2 className="component-title">
                  A Message From Eva
                </h2>
                <Podcast src="http://successacademy.jam3.net/temp-assets/planet-money-664.mp4"></Podcast>
              </div>
            : null
        }
        <TransitionGroup
          component="div"
          className="route-content-wrapper"
        >
          {
            React.cloneElement(this.props.children || <div />, {
              // This is the slug for the full browser component, not the chapter
              key: this.props.params.slug,
              getTarget: this.getTarget
            })
          }
        </TransitionGroup>
        <footer>
          <Footer
            primaryBackgroundColor={`#3e4548`}
            secondaryBackgroundColor={`#52585b`}
            analyticsLabel={`Chapter Page ${this.state.data.title}`}
          />
        </footer>
      </div>

      </div>
    </section>
    );
  }
}
