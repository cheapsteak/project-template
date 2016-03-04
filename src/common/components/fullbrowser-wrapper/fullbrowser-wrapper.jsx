import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import TransitionGroup from 'react-addons-transition-group';
import _ from 'lodash';

export default class FullBrowserElement extends React.Component {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: React.PropTypes.object,
  };

  toggleFullBrowser = () => {
    if(this.props.isFullBrowser) {
      this.animateToTarget();
    } else {
      this.animateToFullBrowser();
    }
  };

  animateToFullBrowser = () => {
    const { overlay, bg, original, animateEl } = this.refs;
    const clientRects = original.getClientRects()[0];

    animate.set(animateEl, { position: 'absolute', top: clientRects.top, left: clientRects.left, width: clientRects.width, height: clientRects.height, zIndex: 1000 });
    animate.set(original, { visibility: 'hidden' });
    overlay.classList.remove('hidden');
    animate.fromTo(bg, 0.5, { opacity: 0 }, { opacity: 1 })
    animate
      .to(animateEl, 0.5, { top: 0, left: 0, width: '100%', height: '100%' })
      .then(() => this.context.router.push(this.props.fullBrowserRoute))
  };

  animateToTarget = () => {
    const { overlay, bg, target, original, animateEl } = this.refs;
    const clientRects = target.getClientRects()[0];
    
    animate.set(animateEl, { position: 'absolute', top: 0, left: 0 });
    animate.set(original, { visibility: 'hidden' });
    overlay.classList.remove('hidden');
    animate.fromTo(bg, 0.5, { opacity: 1 }, { opacity: 0 })
    animate
      .to(animateEl, 0.5, { top: clientRects.top, left: clientRects.left, width: clientRects.width, height: clientRects.height })
      .then(() => this.context.router.push(this.props.fullBrowserRoute))
  };

  createElement (refName, style) {
    return React.cloneElement((this.props.children || <div />), { 
      ref: (node) => { 
        if (refName)
          this.refs[refName] = findDOMNode(node)
      },
      key: _.uniqueId(),
      toggleFullBrowser : this.toggleFullBrowser,
      style
    })
  }

  render () {
    const { style, isFullBrowser, OverlayComponent, overlayComponentProps } = this.props;
    const animateToStyle = this.props.children && this.props.children.props.style ? this.props.children.props.style : {};
    let originalStyle = animateToStyle;
    let animateToElement;

    if(isFullBrowser) {
      originalStyle = Object.assign(
        {},
        animateToStyle,
        { 
          top: 0,
          left: 0,
          margin: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: 1000 
        }
      );
      animateToElement = this.createElement('target', Object.assign({}, animateToStyle, { visibility: 'hidden' }));
    }

    return (
      <div className="fullbrowser-wrapper" style={style}>
        <div
          ref="overlay" 
          className="fullbrowser-overlay hidden"
        >
          <div
            ref="bg"
            className="fullbrowser-bg"
          />
          { 
            // Thhe animating element (used for animation only)
            this.createElement('animateEl', Object.assign({}, originalStyle, {margin:0})) 
          }
        </div>
          { 
            // The target to animateTo (only for when isFullBrowser is false)
            animateToElement
          }
          { 
            // The original element (the one that is being interacted with)
            this.createElement('original', originalStyle)
          }
      </div>
    )
  }
}