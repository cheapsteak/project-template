import React from 'react';
import {Link} from 'react-router';
import IconExplore from 'svgs/icon-explore.svg';
import IconPlay from 'svgs/icon-thumbnail-play.svg';
import ClockIconSvg from 'svgs/clock-icon.svg';
import animate from 'gsap-promise';
import VideoPlayer from '../../../components/video-player/video-player';

function ListWrapper (props) {
  if(props.isVideo) {
    return (
      <div className={props.className} onClick={props.onClick}>
        <VideoPlayer
          src={props.src}
          preload="none"
          status={props.videoStatus}
          onExitFullscreen={props.onExitFullscreen}
        />
        {props.children}
      </div>
    )
  } else {
    return <Link className={props.className} to={props.to}>{props.children}</Link>
  }
}

function ListItem (props) {

  return (
    <ListWrapper className="list-item" {...props} >
      <img src={ props.image } />
      <div className="list-text-content">
        <span>
          <label>{ props.label }</label>
          <h4>{ props.name }</h4>
        </span>
        {
          props.duration
          ? <div className="item-duration">
              <div className="clock-svg" dangerouslySetInnerHTML={{ __html: ClockIconSvg }}></div>
              { props.duration }
            </div>
          : null
        }
      </div>
    </ListWrapper>
  )
}

const easeType = Expo;
const duration = 0.3;

export default class ChapterContentList extends React.Component {

  state = {
    videoStatuses: []
  };

  componentDidMount() {
    this.setState({
      videoStatuses: [
        this.props.narrativeVideo && 'paused',
        ...this.props.instructionalVideos.map(() => 'paused'),
        this.props.podcast && 'paused',
      ].filter(Boolean)
    })

    animate.set(this.refs.list, { height: 0 });
  }

  componentWillAppear(callback) {
    this.animateIn().then(callback);
  }

  componentWillEnter (callback) {
    this.animateIn().then(callback);
  }

  componentWillLeave (callback) {
    this.animateOut().then(callback);
  }

  animateIn () {
    return animate.to(this.refs.list, duration, { height: this.refs.content.offsetHeight, ease: easeType.easeInOut });
  }

  animateOut () {
    return animate.to(this.refs.list, duration/1.5, { height: 0, ease: easeType.easeOut });
  }

  playVideo = (i) => {
    this.setState({ videoStatuses: [ 
      ...this.state.videoStatuses.slice(0, i),
      'play',
      ...this.state.videoStatuses.slice(i+1, this.state.videoStatuses.length)
    ]});
  };

  pauseVideo = (i) => {
    this.setState({ videoStatuses: [ 
      ...this.state.videoStatuses.slice(0, i),
      'paused',
      ...this.state.videoStatuses.slice(i+1, this.state.videoStatuses.length)
    ]});
  };

  render () {
    return (
      <div
        ref="list"
        className="content-list"
      >
        <div
          ref="content"
          className="list-container"
        >
          <ListItem
            label="Play"
            name={`Meet ${this.props.scholar}`}
            isVideo={ true }
            onClick={ this.playVideo.bind(null, 0) }
            onExitFullscreen={ this.pauseVideo.bind(null, 0) }
            videoStatus={ this.state.videoStatuses[0] }
            image={ this.props.narrativeVideo.iconImage }
            duration={ this.props.narrativeVideo.duration }
            src={ this.props.narrativeVideo.src }
          />
          <div className="list-divider">
            <span dangerouslySetInnerHTML={{ __html: IconExplore }}></span>
            <label>Explore More Content</label>
          </div>
          {
            this.props.instructionalVideos.map((video, i) => {
              const number = this.props.instructionalVideos.length > 1 ? ` ${i+1}` : '';

              return (
                <ListItem
                  key={ i }
                  label="Play"
                  name={`${this.props.name === 'Welcome' ? 'College Persistance' : 'In the Classroom'}${number}`}
                  isVideo={ true }
                  onClick={ this.playVideo.bind(null, i+1) }
                  onExitFullscreen={ this.pauseVideo.bind(null, i+1) }
                  videoStatus={ this.state.videoStatuses[i+1] }
                  image={ video.iconImage }
                  duration={ video.duration }
                  src={ video.src }
                />
              )
            })
          }
          {
            this.props.photoEssay
              ? <ListItem
                label="View"
                name={ `${this.props.photoEssay.title}` }
                image={ this.props.photoEssay.iconImage }
                to={ this.props.photoEssay.route }
              />
              : null
          }
          {
            this.props.panoramas.map((panorama, i) => {
              return (
                <ListItem
                  key={i}
                  label="Experience"
                  name={ `${panorama.title} 360` }
                  image={ panorama.iconImage }
                  to={ panorama.route }
                />
              )
            })
          }
          {
            this.props.articles.map(article => {
              return <ListItem
                key={article.slug}
                label="Read"
                name={ article.title }
                image={ article.iconImage }
                to={ article.route }
              />
            })
          }
          {
            this.props.podcast
            ? <ListItem
                label="Listen"
                name="A Message From Eva"
                image={ this.props.podcast.iconImage }
                isVideo={true}
                onClick={ this.playVideo.bind(null, this.state.videoStatuses.length-1) }
                onExitFullscreen={ this.pauseVideo.bind(null, this.state.videoStatuses.length-1) }
                videoStatus={ this.state.videoStatuses[this.state.videoStatuses.length-1] }
                to={ this.props.podcast.src }
              />
            : null
          }
        </div>
      </div>
    )
  }
}