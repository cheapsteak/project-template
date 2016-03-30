import React from 'react';
import {findDOMNode} from 'react-dom';
import PillButton from 'common/components/pill-button/pill-button';
import animate from 'gsap-promise';

export default class Article extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    getTarget: React.PropTypes.func,
    scrollTopPadding: React.PropTypes.number,
    aboveFoldSelector: React.PropTypes.string,
    collapsed: React.PropTypes.bool,
    bannerImage: React.PropTypes.string
  };

  static defaultProps = {
    scrollTopPadding: 0,
    collapsed: true
  };

  collapsed = true;
  aboveFoldDisplayHeight = 200;

  componentDidMount() {
    this.setFoldedDisplayHeight();
    window.addEventListener('resize', this.setFoldedDisplayHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setFoldedDisplayHeight);
  }

  setFoldedDisplayHeight = () => {
    const aboveFoldText = this.refs.article.querySelector(this.props.aboveFoldSelector);
    const clientRect = this.refs.text.getBoundingClientRect();

    if (aboveFoldText) {
      this.aboveFoldDisplayHeight = aboveFoldText.getBoundingClientRect().height;
    }

    animate.set(this.refs.textWrapper, {height: this.collapsed ? this.aboveFoldDisplayHeight : clientRect.height});
  }

  getDistanceFromTop = () => {
    const container = this.props.getTarget();
    return container.scrollTop + this.refs.textWrapper.getBoundingClientRect().top - this.props.scrollTopPadding;
  };

  getAvailableScrollDistance = () => {
    const container = this.props.getTarget();
    return container.scrollHeight - container.offsetHeight;
  };

  handleClick = async(e) => {
    const clientRect = this.refs.article.getBoundingClientRect();
    const container = this.props.getTarget();

    if (this.collapsed) {
      if (this.getDistanceFromTop() < this.getAvailableScrollDistance()) {
        await animate.to(container, 0.3, {scrollTop: this.getDistanceFromTop()});
        await this.expand();
      } else {
        await this.expand();
        await animate.to(container, 0.3, {scrollTop: this.getDistanceFromTop()});
      }
    } else {
      this.collapse();
    }

    this.collapsed = !this.collapsed;
  };

  expand = () => {
    const clientRect = this.refs.text.getBoundingClientRect();
    return animate.to(this.refs.textWrapper, 0.3, {height: clientRect.height})
  };

  collapse = () => {
    return animate.to(this.refs.textWrapper, 0.3, {height: this.aboveFoldDisplayHeight})
  };

  render() {
    const {className = '', style, bannerImage} = this.props;

    return (
      <div
        ref="article"
        className={`article ${className}`}
        style={style}
      >
        {
          bannerImage
            ? <div className="banner-image">
            <img src={bannerImage}/>
          </div>
            : undefined
        }
        <div className="article-content-wrapper">
          <div className="article-title">
            <h1>{this.props.title}</h1>
          </div>
          <div className="article-content">
            <div ref="textWrapper" className="text-wrapper">
              <div
                ref="text"
                className="article-text"
                dangerouslySetInnerHTML={{ __html: this.props.children }}
              >
              </div>
            </div>
            <PillButton
              idleText="Read More"
              activeText="See Less"
              onClick={this.handleClick}
            />
          </div>
        </div>
      </div>
    )
  }
}
