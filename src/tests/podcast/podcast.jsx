import React from 'react';
import Podcast from 'common/components/podcast/podcast.jsx';

export default class PodcastTest extends React.Component {
  render() {
    return (
      <div style={{height: '60vh'}}>
        <Podcast
          src={`https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119`}
        />
      </div>
    )
  }
}
