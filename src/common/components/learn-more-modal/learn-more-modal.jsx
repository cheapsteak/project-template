import React from 'react';
import animate from 'gsap-promise';
import CloseSvg from 'svgs/icon-close.svg';
import config from '../../../../config.js';


export default class LearnMoreModal extends React.Component {

  componentDidMount() {
    animate.set(this.refs.modal, { opacity: 0 });
    animate.set(this.refs.content, { y: 200, opacity: 0 });
    animate.set(this.refs.closeButton, { y: -this.refs.closeButton.offsetHeight });
    animate.set(this.refs.closeButtonContent, { opacity: 0, y: 10 });
  }

  componentWillAppear (callback) {
    this.animateIn()
      .then(callback)
  }

  componentWillEnter (callback) {
    console.log('willenter')
    this.animateIn()
      .then(callback)
  }

  componentWillLeave (callback) {
    this.animateOut()
      .then(callback);
  }

  animateIn = () => {
    return Promise.all([
      animate.to(this.refs.modal, 0.5, { opacity: 1 }),
      animate.to(this.refs.content, 0.5, { delay: 0.3,  y: 0, opacity: 1 }),
      animate.to(this.refs.closeButton, 0.3, { y: 0 }),
      animate.to(this.refs.closeButtonContent, 0.3, { delay: 0.3, opacity: 1, y: 0 })
    ])
  }

  animateOut = () => {
    return Promise.all([
      animate.to(this.refs.modal, 0.5, { delay: 0.3, opacity: 0 }),
      animate.to(this.refs.content, 0.5, { y: 200, opacity: 0 }),
      animate.to(this.refs.closeButton, 0.5, { y: -this.refs.closeButton.offsetHeight }),
      animate.to(this.refs.closeButtonContent, 0.5, { opacity: 0, y: 20 })
    ])
  }

  render () {
    const { className, style, paragraphs } = this.props;
    const items = paragraphs || [];

    return (
      <div
        ref="modal"
        className={`learn-more-modal ${className || ''}`}
        style={style}
      >
        <img className="modal-background" src={`${config.ASSET_PATH}/learn-more-background.jpg`} />
        <button
          ref="closeButton"
          className="close-button"
          onClick={this.props.close}
        >
          <div className="close-button-content" ref="closeButtonContent">
            <span dangerouslySetInnerHTML={{ __html: CloseSvg }}></span>
            <div>Close</div>
          </div>
        </button>
        <div
          ref="content"
          className="modal-content"
        >
          <h1>Learn More</h1>
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
