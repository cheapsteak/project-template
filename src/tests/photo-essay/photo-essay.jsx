import React from 'react';
import PhotoEssay from 'common/components/photo-essay/photo-essay-redux';

class TestPhotoEssay extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div style={{backgroundColor:'rgba(10,10,80,0.9)', height: '100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent: 'center'}}>
        <PhotoEssay
          modelSlug="test"
          style={{ margin: 'auto'}}
          onFullBrowserClick={() => { alert('Full Browser Implementation Goes Here !')}}
        />
      </div>
    )
  }
}

export default TestPhotoEssay;