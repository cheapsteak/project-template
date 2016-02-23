import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import ParallaxVideo from '../parallax-video/parallax-video.jsx';

const classes = {
  HOME: 'in-home-page',
  CONTENT: 'in-content-page',
  NARRATIVE: 'in-narrative-video'
};

export default class ParallaxVideoWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',
      videoAnimateInFn: () => {
        console.log('default videoAnimateInFn');
      }
    }
  }

  static propTypes = {
    inHomePage: React.PropTypes.bool,
    inContentPage: React.PropTypes.bool,
    inNarrativeVideo: React.PropTypes.bool
  };

  animateInHomePage = () => {
    console.log('animateInHomePage');
  };

  animateInContentPage = () => {
    console.log('animateInContentPage');
  };

  animateInNarrativeVideo = () => {
    console.log('animateInNarrativeVideo');
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);

    if (this.props.inHomePage) {
      this.setState({className: classes.HOME, videoAnimateInFn: this.animateInHomePage});
    } else if (this.props.inContentPage) {
      this.setState({className: classes.CONTENT, videoAnimateInFn: this.animateInContentPage});
    } else if (this.props.inNarrativeVideo) {
      this.setState({className: classes.NARRATIVE, videoAnimateInFn: this.animateInNarrativeVideo});
    }
  }

  render() {
    return (
      <div className={`parallax-video-wrapper ${this.state.className}`}>
        <ParallaxVideo
          bgVideoPath={'../videos/bg-1080.mp4'}
          fgVideoPath={'../videos/fg-1080.mp4'}
          animateIn={this.state.videoAnimateInFn}
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
