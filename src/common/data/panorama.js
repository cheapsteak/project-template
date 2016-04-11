import config from '../../../config.js';
import detect from '../utils/detect';


export default [
  {
    slug: 'hallway',
    title: 'Hallway',
    //src: `${config.ASSET_PATH}/images/pan-hallway.jpg`,
    src: detect.isMobile ? 'http://successacademy.jam3.net/panoramas/panorama-hallway-mobile.jpg' : 'http://successacademy.jam3.net/panoramas/panorama-hallway.jpg',
    initLong: 0,
    initLat: 0
  },
  {
    slug: 'science',
    title: 'Science Lab',
    //src: `${config.ASSET_PATH}/images/pan-history.jpg`,
    src: detect.isMobile ? 'http://successacademy.jam3.net/panoramas/panorama-science-mobile.jpg' : 'http://successacademy.jam3.net/panoramas/panorama-science.jpg',
    initLong: 3,
    initLat: 0
  },
  {
    slug: 'math',
    title: 'Math Classroom',
    //src: `${config.ASSET_PATH}/images/pan-math.jpg`,
    src: detect.isMobile ? 'http://successacademy.jam3.net/panoramas/panorama-math-mobile.jpg' : 'http://successacademy.jam3.net/panoramas/panorama-math.jpg',
    initLong: 2.5,
    initLat: 0
  },
  {
    slug: 'literacy-and-writing',
    title: 'Literacy Classroom',
    //src: `${config.ASSET_PATH}/images/pan-history.jpg`,
    src: detect.isMobile ? 'http://successacademy.jam3.net/panoramas/panorama-literacy-mobile.jpg' : 'http://successacademy.jam3.net/panoramas/panorama-literacy.jpg',
    initLong: -2,
    initLat: 0
  }
]
