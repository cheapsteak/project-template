import React from 'react';
import Podcast from 'common/components/podcast/podcast.jsx';

export default class PodcastTest extends React.Component {
  render() {
    return (
      <div style={{height: 480}}>
        <Podcast
          src={`../videos/parallax-history.mp4`}
        />
      </div>
    )
  }
}
