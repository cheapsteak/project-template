import config from '../../../config.js';

export default {
  currentTime: 0,
  duration: undefined,
  isPlaying: false,
  useFullControls: false,
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4',
  circleCTA: {
    text: '',
    route: ''
  },
  timeline: [
    {
      id: 'chapter 0.1',
      ctaText: 'Music',
      time: 0,
      // img: `${config.ASSET_PATH}/hover-card.jpg`,
      ctaText: 'Music',
      route: '/tests/narrative-video-player#Music'
    },
    {
      id: 'chapter 1',
      ctaText: 'Science',
      time: 15,
      // img: `${config.ASSET_PATH}/hover-card.jpg`,
      ctaText: 'Science',
      route: '/tests/narrative-video-player#Science'
    },
    {
      id: 'chapter 1.2',
      time: 30,
      ctaText: 'Math',
      // img: `${config.ASSET_PATH}/hover-card.jpg`,
      ctaText: 'Math',
      route: '/tests/narrative-video-player#Math'
    },
    {
      id: 'chapter 2',
      time: 40,
      ctaText: 'Computer Science',
      // img: `${config.ASSET_PATH}/hover-card.jpg`,
      ctaText: 'Computer Science',
      route: '/tests/narrative-video-player#CompSci'
    },
    {
      id: 'chapter 3',
      time: 50,
      ctaText: 'Art',
      // img: `${config.ASSET_PATH}/hover-card.jpg`,
      ctaText: 'Art',
      route: '/tests/narrative-video-player#Art'
    },
  ]
}