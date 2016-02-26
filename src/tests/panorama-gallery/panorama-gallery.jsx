import React from 'react';
import PanoramaGallery from 'common/components/panorama-gallery/panorama-gallery.jsx';

export default function () {
  return (
    <PanoramaGallery
      startIndex={0}
      images={[
        '../images/pan-1.jpg',
        '../images/pan-2.jpg',
        '../images/pan-3.jpg'
      ]}
    />
  )
}
