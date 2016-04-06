import React from 'react';
import { findDOMNode } from 'react-dom';
import PlayIconSvg from 'svgs/mobile-play-icon.svg';
import ClockIconSvg from 'svgs/clock-icon.svg';
import animate from 'gsap-promise';
import * as headerActionCreators from 'common/components/mobile-header/mobile-header-actions';
import store from 'common/store';
import model from '../../model/instructional-videos-model.js';
import config from '../../../../config.js';

export default class MobileChapters extends React.Component {

  data = model.getAll();

  componentDidMount() {
    store.dispatch(headerActionCreators.setHeaderSettings({
      color: '#565D60',
      backgroundColor: 'white'
    }));
  }

  componentWillUnmount() {
  }

  render () {
    return (
      <div ref="container" className="mobile-videos">
        <div className="header">
          <h1>Instructional Videos</h1>
          <p>Lorem ipsum dolor sit amet, consect adipiscing elit. Suspendisse id.</p>
        </div>
        {
          this.data.map((video, i) => {
            return (
              <a key={i} href={video.src} target="__blank">
                <div className="video-item">
                  <h1 dangerouslySetInnerHTML={{ __html: video.title }}></h1>
                  <img className="video-image" src={video.backgroundImage} />
                  <div className="panel-label">
                    <div className="play-svg" dangerouslySetInnerHTML={{ __html: PlayIconSvg }}></div>
                    <label>Play Video</label>
                    <div className="duration-group">
                      <div className="clock-svg" dangerouslySetInnerHTML={{ __html: ClockIconSvg }}></div>
                      <label>{video.duration}</label>
                    </div>
                  </div>
                </div>
              </a>
            )
          })
        }
      </div>
    )
  }
}