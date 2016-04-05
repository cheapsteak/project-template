import React from 'react';
import { findDOMNode } from 'react-dom';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import Button from 'common/components/rectangular-button/rectangular-button';
import TransitionGroup from 'react-addons-transition-group';
import ContentList from './content-list/content-list.jsx';
import animate from 'gsap-promise';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import * as chapterActionCreators from './chapters-actions.js';
import narrativeVideoModel from '../data/narrative-video.js';
import store from 'common/store';

export default class MobileChapters extends React.Component {

  state = {
    chapters: store.getState().mobileChapters
  };

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const chapters = store.getState().mobileChapters;

      if(!_.isEqual(chapters, this.state.chapters)) {
        this.setState({ chapters });
      }
    });

    store.dispatch(headerActionCreators.setHeaderSettings({
      color: '#565D60',
      backgroundColor: 'white'
    }));
  }

  componentWillUnmount() {
    this.unsubscribe();
    store.dispatch(chapterActionCreators.closeAllChapters());
  }

  getDistanceFromTop = (node) => {
    const  content = this.refs.container.querySelector(`#${id}`);
    return content.offsetTop;
  };

  getAvailableScrollDistance = () => {
    const container = this.props.getTarget();
    return container.scrollHeight - container.offsetHeight;
  };

  handleItemClick = async (chapter, i) => {
    const chapterNode = this.refs.container.querySelector(`#chapter-${i}`)
    const clientRect = chapterNode.getBoundingClientRect();
    const container = this.props.getTarget();

    if(!chapter.isOpened) {
      if(chapterNode.offsetTop < this.getAvailableScrollDistance()) {
        await animate.to(container, 0.3, { scrollTop: chapterNode.offsetTop, ease: Quad.easeOut });
        this.toggleItemDisplay(chapter, i);
      } else {
        this.toggleItemDisplay(chapter, i);
        setTimeout(() =>
          animate.to(container, 0.3, { scrollTop: chapterNode.offsetTop, ease: Quad.easeOut })
        , 500)
      }
    } else {
      this.toggleItemDisplay(chapter, i);
    }
  };

  toggleItemDisplay = (chapter, i) => {
    store.dispatch(chapterActionCreators.toggleChapterDisplay(chapter.name));
  };

  render () {
    return (
      <div ref="container" className="mobile-chapters">
        {
          this.state.chapters.map((chapter, i) => {
            return (
              <div
                key={chapter.name}
                id={`chapter-${i}`}
                className="chapter-wrapper"
              >
                <div
                  className="chapter-content"
                  onClick={this.handleItemClick.bind(null, chapter, i)}
                >
                  <div className="chapter-text">
                    <label>Chapter</label>
                    <h1 dangerouslySetInnerHTML={{ __html: chapter.name }}></h1>
                  </div>
                  <img className="chapter-image" src={chapter.image} />
                  <div className="panel-label">
                    <span>{ chapter.isOpen ? 'Close' : 'Expand' }</span>
                  </div>
                </div>
                <TransitionGroup>
                  {
                    chapter.isOpen
                    ? <ContentList
                        key={chapter.name}
                        narrativeVideo={ narrativeVideoModel }
                        instructionalVideos={chapter.instructionalVideos}
                        panorama={chapter.panorama}
                        articles={chapter.articles}
                        podcast={chapter.podcast}
                      />
                    : null
                  }
                </TransitionGroup>
              </div>
            )
          })
        }
      </div>
    )
  }
}
