import React from 'react';
import Timeline from 'common/components/timeline/timeline';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  changeVideoTime = (time) => {
    this.video.currentTime = time;
  };

  render () {
    return <div className="video-player">
      <video
        ref={(node) => this.video = node }
        src={this.props.src}
        muted
        loop
        autoPlay
        onTimeUpdate={(e) => {
          this.setState({time: e.target.currentTime});
        }}
      >
      </video>
      <div className="video-player-controls">
        <div className="video-player-buttons">
        </div>
        <Timeline
          style={{ width: '100%', position: 'absolute', bottom:'0', left: '0' }}
          currentTime={this.state.time}
          duration={this.video && this.video.duration || 0}
          onTimeChange={this.changeVideoTime}
          items={this.props.timeline}
        />
      </div>
    </div>
  }
}