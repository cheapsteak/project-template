import React from 'react';
import ParallaxVideoWrapper from 'common/components/parallax-video-wrapper/parallax-video-wrapper.jsx';
import InstructionalVideo from 'common/components/video-players/instructional/chapter/chapter-video-player-redux.jsx';

export default class Chapter extends React.Component {

  render () {
    return <section className="chapter-page">
      <div className="main">
        <nav className="nav">
          <span className="nav-button">Return to Tour</span>
          <span className="nav-button">Explore</span>
        </nav>
        <div className="page-component chapter-header">
          {
            // <ParallaxVideoWrapper
            //   bgVideoPath={'../videos/bg-1080.mp4'}
            //   fgVideoPath={'../videos/fg-1080.mp4'}
            // />
          }
        </div>

        <div className="page-component">
          <h2>Instructional Video</h2>
          <InstructionalVideo
            className="col-4 margin-auto-horizontal"
            modelSlug="test"
          />
        </div>

        <div className="page-component">360</div>
        <div className="page-component">photo essay</div>
        <div className="page-component">
          Articles
          <article>article 1</article>
          <article>article 2</article>
        </div>

        <div className="podcast">podcast</div>


        <footer>footer</footer>
      </div>
    </section>;
  }
}
