import React from 'react';
import { findDOMNode } from 'react-dom';
import IconWatch from 'svgs/icon-play.svg';
import IconExplore from 'svgs/icon-explore.svg';
import Button from 'common/components/rectangular-button/rectangular-button';
import TransitionGroup from 'react-addons-transition-group';
import ContentList from './content-list/content-list.jsx';
import animate from 'gsap-promise';
import * as actionCreators from 'common/components/mobile-header/mobile-header-actions';
import store from 'common/store';

export default class MobileChapters extends React.Component {

  state = {
    narrativeVideo: {
      image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`,
      route: '/mobile',
      duration: 22.31
    },
    data: [
      {
        isOpen: false,
        name: 'Welcome',
        image: `${ASSET_PATH}/mobile-chapters-kid-1.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'Science',
        image: `${ASSET_PATH}/mobile-chapters-kid-2.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'Literacy &<br/>Writing',
        image: `${ASSET_PATH}/mobile-chapters-kid-3.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'Math',
        image: `${ASSET_PATH}/mobile-chapters-kid-4.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'Electives',
        image: `${ASSET_PATH}/mobile-chapters-kid-5.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'Character Development',
        image: `${ASSET_PATH}/mobile-chapters-kid-6.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'Computer<br/>Science',
        image: `${ASSET_PATH}/mobile-chapters-kid-7.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'History',
        image: `${ASSET_PATH}/mobile-chapters-kid-8.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
      {
        isOpen: false,
        name: 'Parental<br/>Investment',
        image: `${ASSET_PATH}/mobile-chapters-kid-9.png`,
        instructionalVideos: [{image: `${ASSET_PATH}/mobile-list-thumbnail-1.jpg`, route: '/url', duration: 7.34 }],
        panorama: { image: `${ASSET_PATH}/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
        article: { image: `${ASSET_PATH}/mobile-list-thumbnail-3.jpg`, route: '/mobile' },
        podcast: { image: `${ASSET_PATH}/mobile-list-thumbnail-4.jpg`, route: '/mobile',}
      },
    ]
  };

  componentWillMount() {
    store.dispatch(actionCreators.setHeaderColors({
      color: '#565D60',
      backgroundColor: 'white'
    }));
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
    // const scrollTo = Math.min(chapterNode.offsetTop, this.getAvailableScrollDistance());

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
    this.setState({ data:
      [
        ...this.state.data.slice(0, i),
        Object.assign({}, chapter, { isOpen: !chapter.isOpen }),
        ...this.state.data.slice(i + 1)
      ] 
    });
  };

  render () {
    // To be refactored to use redux instead of state

    return (
      <div ref="container" className="mobile-chapters">
        {
          this.state.data.map((chapter, i) => {
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
                        narrativeVideo={ this.state.narrativeVideo }
                        instructionalVideos={chapter.instructionalVideos}
                        panorama={chapter.panorama}
                        article={chapter.article}
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
