import React from 'react';
import ScrollMagic from 'scrollmagic';
import { findDOMNode } from 'react-dom';

function ScrollTest(props) {
  return <div className="scroll-test">
    <h1 data-parallax-scroll><div className="debug"></div>scroll test</h1>
    <p data-parallax-scroll>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt</p>
    <p data-parallax-scroll>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt</p>
  </div>;
}

export default class ScrollParallax extends React.Component {
  componentDidMount () {
    console.log(this);
    const el = findDOMNode(this);
    const scrollController = new ScrollMagic.Controller({
      //container: el,
      globalSceneOptions: {},
      loglevel: 2
    });

    const getY = function (progress, min=100, max=0) {
      //const amplitude = max - min;
      //return progress * amplitude - amplitude/2;
      return min + (max - min) * progress;
    };

    const scrollScenes = Array.from(el.querySelectorAll('[data-parallax-scroll]')).map((el, i) => {

      if (i === 10)  {
        el.style.color = 'red';
      }

      TweenMax.set(el, {
        opacity: 0,
        //y: 100
      });
      const scene = new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        triggerElement: el,
        duration: window.innerHeight
      })

      scene.on('enter', (e) => {
        TweenMax.to(el, 0.5, {
          opacity: 1,
          //y: 0
        });
      })
      scene.on('leave', (e) => {
        //console.log('leave');
      })

      const seed = Math.random();
      scene.on('progress', (e) => {
        el.setAttribute('data-debug-y', getY(e.progress));
        TweenMax.to(el, 0.1, {y: seed*seed * getY(e.progress)})
      })

      //scene.addTo(scrollController);
      //scene.addIndicators();
      return scene;
    });
    scrollController.addScene(scrollScenes);
  }

  componentWillUnmount () {

  }

  render () {
    return <div className="scroll-parallax">
      <ScrollTest/>
      <ScrollTest/>
      <ScrollTest/>
      <ScrollTest/>
      <ScrollTest/>
      <ScrollTest/>
    </div>
  }
}
