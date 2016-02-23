import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import ParallaxVideo from '../parallax-video/parallax-video.jsx';


export default class ParallaxVideoWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  static propTypes = {};

  static defaultProps = {};


  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  render() {
    return (
      <div className={`parallax-video-wrapper`}>
        <ParallaxVideo
          bgVideoPath={'../videos/bg-1080.mp4'}
          fgVideoPath={'../videos/fg-1080.mp4'}
          animateIn={ () => {console.log('animateIn passed prop')} }
        >
          <span className={`layer`} data-depth="0.3">
            <div className={`text-container`}>
              <div className={`title`}>Explore</div>
              <div className={`subtitle`}>Science</div>
              <div className={`description`}>At Success Academy we completely redefined how to teach Science.</div>
            </div>
          </span>
        </ParallaxVideo>
      </div>
    );
  }

}
