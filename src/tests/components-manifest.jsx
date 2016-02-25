/**
 * components added to the manifest can be accessed in browser via /tests/{componentName}
 */

export default {
  timeline: require('./timeline/timeline.jsx'),
  photoessay: {
    component: require('common/components/photo-essay/photo-essay.jsx'),
    props: {
      index: 0,
      photos: [
        { 
          id: '0',
          description: 'The key to more success is to have a lot of pillows. Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise.',
          image: '../sample-photo-1.jpg'
        },
        { 
          id: '1',
          description: 'The key to more success is to have a lot of pillows. Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise.',
          image: '../sample-photo-2.jpg'
        },
        { 
          id: '2',
          description: ' Look at the sunset, life is amazing, life is beautiful, life is what you make it.',
          image: '../sample-photo-3.jpg'
        }
      ],
      style: {
        margin: 'auto'
      }
    }
  }
};
