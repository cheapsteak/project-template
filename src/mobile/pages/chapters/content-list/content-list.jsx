import React from 'react';
import {Link} from 'react-router';
import IconExplore from 'svgs/icon-explore.svg';
import IconPlay from 'svgs/icon-thumbnail-play.svg';
import ClockIconSvg from 'svgs/clock-icon.svg';
import animate from 'gsap-promise';

function ConditionalLink (props) {
  if(props.isExternalLink) {
    return <a className={props.className} href={props.to} target="__blank">{props.children}</a>
  } else {
    return <Link className={props.className} to={props.to}>{props.children}</Link>
  }
}

function ListItem (props) {

  return (
    <ConditionalLink className="list-item" {...props} >
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
    </ConditionalLink>
  )
}

const easeType = Expo;
const duration = 0.3;

export default class ChapterContentList extends React.Component {

  componentDidMount() {
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

  render () {
    console.log(this.props.slug);
        
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
            name="Narrative Video"
            isVideo={true}
            image={ this.props.narrativeVideo.iconImage }
            duration={ this.props.narrativeVideo.duration }
            isExternalLink={true}
            to={ this.props.narrativeVideo.src }
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
                  key={i}
                  label="Play"
                  name={`${this.props.name === 'Welcome' ? 'College Persistance' : 'In the Classroom'}${number}`}
                  isVideo={true}
                  image={ video.iconImage }
                  duration={ video.duration }
                  isExternalLink={true}
                  to={ video.src }
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
            this.props.panorama
              ? <ListItem
                label="Experience"
                name={ `${this.props.panorama.title} 360` }
                image={ this.props.panorama.iconImage }
                to={ this.props.panorama.route }
              />
              : null
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
                isExternalLink={true}
                to={ this.props.podcast.src }
              />
            : null
          }
        </div>
      </div>
    )
  }
}