import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';

function unwrapComponent(component) {
  return component.refs.wrappedInstance 
    ? unwrapComponent(component.refs.wrappedInstance)
    : component;
}

export default class FullBrowserWrapper extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentWillAppear = async (callback) => {
    await this.componentWillEnterFullBrowser();
    callback();
  };

  componentWillEnter = async (callback) => {
    await this.componentWillEnterFullBrowser();
    callback();
  };

  componentWillEnterFullBrowser = async () => {
    const component = unwrapComponent(this.refs.child);
    
    if(component.componentWillEnterFullBrowser) {
      await component.componentWillEnterFullBrowser()
    }

    return this.animateToFullBrowser();
  };

  componentWillLeave = async (callback) => {
    await this.componentWillLeaveFullBrowser();
    callback()
  }

  componentWillLeaveFullBrowser = async () => {
    const component = unwrapComponent(this.refs.child);

    await this.animateToTarget();
    
    if(component.componentWillLeaveFullBrowser) {
       await component.componentWillLeaveFullBrowser();
    }

    return Promise.resolve();
  };

  animateToFullBrowser = () => {
    const el = findDOMNode(this);
    const child = findDOMNode(this.refs.child);
    const target = this.props.target && findDOMNode(this.props.target);
    
    if(target) {
      const clientRects = target.getClientRects()[0];

      animate.set(child, { top: clientRects.top, left: clientRects.left, width: clientRects.width, height: clientRects.height })
      animate.set(target, { opacity: 0 });

      return animate.to(child, 0.5, { top: 0, left: 0, width: '100%', height: '100%' });
    } else {
      return animate.set(child, { top: 0, left: 0, width: '100%', height: '100%' });
    }
  };

  animateToTarget = (callback) => {
    const child = findDOMNode(this.refs.child);
    const target = findDOMNode(this.props.target);
    const clientRects = target.getClientRects()[0];


    return animate
      .to(child, 0.5, { top: clientRects.top, left: clientRects.left, width: clientRects.width, height: clientRects.height })
      .then(() => animate.set(target, { opacity: 1 }))
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