import React from 'react';
import InstructionalVideo from 'common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';
import Panorama from 'common/components/panorama/panorama-redux.jsx';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux.jsx';
import Podcast from 'common/components/podcast/podcast.jsx';
import RectangularButton from 'common/components/rectangular-button/rectangular-button.jsx';
import IconLeftArrow from 'svgs/icon-left-arrow.svg';
import Article from 'common/components/article/article';
import Footer from 'common/components/footer/footer';
import TransitionGroup from 'react-addons-transition-group';
import unwrapComponent from 'common/utils/unwrap-component.js';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import ScrollMagic from 'scrollmagic';
import IconExplore from 'svgs/icon-explore.svg';
import IconPlay from 'svgs/icon-play.svg';
import chaptersModel from 'common/models/chapters-model';

export default class Chapter extends React.Component {

  cleanupOperations = [];

  componentWillMount() {
    const slug = this.props.params.chapter_slug;
    const data = chaptersModel.get(slug);
    this.setState({data});
  }

  componentDidMount() {
    const el = findDOMNode(this);
    const scrollController = new ScrollMagic.Controller({
      //container: el,
      globalSceneOptions: {},
      loglevel: 2
    });

    const headerScrollController = new ScrollMagic.Controller({
      container: el.querySelector('.main'),
      globalSceneOptions: {},
      loglevel: 2
    });

    this.cleanupOperations.push(() => {
      scrollController.destroy();
      headerScrollController.destroy();
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
      '.photo-essay .image-wrapper',
      '.panorama-container .parallax-target',
      '.podcast .text-container',
    ];

    const headerScrollScene = new ScrollMagic.Scene({
      triggerElement: el,
      duration: el.querySelector('.main').getBoundingClientRect().height,
      triggerHook: 0
    })
      .on('enter', e => {
        TweenMax.set(this.refs.nav, {
          position: 'absolute',
          zIndex: 1000,
          left: '0',
          width: '100%'
        });
      })
      .on('leave', e => {
        const left = this.refs.nav.getClientRects()[0].left;
        TweenMax.set(this.refs.nav, {
          position: 'fixed',
          left: left,
          width: `calc(100% - ${left}px)`
        });
      })

    headerScrollController.addScene(headerScrollScene);

    const scrollScenes = Array.from(el.querySelectorAll(parallaxTargetSelectors.join(', '))).map((el, i) => {

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
        duration: window.innerHeight,
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
        el.setAttribute('data-progress', e.progress);
        el.setAttribute('data-debug-opacity', getOpacity(e.progress));
        TweenMax.to(el, 0.1, {
          y: getY(e.progress),
          //opacity: getOpacity(e.progress),
        })
      })

      //scene.addIndicators();
      return scene;
    });
    scrollController.addScene(scrollScenes);
  }

  componentWillUnmount() {
    this.cleanupOperations.forEach(fn => fn());
    this.cleanupOperations = [];
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

  render() {
    if (!this.state.data) return <div/>;

    return <section ref="chapter" className="chapter-page">
      <div className="main" ref="main">
        <nav className="nav" ref="nav">
          <Link
            className={`nav-button left`}
            to={`/narrative-video`}
          >
            <RectangularButton
              style={{height: '100%'}}
              text={`Return to Documentary`}
              color={`#adafaf`}
              svgIcon={IconLeftArrow}
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
              text={`Explore Chapters`}
              color={`#adafaf`}
              svgIcon={IconExplore}
              backgroundColor={`#565d60`}
              hoverBackgroundColor={`#3e4548`}
            />
          </Link>
        </nav>
        <div className="page-component chapter-header">
          <video autoPlay={true} loop={true} src={this.state.data.hero.bgVideoUrl}></video>
          <div className={`hero-content`}>
            <div className={`hero-cta`}>{this.state.data.hero.cta}</div>
            <div className={`hero-title`}>{this.state.data.title}</div>
            <div className={`hero-description`}>{this.state.data.hero.description}</div>
            <Link
              className={`hero-button`}
              to={`${this.state.data.routes.narrativeVideo}`}
              onMouseEnter={() => audio.play('button-rollover')}
              onClick={() => audio.play('button-click')}
            >
              <div className={`thumb`} style={{backgroundImage: `url('${this.state.data.hero.thumbUrl}')`}}></div>
              <div className={`button`} style={{ width: 'auto', padding: '0 20px' }}>
                <div className={`icon`} dangerouslySetInnerHTML={{__html: IconPlay}}></div>
                <p>{ `Watch ${this.state.data.scholar} Chapter` }</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="page-component">
          <h2 className="component-title">Instructional Video</h2>
          <InstructionalVideo
            className="margin-auto-horizontal instructional-video-component"
            id="instructionalVideo"
            ref='instructionalVideo'
            slug="math-1"
            poster={`${ASSET_PATH}/chapter-video-poster.jpg`}
            noZoom={true}
          />
        </div>
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
                Photo Essay
              </h2>
              <PhotoEssay
                ref="photoEssay"
                slug={this.state.data.photoEssays[0]}
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
                        scrollTopPadding={60}
                        title={article.title}
                        bannerImage={article.image}
                        aboveFoldSelector={article.aboveFoldSelector}
                        getTarget={this.getContainer}
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
          />
        </footer>
      </div>
    </section>;
  }
}
