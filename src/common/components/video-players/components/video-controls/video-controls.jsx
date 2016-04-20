import React from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import PlayButtonSvg from 'svgs/icon-play.svg';
import PauseButtonSvg from 'svgs/icon-pause.svg';
import PrevButtonSvg from 'svgs/video-back-button.svg';
import NextButtonSvg from 'svgs/video-forward-button.svg';
import MuteButtonSvg from 'svgs/video-player-mute.svg';
import VolumeButtonSvg from 'svgs/video-player-volume.svg';
import EnterFullBrowserButtonSvg from 'svgs/video-player-enter-fullbrowser.svg';
import ExitFullBrowserButtonSvg from 'svgs/video-player-exit-fullbrowser.svg';
import TransitionGroup from 'react-transition-group-plus';
import _ from 'lodash';
import Timeline from 'common/components/video-players/components/timeline/timeline';
import PlayButton from 'common/components/play-button/play-button';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import HoverCard from 'common/components/video-players/components/timeline/timeline-hover-card/timeline-hover-card';
import secondsToMinutes from 'common/utils/seconds-to-minutes.js';
import detect from 'common/utils/detect';


export default function calculateAnimationStates (els) {
  return {
    out: {
      container: {
        y: '170%',
        ease: ViniEaseOut
      },
      controls: {
        y: '170%',
        ease: ViniEaseOut
      }
    },
    idle: {
      container: {
        y: '0%',
        ease: ViniEaseOut
      },
      controls: {
        y: '0%',
        ease: ViniEaseOut
      }
    }
  };
};

function Button(props) {
  return (
    <div className={`button-wrapper ${props.className}`}>
      <div
        className={`button`}
        dangerouslySetInnerHTML={{__html: props.svg }}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
      </div>
      {
        props.hasHoverCard
        ? <TransitionGroup>
            {
              props.showHoverCard
              ? <HoverCard
                  key="prev-card"
                  getContainer={ props.getContainer }
                  ctaText={props.hoverCardText}
                />
              : undefined
            }
          </TransitionGroup>
        : null
      }
    </div>
  )
}

export default class VideoControls extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    style: React.PropTypes.object,
    currentTime: React.PropTypes.number,
    duration: React.PropTypes.number,
    onMouseEnter: React.PropTypes.func,
    onMouseMove: React.PropTypes.func,
    onTouchMove: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onScrubberClick: React.PropTypes.func,
    playPauseButton: React.PropTypes.func,
    prevButton: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.object,
    ]),
    nextButton: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.object,
    ]),
    fullBrowserButton: React.PropTypes.func,
    muteButton: React.PropTypes.func,
    hotspots: React.PropTypes.array,
  };

  static defaultProps = {
    currentTime: 0,
    duration: 0,
    hotspots: []
  };

  state = {
    displayedHoverCard: null
  };

  componentDidMount() {
    this.animationStates = calculateAnimationStates(this.refs);
    this.timeline = this.getTimeline();
  }

  componentWillAppear(callback) {
    this.timeline.seek('idle');
    callback();
  }

  componentWillEnter(callback) {
    TweenMax.killTweensOf(this.timeline);
    this.timeline.seek('beforeEnter')
    this.timeline.tweenTo('idle', { onComplete: () => {
      this.refs.container && this.refs.container.classList.add('anim-complete');
      callback();
    }});
  }

  componentWillLeave(callback) {
    TweenMax.killTweensOf(this.timeline);
    this.timeline.seek('idle')
    this.timeline.tweenTo('afterLeave', {onComplete: callback});
  }

  getTimeline = () => {
    const buttons = this.refs.container.querySelectorAll('.button');
    const hotspots = this.refs.container.querySelectorAll('.dot') || [];
    const scrubberEls = [
      this.refs.container.querySelector('.progress-timestamp'),
      this.refs.container.querySelector('.progress-head')
    ];

    return new TimelineMax()
      .pause()
      .set(this.refs.container, this.animationStates.out.container)
      .set(this.refs.controls, this.animationStates.out.controls)
      .add('beforeEnter')
      .to(this.refs.container, 0.6, this.animationStates.idle.container)
      .to(this.refs.controls, 0.6, this.animationStates.idle.controls, '-=0.5')
      .staggerFrom(scrubberEls, 0.5, { y: 100, ease: ViniEaseOut}, 0.15, '-=0.3')
      .staggerFrom(buttons, 0.3, { y: '200%', ease: ViniEaseOut}, 0.1, '-=0.5')
      .staggerFrom(hotspots, 1.2, { opacity: 0 }, 0.025, '-=0.25')
      .add('idle')
      .to(this.refs.controls, 0.6, this.animationStates.out.controls)
      .to(this.refs.container, 0.6, this.animationStates.out.container, '-=0.4')
      .add('afterLeave')
  };

  getButtonContainer = (selector) => {
    return document.querySelector(selector);
  }

  showHoverCard = (cardId) => {
    this.setState({ displayedHoverCard: cardId })
  };

  render () {
    return (
      <div
        id={this.props.id}
        ref="container"
        className="video-controls"
        onMouseEnter={this.props.onMouseEnter}
        onMouseMove={this.props.onMouseMove}
        onTouchMove={this.props.onTouchMove}
        onTouchEnd={this.props.onTouchEnd}
      >
        <span
          className="label-duration"
          style={{ visibility: this.props.duration ? 'visible' : 'hidden'}}
        >
          {secondsToMinutes(this.props.duration)}
        </span>
        <div ref="controls" className="controls-ui">
          <div className="control-group">
            {
              this.props.playPauseButton
              ? <Button
                  className="play-button"
                  svg={!this.props.isPlaying ? PlayButtonSvg : PauseButtonSvg}
                  onClick={this.props.playPauseButton}
                />
              : null
            }
            {
              this.props.prevButton
              ? <Button
                  className="prev-button"
                  svg={PrevButtonSvg}
                  onClick={_.isFunction(this.props.prevButton) ? this.props.prevButton : this.props.prevButton.onClick }
                  getContainer={this.getButtonContainer.bind(null, '.prev-button')}
                  hasHoverCard={this.props.prevButton.hoverCard}
                  showHoverCard={this.state.displayedHoverCard === 'prevButton'}
                  hoverCardText={this.props.prevButton.hoverCard && this.props.prevButton.hoverCard.text}
                  onMouseEnter={this.props.prevButton.hoverCard && this.showHoverCard.bind(null, 'prevButton')}
                  onMouseLeave={this.props.prevButton.hoverCard && this.showHoverCard}
                />
              : null
            }
            {
              this.props.nextButton
              ? <Button
                  className="next-button"
                  svg={NextButtonSvg}
                  onClick={_.isFunction(this.props.nextButton) ? this.props.nextButton : this.props.nextButton.onClick }
                  getContainer={ this.getButtonContainer.bind(null, '.next-button') }
                  hasHoverCard={this.props.nextButton.hoverCard}
                  showHoverCard={this.state.displayedHoverCard === 'nextButton'}
                  hoverCardText={this.props.nextButton.hoverCard && this.props.nextButton.hoverCard.text}
                  onMouseEnter={this.props.nextButton.hoverCard && this.showHoverCard.bind(null, 'nextButton')}
                  onMouseLeave={this.props.nextButton.hoverCard && this.showHoverCard}
                />
              : null
            }
            {
              this.props.muteButton && !detect.isTablet
              ? <Button
                  svg={!this.props.isMuted ? VolumeButtonSvg : MuteButtonSvg}
                  onClick={this.props.muteButton}
                />
              : null
            }
            {
              this.props.fullBrowserButton
              ? <Button
                  className="fullscreen-button"
                  svg={this.props.isFullBrowser ? ExitFullBrowserButtonSvg : EnterFullBrowserButtonSvg}
                  onClick={this.props.fullBrowserButton}
                />
              : null
            }
          </div>
          <Timeline
            currentTime={this.props.currentTime}
            duration={this.props.duration}
            onTimeChange={this.props.onScrubberClick}
            items={this.props.hotspots}
          />
        </div>
      </div>
    )
  }
}
