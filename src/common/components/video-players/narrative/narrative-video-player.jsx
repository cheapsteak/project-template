import React from 'react';
import {findDOMNode} from 'react-dom';
import Timeline from 'common/components/timeline/timeline';
import PlayButtonSvg from 'svgs/icon-play.svg';
import PauseButtonSvg from 'svgs/icon-pause.svg';
import BackButtonSvg from 'svgs/video-back-button.svg';
import ForwardButtonSvg from 'svgs/video-forward-button.svg';
import IconExplore from 'svgs/icon-explore.svg';
import ReplayArrowSvg from 'svgs/replay-arrow.svg';
import MuteButtonSvg from 'svgs/video-player-mute.svg';
import VolumeButtonSvg from 'svgs/video-player-volume.svg';
import RightArrowSvg from 'svgs/bubble-cta-arrow.svg';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import TransitionGroup from 'react-transition-group-plus';
import animate from 'gsap-promise';
import _ from 'lodash';
import {Link} from 'react-router';
import ChaptersImageCard from '../components/image-card-one/image-card-one.jsx';
import CareerImageCard from '../components/image-card-two/image-card-two.jsx';
import calculateAnimationStates from '../calculateAnimationStates.js';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';
import BgCover from 'background-cover';
import detect from 'common/utils/detect';
import PlayButton from 'common/components/play-button/play-button';

export default class NarrativeVideoPlayer extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    timeline: React.PropTypes.array
  };

  // Local Storage Ids
  static timeStorageId = 'narrative-video-time';
  static muteStorageId = 'narrative-video-mute-status';

  state = {
    showEndingCTA: false,
    isReady: false,
    isMobile: detect.isMobile
  };

  hideControlsTimeoutId = undefined;
  setLocalStorageIntervalId = undefined;
  wrapperVisible = false;

  componentDidMount() {
    this.animationStates = calculateAnimationStates(this.refs);
    this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = this.videoResize;

    this.containerEl = findDOMNode(this);

    const initialState = this.props.useFullControls
      ? 'idle'
      : 'out';

    animate.set(this.refs.cornerButton, this.animationStates[initialState].cornerButton);
    animate.set(this.refs.overlay, this.animationStates[initialState].overlay);
    animate.set(this.refs.videoWrapper, this.animationStates[initialState].videoWrapper);
    animate.set(this.refs.circleCTA, this.animationStates[initialState].circleCTA);
    animate.set(this.refs.controls, this.animationStates[initialState].controls);
    animate.set(this.refs.controlsUI, this.animationStates[initialState].controlsUI);

    animate.set(this.refs.endingOverlay, this.animationStates.out.endingOverlay);
    animate.set(this.refs.replayButton, this.animationStates.out.replayButton);
    animate.set(this.refs.replayLabel, this.animationStates.out.replayLabel);


    animate.set(this.refs.ctaArrow, { x: '-200%', opacity: 0 });

    //if(!this.props.isPlaying) {
    //if(!this.props.useFullControls) {
    //this.props.showFullControls();
    //}
    //}

    // const fakeVideoObj = {clientWidth: 1920, clientHeight: 1080, style: {}};
    // BgCover.BackgroundCover(fakeVideoObj, this.refs.videoWrapper);
    // this.video.width = parseFloat(fakeVideoObj.style.width);
    // this.video.height = parseFloat(fakeVideoObj.style.height);
    // this.video.style.width = fakeVideoObj.style.width;
    // this.video.style.height = fakeVideoObj.style.height;
    // this.video.style.top = fakeVideoObj.style.width.top;
    // this.video.style.left = fakeVideoObj.style.left;

    if (!detect.isMobile) {
      setTimeout(() => {
        //this.props.isPlaying && this.playVideo();
      }, 600);
    }

    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const el = findDOMNode(this);

    if(this.props.useFullControls !== nextProps.useFullControls
       && !this.videoEnded && (this.lastMouseCoord || detect.isTablet)) {
      if(nextProps.useFullControls) {
        this.animateInControls();
      } else {
        this.animateOutControls();
      }
    }

    if(this.props.currentChapter.title !== nextProps.currentChapter.title)  {
      if(nextProps.currentChapter.title) {
        this.animateCircleCTAText();
      }
    }

    // Video Finished
    if(this.props.duration && nextProps.duration &&
      this.props.currentTime !== nextProps.currentTime) {
      if(this.props.currentTime !== this.props.duration &&
        nextProps.currentTime >= nextProps.duration) {
        clearTimeout(this.hideControlsTimeoutId);
        this.hideControlsTimeoutId = undefined;
        this.animateInEndOverlay();
        this.props.hideFullControls();
      }
    }

    if(this.props.isPlaying !== nextProps.isPlaying) {
      nextProps.isPlaying ? this.playVideo() : this.pauseVideo();
    }

    if(this.props.isMuted !== nextProps.isMuted) {
      nextProps.isMuted ? this.mute() : this.unmute();
    }
  }

  componentWillAppear(callback) {
    if (!detect.isMobile) {
      this.playVideo();
      this.props.onVideoPlay();
    }
    callback();
  }

  componentWillEnter(callback) {
    // timeout is needed because we want to start playing video only after previous page animateOut is done
    setTimeout(() => {
      if (!detect.isMobile) {
        this.playVideo();
        this.props.onVideoPlay();
      }
      callback();
    }, 1500);
  }

  componentWillLeave(callback) {
    animate.set(this.containerEl, {zIndex: 999999});
    this.isAnimatingOut = true;
    this.props.onVideoPause();
    this.props.hideFullControls();
    const path = location.pathname.replace(CONFIG.basePath + '/', '');
    (path === 'grid') ? this.animateOutFade(callback) : this.animateOutSwipe(callback);
  }

  componentWillUnmount() {
    clearTimeout(this.hideControlsTimeoutId);
    this.props.hideFullControls();
    window.removeEventListener('resize', this.handleResize);
    this.clearTimeStorageInterval();
  }

  animateOutSwipe = (callback) => {
    const duration = 1.2;
    const ease = Expo.easeOut;
    const delay = 0.8;

    animate.to(this.video, 1, {autoAlpha: 0});

    return animate.all([
        animate.to(this.containerEl, duration, {x: '-100%', ease, delay}),
        animate.to(this.containerEl, duration, {autoAlpha: 0.6, delay}),
        animate.to(this.refs.pageWrapper, duration, {x: '100%', autoAlpha: 0, ease, delay})
      ])
      .then(() => callback && callback())
  };

  animateOutFade = (callback) => {
    const duration = 1.2;
    const ease = Expo.easeOut;

    this.props.hideFullControls();

    return animate.all([
        animate.to(this.containerEl, duration, {autoAlpha: 0, ease: ease, delay: 0.5})
      ])
      .then(() => callback && callback())
  };

  get videoEnded() {
    return this.video.currentTime === this.video.duration;
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  setTimeStorageInterval = () => {
    this.localStorageIntervalId = setInterval(() => {
      try {
        localStorage.setItem(NarrativeVideoPlayer.timeStorageId, this.video.currentTime);
      } catch (error) {
        return false;
      }
    }, 1000);
  };

  clearTimeStorageInterval = () => {
    clearInterval(this.localStorageIntervalId);
    this.localStorageIntervalId = undefined;
  };

  unmute = () => {
    return animate.to(this.video, 0.8, { volume: 1, ease: Quad.easeIn })
  };

  mute = () => {
    return animate.to(this.video, 0.5, { volume: 0, ease: Quad.easeIn })
  };

  playVideo = () => {
    if(this.video.paused) {
      if(!this.props.isMuted && !detect.isMobile) {
        animate.set(this.video, { volume: 0 });
        this.video.play();
        this.unmute();
        this.setHideControlsTimeout();
      } else {
        this.video.play();
      }
    }
  };

  pauseVideo = async () => {
    if(!this.video.paused) {
      !this.props.useFullControls && this.props.showFullControls();

      if(!this.props.isMuted && !detect.isMobile) {
        animate.set(this.video, { volume: 1 });
        await this.mute();
      }

      this.video && this.video.pause();
    }
  };

  /************************/
  /*     Animatations     */
  /************************/

  animateInControls = () => {
    const staggerText = this.refs.root.querySelectorAll('.stagger-cta');
    const buttons = this.refs.root.querySelectorAll('.button');
    const dots = this.refs.root.querySelectorAll('.dot');
    const ctaArrow = this.refs.root.querySelector('.cta-arrow');

    this.wrapperVisible = true;
    this.stopAnimations();


    // Need Fix for animate out while this is not complete
    animate.set(ctaArrow, { x: '-70%', opacity: 0 });

    animate.staggerFromTo(buttons, 0.3, { y: '150%', ease: ViniEaseOut }, { delay: 0.3, y: '0%', ease: ViniEaseOut }, 0.1);

    animate.staggerFromTo(staggerText, 1, { opacity: 0 }, { delay: 0.8, opacity: 1, ease: ViniEaseOut }, 0.4)

    const dotPromises = _.map(dots, dot => animate.set(dot, {opacity: 0, ease: ViniEaseOut }), 0.1);

    Promise.all(dotPromises).then(() => animate.staggerFromTo(dots, 1, { opacity: 0 }, { delay: 0.5, opacity: 1}, 0.1))

    ///////////////////////////////////////////////////////



    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.overlay, 0.3, this.animationStates.idle.overlay)
        .then(()=>animate.to(this.refs.cornerButton, 0.3, this.animationStates.idle.cornerButton)),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.idle.circleCTA)
        .then( () => animate.to(ctaArrow, 0.3, { delay: 0.7, x: '0%', opacity: 1 }) ),
      animate.to(this.refs.controlsUI, 0.6, this.animationStates.idle.controlsUI),
      animate.to(this.refs.controls, 0.6, this.animationStates.idle.controls),
      _.map(buttons, (button) => { animate.fromTo(button, 0.3, { y: 50 }, { delay: 0.3, y: 0})})
    ]);
  }

  animateOutControls = () => {

    const ctaArrow = this.refs.root.querySelector('.cta-arrow');
    animate.set(ctaArrow, { x: '-200%', opacity: 0 });

    this.stopAnimations();
    this.wrapperVisible = false;
    const dots = this.refs.root.querySelectorAll('.dot');
    _.forEach(dots, dot => animate.set(dot, {opacity: 0}));

    const conditionalAnimations = !this.videoEnded && [
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar)
    ];

    return Promise.all([
      ...conditionalAnimations,
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.out.circleCTA),
      animate.to(this.refs.controlsUI, 0.6, this.animationStates.out.controlsUI),
      animate.to(this.refs.controls, 0.6, this.animationStates.out.controls),
      animate.to(this.refs.replayButton, 0.6, this.animationStates.out.replayButton),
      animate.to(this.refs.replayLabel, 0.6, this.animationStates.out.replayLabel)
    ]);
  };

  animateCircleCTAText = () => {
    const el = findDOMNode(this);
    const ctaEls = el.querySelectorAll('.stagger-cta');
    return animate.staggerFromTo(ctaEls, 1, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: ViniEaseOut }, 0.2);
  };

  animateInEndOverlay = () => {
    this.stopAnimations();
    this.wrapperVisible = true;

    return Promise.all([
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.out.simpleProgressBar),
      animate.to(this.refs.videoWrapper, 0.8, this.animationStates.idle.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.replayButton, 0.6, this.animationStates.idle.replayButton),
      animate.to(this.refs.replayLabel, 0.6, this.animationStates.idle.replayLabel),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.circleCTA, 0.3, this.animationStates.out.circleCTA),
      animate.to(this.refs.overlay, 0.3, this.animationStates.end.overlay),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.idle.endingOverlay)
        .then(() => this.setState({ showEndingCTA: true }))
    ]);
  };

  animateOutEndOverlay = () => {
    this.setState({ showEndingCTA: false });
    this.stopAnimations();
    this.wrapperVisible = false;

    return Promise.all([
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.videoWrapper, 0.3, this.animationStates.out.videoWrapper),
      animate.to(this.refs.controls, 0.3, this.animationStates.out.controls),
      animate.to(this.refs.simpleProgressBar, 0.3, this.animationStates.idle.simpleProgressBar),
      animate.to(this.refs.endingOverlay, 0.3, this.animationStates.out.endingOverlay),
      animate.to(this.refs.replayButton, 0.6, this.animationStates.out.replayButton),
      animate.to(this.refs.cornerButton, 0.3, this.animationStates.out.cornerButton),
      animate.to(this.refs.overlay, 0.3, this.animationStates.out.overlay),
      animate.to(this.refs.replayLabel, 0.6, this.animationStates.out.replayLabel)
    ]);
  };

  stopAnimations = () => {
    if (!this.isAnimatingOut) TweenMax.killTweensOf(_.values(this.refs));
  };


  /************************/
  /*       Handlers       */
  /************************/

  handleResize = () => {
    this.animationStates = calculateAnimationStates(this.refs);
    this.animationStates.out.videoWrapper.onUpdate = this.animationStates.idle.videoWrapper.onUpdate = this.videoResize;

    animate.set(this.refs.controls, { height: this.animationStates.idle.controls.height });

    if(this.wrapperVisible) {
      animate.set(this.refs.videoWrapper, {
        width: this.animationStates.idle.videoWrapper.width,
        height: this.animationStates.idle.videoWrapper.height,
      });
    }

    this.videoResize();
  };

  handleMetadataLoaded = () => {
    const storedTime = parseFloat(localStorage.getItem(NarrativeVideoPlayer.timeStorageId));
    const isMuted = localStorage.getItem(NarrativeVideoPlayer.muteStorageId);

    this.props.onVideoMetadataLoaded && this.props.onVideoMetadataLoaded(this.video.duration);

    if(typeof storedTime === 'number' && !isNaN(storedTime) && storedTime !== this.video.duration) {
      this.changeVideoTime(storedTime)
    }

    if(isMuted === "true") {
      this.props.mute();
      this.video.volume = 0;
    } else {
      this.props.unmute();
    }

    this.videoResize();
    this.setTimeStorageInterval();
    this.setState({isReady: true});
  };

  videoResize = () => {
    animate.set(this.video, {clearProps: 'all'});

    if (window.innerWidth > window.innerHeight) {
      BgCover.BackgroundCover(this.video, this.refs.videoWrapper);
    } else {
      animate.set(this.video, {position: 'absolute', top: '50%', y: '-50%', height: 'auto'});
    }
  };

  handleTimeUpdate = () => {
    const currentChapter = this.props.currentChapter;
    this.props.onVideoTimeChange(this.video.currentTime);
  };

  handleVideoPlayPause = () => {
    if(this.props.isPlaying) {
      this.pauseVideo();
      clearTimeout(this.hideControlsTimeoutId);
    } else {
      this.playVideo();
    }
  };

  handlePrevClick = (e) => {
    const currentTime = this.props.currentTime;
    const times = this.props.chapters.map(point => point.time).reverse();
    const newTime =  _.find(times, (time) => time < currentTime) || 0;

    this.video.currentTime = newTime;
  };

  handleNextClick = (e) => {
    const currentTime = this.video.currentTime;
    const times = this.props.chapters.map(point => point.time);

    // newTime === video.duration will cause a replay
    const newTime =  _.find(times, (time) => time > currentTime) || this.video.duration - 0.001;

    this.video.currentTime = newTime;
  };

  handleMouseEnterControls = (e) => {
    clearTimeout(this.hideControlsTimeoutId);
  };

  handleComponentMouseMove = (e) => {
    if (this.isAnimatingOut) return;

    const mouseCoords = {
      x: e.clientX,
      y: e.clientY
    };

    if (this.isAnimatingOut || this.videoEnded || !this.lastMouseCoord) {
      this.lastMouseCoord = mouseCoords;
      return;
    }

    if(!this.props.useFullControls && !_.isEqual(this.lastMouseCoord, mouseCoords)) {
      this.props.showFullControls();
    }

    this.setHideControlsTimeout();

    this.lastMouseCoord = mouseCoords;
  };

  setHideControlsTimeout = () => {
    clearTimeout(this.hideControlsTimeoutId);
    this.hideControlsTimeoutId = setTimeout(() => {
      if(this.props.isPlaying) {
        this.props.hideFullControls();
      }
      this.hideControlsTimeoutId = undefined;
    }, detect.isTablet? 3000: 4000);
  };

  handleReplayClick = (e) => {
    e.stopPropagation();

    this.changeVideoTime(0);
    this.animateOutEndOverlay();
    this.props.hideFullControls();
    this.playVideo();

    tracking.trackEvent({
      category: 'Narrative video player end - Replay CTA',
      label: 'Narrative Video'
    });
  };

  handleOverlayClick = (e) => {
    if (detect.isTablet) return;

    if(e.target.id === 'videoOverlay') {
      this.props.hideFullControls();
      !this.props.isPlaying && this.playVideo();
      clearTimeout(this.hideControlsTimeoutId);
    }
  };

  handleVolumeClick = (e) => {
    if(this.props.isMuted) {
      try {
        localStorage.setItem(NarrativeVideoPlayer.muteStorageId, false);
      } catch (error) {
        return false;
      }
      this.props.unmute();
    } else {
      try {
        localStorage.setItem(NarrativeVideoPlayer.muteStorageId, true);
      } catch (error) {
        return false;
      }
      this.props.mute();
    }
  };

  handleTouchStart = () => {
    if (!this.userHasInteracted) {
      this.userHasInteracted = true;
      this.playVideo();
      this.props.onVideoPlay();
      animate.to(this.refs.playButton.containerEl, 0.3, {autoAlpha: 0});
    }

    this.props.showFullControls();
    this.setHideControlsTimeout();
  };

  handleCircleGridCtaClick = () => {
    tracking.trackEvent({
      category: 'Explore grid CTA',
      label: 'Narrative Video'
    });
  };

  handleChapterCtaClick = () => {
    tracking.trackEvent({
      category: this.props.currentChapter.slug + ' learn more CTA',
      label: 'Narrative Video'
    });
  };

  handleEndVideoGridCtaClick = () => {
    tracking.trackEvent({
      category: 'Narrative video player end - Explore grid CTA',
      label: 'Narrative Video'
    });
  };

  handleEndVideoCareersCtaClick = () => {
    tracking.trackEvent({
      category: 'Narrative video player end - Careers CTA',
      label: 'Narrative Video'
    });
  };

  handleClick = (e) => {
    if(e.target.id === 'videoOverlay') {
      this.handleVideoPlayPause();
    }
  };

  render() {
    const {style, className} = this.props;
    const progressWidth = (this.video && this.video.duration ? this.video.currentTime / this.video.duration * 100 : 0) + '%';

    return (
      <div
        ref="root"
        className={`video-player narrative-video-player${this.state.isReady ? ' ready' : ''} ${className || ''}`}
        style={style}
        onMouseMove={this.handleComponentMouseMove}
        onTouchStart={this.handleTouchStart}
        onClick={this.handleClick}
      >
        <div ref="pageWrapper" className={`page-wrapper`}>
          <div
            ref="videoWrapper"
            className="video-wrapper"
          >
            <div
              id="videoOverlay"
              ref="overlay"
              className="video-overlay"
            >
            </div>
            <Link to="/grid" onClick={this.handleCircleGridCtaClick}>
              <RectangularButton
                ref={ node => this.refs.cornerButton = findDOMNode(node) }
                className="explore-button"
                text="Main Menu"
                color="#ffffff"
                backgroundColor="#f99100"
                hoverBackgroundColor="#f99100"
                svgIcon={IconExplore}
              />
            </Link>
            <video
              ref={(node) => this.video = node }
              src={this.props.src}
              preload="auto"
              autoPlay={false}
              onLoadedMetadata={this.handleMetadataLoaded}
              onTimeUpdate={this.handleTimeUpdate}
              onPlay={this.props.onVideoPlay}
              onPause={this.props.onVideoPause}
              poster={this.state.isMobile && !localStorage.getItem('narrative-video-time') ? this.props.poster : ''}
            >
            </video>

            {
              this.state.isMobile ? <PlayButton ref="playButton" label="Play"/> : null
            }

            <Link
              ref={node => this.refs.circleCTA = findDOMNode(node)}
              className="circle-cta"
              to={`/chapters/${this.props.currentChapter.slug}`}
              onClick={this.handleChapterCtaClick}
            >
              <div className="circle-wrapper">
                <div className="circle-cta-text">
                  <h3 className="stagger-cta">{this.props.currentChapter.title}</h3>
                  <label className="stagger-cta">Learn More</label>
                </div>
                <div ref="ctaArrow" className="cta-arrow" dangerouslySetInnerHTML={{ __html: RightArrowSvg }}></div>
              </div>
            </Link>
            <div
              ref="endingOverlay"
              className="end-overlay"
            >
              <div className="end-overlay-ui">
                <TransitionGroup
                  component="div"
                  className="ending-cards"
                >
                  {
                    this.state.showEndingCTA
                    ? [
                      <ChaptersImageCard
                        gridButton={true}
                        key={'chapter-card'}
                        label="See All"
                        title="Chapters"
                        route="/grid"
                        image={`${ASSET_PATH}/images/narrative-ending-chapters-card.jpg`}
                        onClick={this.handleEndVideoGridCtaClick}
                      />,
                      <CareerImageCard
                        key={'careers-card'}
                        label="Careers"
                        title="Join Our<br/>Team"
                        href="http://jobs.successacademies.org/"
                        target="__blank"
                        image={`${ASSET_PATH}/images/narrative-ending-career-card.jpg`}
                        onClick={this.handleEndVideoCareersCtaClick}
                      />
                    ]
                    : undefined
                  }
                </TransitionGroup>
                <div
                  className="replay-group"
                >
                  <div
                    ref="replayButton"
                    className="replay-button"
                    onClick={this.handleReplayClick}
                    dangerouslySetInnerHTML={{ __html: ReplayArrowSvg }}
                  >
                  </div>
                  <label
                    ref="replayLabel"
                    className="replay-label"
                  >
                    Replay
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div
            ref="simpleProgressBar"
            className="simple-progress-bar"
          >
            <span style={{ width: progressWidth }}></span>
          </div>
          <div
            ref="controls"
            className="controls"
            onMouseEnter={ this.handleMouseEnterControls }
            onMouseMove={ e => e.stopPropagation() }
            onTouchMove={ this.handleMouseEnterControls }
            onTouchEnd={ this.setHideControlsTimeout }
          >
            <span className="label-duration">{secondsToMinutes(this.video && this.video.duration || 0)}</span>
            <div ref="controlsUI" className="controls-ui">
              <div className="control-group">
                <div className="button-wrapper">
                  <div
                    className="button play-button"
                    dangerouslySetInnerHTML={{__html: !this.props.isPlaying ? PlayButtonSvg : PauseButtonSvg }}
                    onClick={this.handleVideoPlayPause}
                  >
                  </div>
                </div>
                <div className="button-wrapper">
                  <div
                    className="button"
                    dangerouslySetInnerHTML={{__html: BackButtonSvg}}
                    onClick={this.handlePrevClick}
                  >
                  </div>
                </div>
                <div className="button-wrapper">
                  <div
                    className="button"
                    dangerouslySetInnerHTML={{__html: ForwardButtonSvg}}
                    onClick={this.handleNextClick}
                  >
                  </div>
                </div>
                {
                  !detect.isTablet
                  ? <div className="button-wrapper">
                      <div
                        className="button"
                        dangerouslySetInnerHTML={{__html: !this.props.isMuted ? VolumeButtonSvg : MuteButtonSvg }}
                        onClick={this.handleVolumeClick}
                      >
                      </div>
                    </div>
                  : null
                }

              </div>
              <Timeline
                currentTime={this.props.currentTime}
                duration={ this.video && this.video.duration || 0 }
                onTimeChange={this.changeVideoTime}
                items={this.props.chapters}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
