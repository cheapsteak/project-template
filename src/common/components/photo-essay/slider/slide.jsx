import React from 'react';

const duration = 0.5;
let zIndexCounter = 1000;
const ease = global.ViniEaseOut;

export default class Slide extends React.Component {

  static PropTypes = {
    className: React.PropTypes.string,
    isNext: React.PropTypes.bool,
    isPrevious: React.PropTypes.bool,
    isCurrent: React.PropTypes.bool,
    shouldShowPreview: React.PropTypes.bool,
    imageSrc: React.PropTypes.string.isRequired,
  };

  state = {
    isCurrent: false,
    isNext: false,
    isPrevious: false,
    shouldShowPreview: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isCurrent && nextProps.isCurrent) {
      const { isPrevious } = this.props;
      setTimeout(() => this.animateIn({rightToLeft: isPrevious}));
    } else if (this.props.shouldShowPreview && !nextProps.shouldShowPreview) {
      setTimeout(() => this.hidePreview({rightToLeft: nextProps.isPrevious}));
    }
    if (this.props.isCurrent && !nextProps.isCurrent) {
      setTimeout(this.animateOut);
    }
    if (!this.props.shouldShowPreview && nextProps.shouldShowPreview) {
      setTimeout(() => this.showPreview({rightToLeft: nextProps.isPrevious}));
    }
  };

  animateIn = ({rightToLeft = false}) => {
    const el = findDOMNode(this);
    animate.set(el, {zIndex: ++zIndexCounter });
    const directionFactor = rightToLeft ? -1 : 1;
    return Promise.all([
      animate.fromTo(this.refs.slideMask, duration, {xPercent: -100 * directionFactor}, {xPercent: 0, ease}),
      animate.fromTo(this.refs.imageWrapper, duration, {xPercent: 100 * directionFactor}, {xPercent: 0, ease}),
    ]);
  }

  showPreview = ({rightToLeft = false}) => {
    const el = findDOMNode(this);
    animate.set(el, {zIndex: zIndexCounter + 2 });
    const directionFactor = rightToLeft ? -1 : 1;

    return Promise.all([
      animate.fromTo(this.refs.slideMask, duration/2, {xPercent: -100 * directionFactor}, {xPercent: -90 * directionFactor, ease}),
      animate.fromTo(this.refs.imageWrapper, duration/2, {xPercent: 100 * directionFactor}, {xPercent: 90 * directionFactor, ease}),
    ]);
  }

  hidePreview = ({rightToLeft = false}) => {
    const el = findDOMNode(this);
    const directionFactor = rightToLeft ? -1 : 1;

    return Promise.all([
      animate.to(this.refs.slideMask, duration/2, {xPercent: -100 * directionFactor, ease}),
      animate.to(this.refs.imageWrapper, duration/2, {xPercent: 100 * directionFactor, ease}),
    ]).then(() => {
      return animate.set(el, {zIndex: '' });
    });
  }

  render () {
    const classNamesDict = {
      'slide-mask': true,
      'is-current': this.props.isCurrent,
      'is-next': this.props.isNext,
      'is-previous': this.props.isPrevious,
      'is-preview': this.props.shouldShowPreview,
    };
    const classNames = _(classNamesDict).pickBy().keys().value().join(' ');

    return (
      <div ref="slideMask" className={classNames}>
        <div ref="imageWrapper" className={ `image-wrapper`} >
          <img src={this.props.imageSrc}/>
        </div>
      </div>
    );
  }
};