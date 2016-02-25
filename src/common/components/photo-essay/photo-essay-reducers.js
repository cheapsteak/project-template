import { PREV_PHOTO, NEXT_PHOTO, TOGGLE_FULLSCREEN } from './photo-essay-actions.js';

const defState = {
  index: 0,
  isFullscreen: false,
  photos: [
    { 
      id: '0',
      description: 'The key to more success is to have a lot of pillows. Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise.',
      image: '../sample-photo-1.jpg'
    },
    { 
      id: '1',
      description: 'I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. Watch your back, but more importantly when you get out the shower, dry your back, it’s a cold world out there.',
      image: '../sample-photo-2.jpg'
    },
    { 
      id: '2',
      description: ' Look at the sunset, life is amazing, life is beautiful, life is what you make it.',
      image: '../sample-photo-3.jpg'
    }
  ]
};

module.exports = (state = defState, action) => {
  switch (action.type) {
    case PREV_PHOTO:
      return Object.assign({}, state, { index: state.index > 0 ? state.index - 1 : state.photos.length - 1});
    case NEXT_PHOTO:
      return Object.assign({}, state, { index: (state.index + 1) % state.photos.length});
    case TOGGLE_FULLSCREEN:
      return Object.assign({}, state, { isFullscreen: !state.isFullscreen});
    default:
      return state;
  }
};
