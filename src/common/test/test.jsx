import React from 'react';
import Timeline from 'common/components/timeline/timeline';

export default class Test extends React.Component {
  render () {
    return <div style={{ backgroundColor: 'black', width: '100%', height: '100vh'}}>
      <Timeline
        style={{ width: '70vw', position: 'absolute', top:'70%', left: '50%', transform:'translate(-50%,-50%)'}}
        currentTime={80}
        duration={100}
        items={[
          { id: 'chapter 1', time: '10', img: '../hover-card.jpg' },
          { id: 'chapter 2', time: '15', img: '../hover-card.jpg' },
          { id: 'chapter 3', time: '20', img: '../hover-card.jpg' },
          { id: 'chapter 4', time: '40', img: '../hover-card.jpg' },
          { id: 'chapter 5', time: '70', img: '../hover-card.jpg' },
          { id: 'chapter 9', time: '90', img: '../hover-card.jpg' }
        ]}
      />
    </div>
  }
}