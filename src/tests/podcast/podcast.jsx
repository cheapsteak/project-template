import React from 'react';
import Podcast from 'common/components/podcast/podcast.jsx';

export default class PodcastTest extends React.Component {
  render() {
    return (
      <div style={{height: 480}}>
        <Podcast
          src={`http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4`}
        />
      </div>
    )
  }
}
