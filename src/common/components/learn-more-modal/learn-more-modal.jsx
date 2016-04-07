import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import CloseSvg from 'svgs/icon-close.svg';
import config from '../../../../config.js';
import RectangularButton from 'common/components/rectangular-button/rectangular-button.jsx';

export default class LearnMoreModal extends React.Component {

  componentDidMount() {
    animate.set(this.refs.modal, {opacity: 0});
    animate.set(this.refs.content, {opacity: 0});
    animate.set(this.closeButton, {y: '-140%'});
  }

  componentWillAppear(callback) {
    this.animateIn()
      .then(callback)
  }

  componentWillEnter(callback) {
    this.animateIn()
      .then(callback)
  }

  componentWillLeave(callback) {
    this.animateOut()
      .then(callback);
  }

  animateIn = () => {
    return Promise.all([
      animate.to(this.refs.modal, 0.3, {opacity: 1}),
      animate.to(this.refs.content, 0.3, {delay: 0.3, y: 0, opacity: 1}),
      animate.to(this.closeButton, 0.5, {y: '0%', ease: Expo.easeOut, delay: 0.5}),
    ])
  };

  animateOut = () => {
    return Promise.all([
      animate.to(this.refs.modal, 0.3, {delay: 0.3, opacity: 0}),
      animate.to(this.refs.content, 0.3, {opacity: 0}),
      animate.to(this.closeButton, 0.5, {y: '-140%', ease: Expo.easeOut}),
    ])
  };

  render() {
    const {className, style, paragraphs} = this.props;
    const items = paragraphs || [];

    return (
      <div
        ref="modal"
        className={`learn-more-modal ${className || ''}`}
        style={style}
      >
        <img className="modal-background" src={`${config.ASSET_PATH}/learn-more-background.jpg`}/>
        <RectangularButton
          ref={ node => this.closeButton = findDOMNode(node) }
          className="close-button"
          text={`Close`}
          color={`#fff`}
          svgIcon={CloseSvg}
          backgroundColor={`#f7910b`}
          hoverBackgroundColor={`#de8209`}
          onClick={this.props.close}
        />
        <div
          ref="content"
          className="modal-content"
        >
          <h1>About</h1>
          <div className="text-wrapper">
            {
              items.map((paragraph, i) => {
                return (
                  <p
                    key={i}
                  >
                    {paragraph}
                  </p>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
