import React from 'react';
import { findDOMNode } from 'react-dom';
import PillButton from 'common/components/pill-button/pill-button';
import animate from 'gsap-promise';

export default class Article extends React.Component {

  preview = true;

  getDistanceFromTop = () => {
    return this.refs.article.offsetTop - 30;
  };

  getAvailableScrollDistance = () => {
    const container = this.props.getTarget();
    return container.scrollHeight - container.offsetHeight;
  };

  handleClick = async (e) => {
    const clientRect = this.refs.article.getBoundingClientRect();
    const container = this.props.getTarget();
    const scrollTo = Math.min(this.getDistanceFromTop(), this.getAvailableScrollDistance());

    if(this.preview) {
      if(scrollTo === this.getDistanceFromTop()) {
        await animate.to(container, 0.3, { scrollTop: scrollTo });
        await this.expand();
      } else {
        await this.expand();
        await animate.to(container, 0.3, { scrollTop: Math.min(this.getDistanceFromTop(), this.getAvailableScrollDistance()) });
      }
    } else {
      this.collapse();
    }

    this.preview = !this.preview;
  };

  expand = () => {
    const clientRect = this.refs.text.getBoundingClientRect();
    return animate.to(this.refs.textWrapper, 0.3, { height: clientRect.height })
  };

  collapse = () => {
   return animate.to(this.refs.textWrapper, 0.3, { height: 200 })
  };

  render () {
    const { className, style } = this.props;
    
    return (
      <div
        ref="article"
        className={`article ${className || ''}`}
        style={style}
      >
        <div ref="textWrapper" className="text-wrapper">
          <div ref="text" className="article-text">
            {
              this.props.text
            }
          </div>
        </div>
        <PillButton
          idleText="Read More"
          activeText="Read Less"
          onClick={this.handleClick}
        />
      </div>
    )
  }
}