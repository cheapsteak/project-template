import React from 'react';
import { findDOMNode } from 'react-dom';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import ToggleIcon from 'svgs/mobile-toggle-icon.svg';
import TransitionGroup from 'react-addons-transition-group';
import ContentList from './content-list/content-list.jsx';
import animate from 'gsap-promise';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import * as chapterActionCreators from './chapters-actions.js';
import narrativeVideoData from '../../data/narrative-video.js';
import store from 'common/store';
import pageTransitions from '../page-transitions.jsx';

@pageTransitions
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

    this.setHeader(this.props);
  }

  componentWillUnmount() {
    this.unsubscribe();
    store.dispatch(chapterActionCreators.closeAllChapters());
  }

  componentWillReceiveProps(nextProps) {
    this.setHeader(nextProps);
  }

  setHeader = (props) => {
    const { pathname } = props.location;
    let key = pathname.split('/')[3];

    if(!key) {
      store.dispatch(headerActionCreators.setHeaderSettings({
        type: 'chapters',
        color: '#565D60',
        title: 'SA',
        // backgroundColor: 'white',
        bottomBorder: false,
        backButton: false,
      }));
    }
  }

  getDistanceFromTop = (node) => {
    const  content = this.refs.container.querySelector(`#${id}`);
    return content.offsetTop;
  };

  getAvailableScrollDistance = () => {
    const container = this.refs.container;
    return container.scrollHeight - container.offsetHeight;
  };

  handleItemClick = async (chapter, i) => {
    const chapterNode = this.refs.container.querySelector(`#chapter-${i}`)
    const clientRect = chapterNode.getBoundingClientRect();
    const container = this.refs.container;

    if(!chapter.isOpen) {
      if(chapterNode.offsetTop < this.getAvailableScrollDistance()) {
        animate.to(container, 0.3, { scrollTop: chapterNode.offsetTop - this.refs.topOverlay.offsetHeight, ease: Expo.easeInOut });
        this.toggleItemDisplay(chapter);
      } else {
        this.toggleItemDisplay(chapter);
        setTimeout(() =>
          animate.to(container, 0.3, { scrollTop: chapterNode.offsetTop - this.refs.topOverlay.offsetHeight, ease: Expo.easeOut })
        , 100)
      }
    } else {
      this.toggleItemDisplay(chapter);
    }
  };

  toggleItemDisplay = (chapter) => {
    store.dispatch(chapterActionCreators.toggleChapterDisplay(chapter.name));
  };

  render () {
    const { pathname } = this.props.location;
    let key = pathname.split('/')[3] || 'root';

    return (
      <div ref="container" className="mobile-chapters">
        <div ref="topOverlay" className="top-overlay"></div>
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
                    <div
                      className={`toggle-icon ${chapter.isOpen ? 'open' : ''}`}
                      dangerouslySetInnerHTML={{ __html: ToggleIcon }}
                    >
                    </div>
                    <span>{ chapter.isOpen ? 'Close' : 'Expand' }</span>
                  </div>
                </div>
                <TransitionGroup>
                  {
                    chapter.isOpen
                    ? <ContentList
                        key={chapter.name}
                        narrativeVideo={ narrativeVideoData }
                        instructionalVideos={chapter.instructionalVideos}
                        panorama={chapter.panorama}
                        articles={chapter.articles}
                        podcast={chapter.podcast}
                      />
                    : <div />
                  }
                </TransitionGroup>
              </div>
            )
          })
        }
        <TransitionGroup component="div">
          {
            this.props.children
            ? React.cloneElement(this.props.children, { key: key, className: 'overlay-content' })
            : <div />
          }
        </TransitionGroup>
      </div>
    )
  }
}
