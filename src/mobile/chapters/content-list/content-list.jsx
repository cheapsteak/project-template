import React from 'react';
import {Link} from 'react-router';
import IconExplore from 'svgs/icon-explore.svg';
import animate from 'gsap-promise';


function ListItem (props) {
  return (
    <Link className="list-item" to={props.route}>
      <img src={ props.image } />
      <div className="list-text-content">
        <span>
          <label>{ props.label }</label>
          <h4>{ props.name }</h4>
        </span>
        {
          props.duration
          ? <span className="item-duration">{ props.duration }</span>
          : null
        }
      </div>
    </Link>
  )
}

const easeType = Quad;
const duration = 0.5;

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
    return animate.to(this.refs.list, duration, { height: this.refs.content.offsetHeight, ease: easeType.easeOut });
  }

  animateOut () {
    return animate.to(this.refs.list, duration/1.5, { height: 0, ease: easeType.easeIn });
  }

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
            name="Narrative Video"
            image={ this.props.narrativeVideo.image }
            duration={ this.props.narrativeVideo.duration }
            route={ this.props.narrativeVideo.route }
          />
          <div className="list-divider">
            <span dangerouslySetInnerHTML={{ __html: IconExplore }}></span>
            <label>Explore More Content</label>
          </div>
          <div className=""></div>
          {
            this.props.instructionalVideos.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  label="Play"
                  name="Instructional Video"
                  image={ item.image }
                  duration={ item.duration }
                  route={ item.route }
                />
              )
            })
          }
          <ListItem
            label="Experience"
            name="The Classroom 360"
            image={ this.props.panorama.image }
            route={ this.props.panorama.route }
          />
          {
            this.props.articles.map(article => {
              return <ListItem
                key={article.slug}
                label="Read"
                name="Field Studies"
                image={ article.image }
                route={ article.route }
              />
            })
          }
          <ListItem
            label="Listen"
            name="Podcast"
            image={ this.props.podcast.image }
            route={ this.props.podcast.route }
          />
        </div>
      </div>
    )
  }
}