import React from 'react';
import { findDOMNode } from 'react-dom';
import PillButton from 'common/components/pill-button/pill-button';
import animate from 'gsap-promise';

export default class Article extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    getTarget: React.PropTypes.func,
    aboveFoldSelector: React.PropTypes.string
  };

  preview = true;
  aboveFoldDisplayHeight = 200;

  componentDidMount() {
    this.setFoldedDisplayHeight();
    // animate.set(this.refs.textWrapper, { height: this.aboveFoldDisplayHeight });
    window.addEventListener('resize', this.setFoldedDisplayHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setFoldedDisplayHeight);
  }

  setFoldedDisplayHeight = () => {
    const aboveFoldText = this.refs.article.querySelector(this.props.aboveFoldSelector);
    const clientRect = this.refs.text.getBoundingClientRect();

    if(aboveFoldText) {
      this.aboveFoldDisplayHeight = aboveFoldText.getBoundingClientRect().height;
    }

    animate.set(this.refs.textWrapper, { height: this.preview ? this.aboveFoldDisplayHeight : clientRect.height });
  }

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
   return animate.to(this.refs.textWrapper, 0.3, { height: this.aboveFoldDisplayHeight })
  };

  render () {
    const { className = '', style } = this.props;

    return (
      <div
        ref="article"
        className={`article ${className}`}
        style={style}
      >
        <div ref="textWrapper" className="text-wrapper">
          <div ref="text" className="article-text">
            {
              this.props.children
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