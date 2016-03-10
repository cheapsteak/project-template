import React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux';
import VideoPlayer from 'common/components/video-players/instructional/chapter/chapter-video-player-redux';

export default class Chapter extends React.Component {

  state = { target: undefined };

  componentDidMount() {
    const { pathname } = this.props.location;
    const key = pathname.split('/')[3];
    this.setTarget(key);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    const key = pathname.split('/')[3];
    this.setTarget(key);
  }

  setTarget = (key) => {
    let target;

    switch(key) {
      case 'photo-essays':
        target = 'photoessay';
        break;
      case 'instructional-videos':
        target = 'video';
        break;
      default:
        break;
    }

    this.setState({ target: this.refs[target] });
  }

  render () {
    const { pathname } = this.props.location;
    const key = pathname.split('/')[3] || 'root';
    const videoStyle = {
      width: '700px',
      height: '400px'
    }

    return (
      <div style={{ overflow: 'scroll', height: '100%'}}>
        <div style={{ marginLeft: '100px', width: '50%', padding: '100px 0'}}>
          <VideoPlayer
            id="target-video"
            ref='video'
            style={videoStyle}
            basePath={`${pathname}`}
            modelSlug="test"
            shouldHideInTheBack={true}
          />
          <br/><br/><br/><br/><br/><br/>
          <PhotoEssay
            ref='photoessay'
            basePath={`${pathname}`}
            modelSlug="test"
          />
        </div>
        <TransitionGroup
          component="div"
          className="route-content-wrapper"
          data-route={pathname}
        >
          { React.cloneElement(this.props.children || <div />, { key: key, target: this.state.target }) }
        </TransitionGroup>
      </div>
    )
  }
}