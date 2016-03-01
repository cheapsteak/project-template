import { PREV_PANORAMA, NEXT_PANORAMA } from './panorama-gallery-actions';

const defState = {
  index: 0,
  panoramas: [
    {
      src: '../images/pan-11.jpg'
    },
    {
      src: '../images/pan-22.jpg',
      initLong: 0.5,
      initLat: 0
    },
    {
      src: '../images/pan-33.jpg',
      initLong: 0.2,
      initLat: -0.2
    }
  ]
};

module.exports = (state = defState, action) => {
  switch (action.type) {
    case PREV_PANORAMA:
      return Object.assign({}, state, {index: state.index > 0 ? state.index - 1 : state.panoramas.length - 1});
    case NEXT_PANORAMA:
      return Object.assign({}, state, {index: (state.index + 1) % state.panoramas.length});
    default:
      return state;
  }
};
