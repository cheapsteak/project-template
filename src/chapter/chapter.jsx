import React from 'react';
import ParallaxVideoWrapper from 'common/components/parallax-video-wrapper/parallax-video-wrapper.jsx';
import InstructionalVideo from 'common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';
import Panorama from 'common/components/panorama/panorama-redux.jsx';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux.jsx';
import Podcast from 'common/components/podcast/podcast.jsx';
import RectangularButton from 'common/components/rectangular-button/rectangular-button.jsx';
import TransitionGroup from 'react-addons-transition-group';
import unwrapComponent from 'common/utils/unwrap-component.js';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import ScrollMagic from 'scrollmagic';
import IconExplore from 'svgs/icon-explore.svg';
import IconPlay from 'svgs/icon-play.svg';
import chaptersModel from 'common/models/chapters-model';

export default class Chapter extends React.Component {

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

  getTarget = (component, slug) => {
    if (component instanceof InstructionalVideo) {
      return this.refs.instructionalVideo;
    }
    if (component instanceof PhotoEssay) {
      return this.refs.photoEssay;
    }
  };

  render() {
    if (!this.state.data) return <div/>;

    return <section className="chapter-page">
      <div className="main">
        <nav className="nav">
          <Link
            className={`nav-button left`}
            to={`narrative-video`}
          >
            <RectangularButton
              text={`Return to Documentary`}
              color={`#adafaf`}
              svgIcon={IconPlay}
              backgroundColor={`#565d60`}
              hoverBackgroundColor={`#3e4548`}
            />
          </Link>
          <Link
            className={`nav-button right`}
            to={`grid`}
          >
            <RectangularButton
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
          </div>
        </div>

        <div className="page-component">
          <h2 className="component-title">Instructional Video</h2>
          <InstructionalVideo
            className="col-4 margin-auto-horizontal instructional-video-component"
            id="instructionalVideo"
            ref='instructionalVideo'
            slug="math-1"
            poster={`${ASSET_PATH}/chapter-video-poster.jpg`}
            noZoom={true}
          />
        </div>

        {
          // panorama component
          this.state.data.panoramas.length &&
          (
            <div className="page-component">
              <h2 className="component-title">360 Virtual Tour</h2>
              <div className="panorama-container">
                <Panorama
                  slug={this.state.data.panoramas[0]}
                  hasMenu={this.state.data.panoramas.length > 1}
                />
              </div>
            </div>
          )
        }

        <div className="page-component">
          <h2 className="component-title">
            Photo Essay
          </h2>
          <PhotoEssay
            ref="photoEssay"
            slug="math-1"
          />
        </div>
        <div className="page-component">
          <h2 className="component-title">Articles</h2>
          <article>article 1</article>
          <article>article 2</article>
        </div>

        <div className="page-component">
          <Podcast src="http://successacademy.jam3.net/temp-assets/planet-money-664.mp4"></Podcast>
        </div>
        <TransitionGroup
          component="div"
          className="route-content-wrapper"

        >
          {
            React.cloneElement(this.props.children || <div />, {
              key: this.state.slug,
              getTarget: this.getTarget
            })
          }
        </TransitionGroup>
        <footer>footer</footer>
      </div>
    </section>;
  }
}
