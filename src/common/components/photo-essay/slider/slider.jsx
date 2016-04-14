import React from 'react';
export default class Slider extends React.Component {
  render () {
    const { index, photos } = this.props;

    return (
      <div className="photo-slider">
        {
          photos && photos.map((photo, index) => (
            <div
              key={index}
              className="image-wrapper"
            >
              <img src={photo.image}/>
            </div>
          ))
        }
      </div>
    );
  }
};