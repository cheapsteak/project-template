import React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux';
import VideoPlayer from 'common/components/instructional-video-player/instructional-video-player-redux';

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

    return (
      <div>
        <div style={{ marginLeft: '200px', width: '50%'}}>
          <VideoPlayer
            id="target-video"
            ref='video'
            basePath={`${pathname}`}
            modelSlug="test"
            shouldHideInTheBack={true}
          />
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