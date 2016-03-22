import React from 'react';
import { findDOMNode } from 'react-dom';
import PillButton from 'common/components/pill-button/pill-button';
import animate from 'gsap-promise';

export default class Article extends React.Component {

  preview = true;

  componentDidMount() {
    // animate.set(this.refs.textWrapper, { height: 200 });
  }

  handleClick = async (e) => {
    const clientRect = this.refs.article.getBoundingClientRect();
    const container = this.props.getTarget();
    const scrollTo = Math.min(this.refs.article.offsetTop - 30, container.scrollHeight - container.offsetHeight)

    await animate.to(container, 0.3, { scrollTop: scrollTo });

    if(this.preview) {
      this.expand();
    } else {
      this.collapse();
    }

    this.preview = !this.preview;
  };

  expand = () => {
    const clientRect = this.refs.text.getBoundingClientRect();
    animate.to(this.refs.textWrapper, 0.3, { height: clientRect.height })
      .then(this.forceUpdate.bind(this))
  };

  collapse = () => {
    animate.to(this.refs.textWrapper, 0.3, { height: 200 })
      .then(this.forceUpdate.bind(this))
    
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