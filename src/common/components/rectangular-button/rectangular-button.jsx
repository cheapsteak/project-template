import React from 'react';
import animate from 'gsap-promise';
import _ from 'lodash';

export default class RectangularButton extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    hoverBackgroundColor: React.PropTypes.string,
    svgIcon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func
  };

  componentDidMount() {
    animate.set(this.refs.text, { color: this.props.color || 'transparent' });
    this.props.backgroundColor && animate.set(this.refs.button, { backgroundColor: this.props.backgroundColor});
  }

  handleClick = () => {
    this.props.onClick && this.props.onClick();
  };

  handleMouseEnter = () => {
    this.animateOnMouseEnter();
    this.props.onMouseEnter && this.props.onMouseEnter();
  };

  handleMouseLeave = () => {
    this.animateOnMouseLeave();
    this.props.onMouseLeave && this.props.onMouseLeave();
  };

  animateOnMouseEnter = () => {
    return Promise.all([
      animate.to(this.refs.text, 0.3, { y: 20, opacity: 0 })
        .then(() => {
          animate.set(this.refs.text, { y: -20 });
          animate.to(this.refs.text, 0.3, { y: 0, opacity: 1 });
        }),
      this.props.hoverBackgroundColor && animate.to(this.refs.button, 0.3, { backgroundColor: this.props.hoverBackgroundColor }),
      this.refs.icon && animate.to(this.refs.icon, 0.3, { delay: 0.1, y: 20, opacity: 0})
                          .then(() => {
                            animate.set(this.refs.icon, { y: -20 });
                            animate.to(this.refs.icon, 0.15, { y: 0, opacity: 1 });
                          })

    ]);
  };

  animateOnMouseLeave = () => {
    return Promise.all([
      animate.to(this.refs.text, 0.3, { y: -20, opacity: 0 })
        .then(() => {
          animate.set(this.refs.text, { y: 20 });
          animate.to(this.refs.text, 0.3, { y: 0, opacity: 1 });
        }),
      animate.to(this.refs.button, 0.3, { backgroundColor: this.props.backgroundColor || 'rgba(0,0,0,0)' }),
      this.refs.icon && animate.to(this.refs.icon, 0.3, { delay: 0.1, y: -20, opacity: 0})
                          .then(() => {
                            animate.set(this.refs.icon, { y: 20 });
                            animate.to(this.refs.icon, 0.3, { y: 0, opacity: 1 });
                          })
    ]);
  };

  stopAnimations = () => {
    TweenMax.killTweensOf(_.values(this.refs));
  };

  render () {
    const { className, style } = this.props;
        
    return (
      <div
        ref="button"
        className={`rectangular-button ${className || ''}`}
        style={style}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...(_.omit(this.props, Object.keys(RectangularButton.propTypes)))}
      >
        {
          this.props.svgIcon
          ? <span
              ref="icon"
              dangerouslySetInnerHTML={{__html:this.props.svgIcon}}>
            </span>
          : undefined
        }
        <span
          ref="text"
          className="button-text"
        >
          {this.props.text}
        </span>
      </div>
    )
  }
}