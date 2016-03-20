export default {
  currentTime: 0,
  isPlaying: false,
  useFullControls: false,
  src: '/videos/fg-1080-1.mp4',
  circleCTA: {
    text: '',
    route: ''
  },
  timeline: [
    {
      id: 'chapter 1',
      ctaText: 'Science',
      time: 2,
      img: '/hover-card.jpg',
      ctaText: 'Science',
      route: '/tests/narrative-video-player#Science'
    },
    {
      id: 'chapter 1.2',
      time: 4,
      ctaText: 'Math',
      img: '/hover-card.jpg',
      ctaText: 'Math',
      route: '/tests/narrative-video-player#Math'
    },
    {
      id: 'chapter 2',
      time: 6,
      ctaText: 'Computer Science',
      img: '/hover-card.jpg',
      ctaText: 'Computer Science',
      route: '/tests/narrative-video-player#CompSci'
    },
    {
      id: 'chapter 3',
      time: 8,
      ctaText: 'Art',
      img: '/hover-card.jpg',
      ctaText: 'Art',
      route: '/tests/narrative-video-player#Art'
    },
  ]
}