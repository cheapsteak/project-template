import React from 'react';
import ParallaxVideoWrapper from 'common/components/parallax-video-wrapper/parallax-video-wrapper.jsx';
import InstructionalVideo from 'common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';
import Panorama from 'common/components/panorama/panorama-redux.jsx';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux.jsx';
import TransitionGroup from 'react-addons-transition-group';
import unwrapComponent from 'common/utils/unwrap-component.js';
import { findDOMNode } from 'react-dom';
import ScrollMagic from 'scrollmagic';

export default class Chapter extends React.Component {

  getTarget = (component, slug) => {
    if (component instanceof InstructionalVideo) {
      return this.refs.instructionalVideo;
    }
    if (component instanceof PhotoEssay) {
      return this.refs.photoEssay;
    }
  };

  componentDidMount () {
    const el = findDOMNode(this);
    const scrollController = new ScrollMagic.Controller({
      //container: el,
      globalSceneOptions: {},
      loglevel: 2
    });

    const getY = function (progress, min=50, max=-50) {
      //const amplitude = max - min;
      //return progress * amplitude - amplitude/2;
      return min + (max - min) * progress;
    };

    const getOpacity = function (progress) {
      return Math.min(3 * progress, 1);
    };

    const parallaxTargetSelectors = [
      '.photo-essay .image-wrapper',
      '.panorama-container .parallax-target'
    ];

    const scrollScenes = Array.from(el.querySelectorAll(parallaxTargetSelectors.join(', '))).map((el, i) => {

      if (i === 10)  {
        el.style.color = 'red';
      }

      TweenMax.set(el, {
        opacity: 0,
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

      // have things move at different speeds
      scene.on('progress', (e) => {
        el.setAttribute('data-progress', e.progress);
        // el.setAttribute('data-debug-y', getY(e.progress));
        el.setAttribute('data-debug-opacity', getOpacity(e.progress));
        TweenMax.to(el, 0.1, {
          y: getY(e.progress),
          opacity: getOpacity(e.progress),
        })
      })

      //scene.addTo(scrollController);
      //scene.addIndicators();
      return scene;
    });
    scrollController.addScene(scrollScenes);
  }

  render () {
    return <section className="chapter-page">
      <div className="main">
        <nav className="nav">
          <span className="nav-button">Return to Tour</span>
          <span className="nav-button">Explore</span>
        </nav>
        <div className="page-component chapter-header">
          {
            // <ParallaxVideoWrapper
            //   bgVideoPath={'../videos/bg-1080.mp4'}
            //   fgVideoPath={'../videos/fg-1080.mp4'}
            // />
          }
        </div>

        <div className="page-component">
          <h2 className="component-title">Instructional Video</h2>
          <InstructionalVideo
            className="col-4 margin-auto-horizontal instructional-video-component"
            id="instructionalVideo"
            ref='instructionalVideo'
            slug="math-1"
            shouldHideInTheBack={true}
          />
        </div>

        <div className="page-component">
          <h2 className="component-title">360 Virtual Tour</h2>
          <div className="panorama-container">
            <Panorama
              slug={`math`}
              hasMenu={true}
            />
          </div>
        </div>
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
          <h2>Articles</h2>
          <article>article 1</article>
          <article>article 2</article>
        </div>

        <div className="podcast">podcast</div>
        <TransitionGroup
          component="div"
          className="route-content-wrapper"

        >
          { React.cloneElement(this.props.children || <div />, {key: this.props.params.slug, getTarget: this.getTarget}) }
        </TransitionGroup>
        <footer>footer</footer>
      </div>
    </section>;
  }
}
