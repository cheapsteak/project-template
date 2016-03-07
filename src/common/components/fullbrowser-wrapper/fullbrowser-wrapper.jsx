import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';

export default class FullBrowserWrapper extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentWillAppear(callback) {
    this.animateToFullBrowser(callback)
  }

  componentWillEnter (callback) {
    this.animateToFullBrowser(callback)
  }

  componentWillLeave (callback) {
    this.animateToTarget(callback)
  }

  toggleFullBrowser = (callback) => {
    console.log(this.props.isFullBrowser);
        
    if(this.props.isFullBrowser) {
      this.animateToTarget(callback);
    } else {
      this.animateToFullBrowser(callback);
    }
  };

  animateToFullBrowser = (callback) => {
    const child = findDOMNode(this.refs.child);

    if(this.props.target) {
      const clientRects = findDOMNode(this.props.target).getClientRects()[0];

      animate.set(child, { top: clientRects.top, left: clientRects.left, width: clientRects.width, height: clientRects.height })

      return animate
        .to(child, 0.5, { top: 0, left: 0, width: '100%', height: '100%' })
        .then(callback)
    } else {
      return animate.set(child, { top: 0, left: 0, width: '100%', height: '100%' }).then(callback);
    }
  };

  animateToTarget = (callback) => {
    const child = findDOMNode(this.refs.child);
    const clientRects = findDOMNode(this.props.target).getClientRects()[0];

    return animate
      .to(child, 0.5, { top: clientRects.top, left: clientRects.left, width: clientRects.width, height: clientRects.height })
      .then(callback)
  };

  render () {
    const ChildComponent = this.props.route.childComponent;
    const childProps = this.props.route.childComponentProps;

    return (
      <div className="fullbrowser-wrapper">
        <ChildComponent
          ref="child"
          {...childProps}
          isFullBrowser={true}
          modelSlug={this.props.params.slug} />
      </div>
    )
  }
}