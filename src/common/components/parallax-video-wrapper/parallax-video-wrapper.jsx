import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import ParallaxVideo from '../parallax-video/parallax-video.jsx';
import Stats from '../../utils/stats';

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
      },
      videoAnimateOutFn: () => {
        console.log('default videoAnimateOutFn');
      }
    }
  }

  static propTypes = {
    inHomePage: React.PropTypes.bool,
    inContentPage: React.PropTypes.bool,
    inNarrativeVideo: React.PropTypes.bool,
    bgVideoPath: React.PropTypes.string.isRequired,
    fgVideoPath: React.PropTypes.string.isRequired
  };

  animateInHomePage = () => {
    animate.set([this.bgVideo, this.fgCanvas, this.content], {x: window.innerWidth});
    animate.staggerTo([this.bgVideo, this.fgCanvas, this.content], 0.5, {x: 0, ease: Expo.easeOut}, 0.1);
    console.log('animateInHomePage');
  };
  animateOutHomePage = () => {
    console.log('animateOutHomePage');
  };

  animateInContentPage = () => {
    animate.set([this.bgVideo, this.fgCanvas, this.content], {autoAlpha: 0});
    animate.staggerTo([this.bgVideo, this.fgCanvas, this.content], 0.5, {autoAlpha: 1}, 0.2);
    console.log('animateInContentPage');
  };
  animateOutContentPage = () => {
    console.log('animateOutContentPage');
  };

  animateInNarrativeVideo = () => {
    animate.set([this.bgVideo, this.fgCanvas, this.content], {autoAlpha: 0});
    animate.staggerTo([this.bgVideo, this.fgCanvas, this.content], 0.5, {autoAlpha: 1}, 0.2);
    console.log('animateInNarrativeVideo');
  };
  animateOutNarrativeVideo = () => {
    console.log('animateOutNarrativeVideo');
  };

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.bgVideo = this.refs.parallaxVideo.bgVideo;
    this.fgCanvas = this.refs.parallaxVideo.fgCanvas;
    this.content = findDOMNode(this.refs.content);

    if (this.props.inHomePage) {
      this.setState({
        className: classes.HOME,
        videoAnimateInFn: this.animateInHomePage,
        videoAnimateOutFn: this.animateOutHomePage
      });
    } else if (this.props.inContentPage) {
      this.setState({
        className: classes.CONTENT,
        videoAnimateInFn: this.animateInContentPage,
        videoAnimateOutFn: this.animateOutContentPage
      });
    } else if (this.props.inNarrativeVideo) {
      this.setState({
        className: classes.NARRATIVE,
        videoAnimateInFn: this.animateInNarrativeVideo,
        videoAnimateOutFn: this.animateOutNarrativeVideo
      });
    }
  }

  render() {
    return (
      <div className={`parallax-video-wrapper ${this.state.className}`}>
        <ParallaxVideo
          ref="parallaxVideo"
          bgVideoPath={this.props.bgVideoPath}
          fgVideoPath={this.props.fgVideoPath}
          animateIn={this.state.videoAnimateInFn}
          animateOut={this.state.videoAnimateOutFn}
        >
          <div className={`layer`} data-depth="0.3">
            <div ref="content" className={`text-container`}>
              <div className={`title`}>Explore</div>
              <div className={`subtitle`}>Science</div>
              <div className={`description`}>At Success Academy we completely redefined how to teach Science.</div>
            </div>
          </div>
        </ParallaxVideo>
      </div>
    );
  }

}
