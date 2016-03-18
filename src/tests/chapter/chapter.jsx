import React from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux';
import VideoPlayer from 'common/components/video-players/instructional/chapter/chapter-video-player-redux';
import Panorama from 'common/components/panorama/panorama-redux.jsx';

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
      case 'panorama':
        target = 'panorama';
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
            slug="math-1"
            shouldHideInTheBack={true}
          />
          <br/><br/><br/><br/><br/><br/>
          <PhotoEssay
            ref='photoessay'
            slug="math-1"
          />
          <div style={{ width: 800, height: 500}}>
            <Panorama
              ref='panorama'
              slug={`math-1`}
              fullBrowserRoute={`/tests/chapter/panorama/math-1`}
              fullBrowserExitRoute={`/tests/chapter`}
            />
          </div>
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
