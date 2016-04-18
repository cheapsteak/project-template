import React from 'react';
import _ from 'lodash';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import Slide from './slide.jsx';

export default class Slider extends React.Component {
  static propTypes = {
    currentIndex: React.PropTypes.number.isRequired,
    photos: React.PropTypes.array.isRequired,
    shouldPreviewNextPhoto: React.PropTypes.bool.isRequired,
    shouldPreviewPreviousPhoto: React.PropTypes.bool.isRequired,
  };

  render () {
    const { currentIndex, photos } = this.props;
    return (
      <div className="photo-slider">
        {
          photos.map((photo, index) => {
            const isNext = (currentIndex + 1 === index) || (currentIndex === photos.length - 1 && index === 0);
            const isPrevious = (currentIndex - 1 === index) || (index === photos.length - 1 && currentIndex === 0);
            const shouldShowPreview = (isNext && this.props.shouldPreviewNextPhoto) || (isPrevious && this.props.shouldPreviewPreviousPhoto);
            const isCurrent = (currentIndex === index);

            return (
              <Slide
                key={index}
                isCurrent={isCurrent}
                isNext={isNext}
                isPrevious={isPrevious}
                shouldShowPreview={shouldShowPreview}
                imageSrc={photo.image}
              >
              </Slide>
            );
          })
        }
      </div>
    );
  }
};
