import React from 'react';
import Panorama from 'common/components/panorama/panorama-redux.jsx';

export default class PanoramaTest extends React.Component {

  render() {
    return (
      <div>
        <div style={{height: 600}}>
          <Panorama
            slug={`math`}
            hasMenu={true}
          />
        </div>
      </div>
    )
  }
}
