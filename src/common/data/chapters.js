import config from '../../../config.js';
const ctaText = 'Explore';

export default [
  {
    slug: 'welcome',
    title: 'Welcome',
    time: 0,
    hero: {
      cta: '',
      description: 'Redefining What’s Possible in Public Education',
      bgVideoUrl: `http://successacademy.jam3.net/videos/welcome.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Arianne',
    instructionalVideos: ['welcome'],
    panoramas: ['hallway', 'science', 'math', 'literacy-and-writing'],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'math',
    title: 'Math',
    time: 35,
    hero: {
      cta: ctaText,
      description: 'Empowering confident mathematicians',
      bgVideoUrl: `http://successacademy.jam3.net/videos/math.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Quinlan',
    instructionalVideos: ['math'],
    panoramas: [],
    photoEssays: [],
    articles: ['math-1', 'math-2', 'math-3'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'science',
    title: 'Science',
    time: 70,
    hero: {
      cta: ctaText,
      description: 'The Joy of Discovery through Scientific Inquiry',
      bgVideoUrl: `http://successacademy.jam3.net/videos/science.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Idrissa',
    instructionalVideos: ['science'],
    panoramas: [],
    photoEssays: ['science-1'],
    articles: ['science-1'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'electives',
    title: 'Electives',
    time: 105,
    hero: {
      cta: ctaText,
      description: 'Developing the Whole Child',
      bgVideoUrl: `http://successacademy.jam3.net/videos/electives.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Morgan and William',
    instructionalVideos: [],
    panoramas: [],
    photoEssays: ['electives-1'],
    articles: ['electives-1'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'computer-science',
    title: 'Computer Science',
    time: 140,
    hero: {
      cta: ctaText,
      description: 'Nurturing the Next Generation of Technologists and Developers',
      bgVideoUrl: `http://successacademy.jam3.net/videos/computer.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Raquel',
    instructionalVideos: ['computer-science'],
    panoramas: [],
    photoEssays: ['computer-science-1'],
    articles: ['computer-science-1'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'literacy-and-writing',
    title: 'Literacy & Writing',
    time: 175,
    hero: {
      cta: ctaText,
      description: 'Developing Independent Learners through Literacy',
      bgVideoUrl: `http://successacademy.jam3.net/videos/literacy.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Sela',
    instructionalVideos: ['literacy', 'writing'],
    instructionalVideosCtas: ['Literacy', 'Writing'],
    panoramas: [],
    photoEssays: [],
    articles: ['literacy-and-writing-1'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'history',
    title: 'History',
    time: 205,
    hero: {
      cta: ctaText,
      description: 'Studying the Past to Shape the Future',
      bgVideoUrl: `http://successacademy.jam3.net/videos/history.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Frankie',
    instructionalVideos: ['history'],
    panoramas: [],
    photoEssays: ['history-1'],
    articles: ['history-1', 'history-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'character-development',
    title: 'Character Development',
    time: 240,
    hero: {
      cta: ctaText,
      description: 'Building the skills for a lifetime of success',
      bgVideoUrl: `http://successacademy.jam3.net/videos/character.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Lianne',
    instructionalVideos: [],
    panoramas: [],
    photoEssays: ['character-development-1'],
    articles: ['character-development-1'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'parental-investment',
    title: 'Parental Investment',
    time: 275,
    hero: {
      cta: ctaText,
      description: 'Working together to support our scholars',
      bgVideoUrl: `http://successacademy.jam3.net/videos/parental.mp4`,
      poster: `${config.ASSET_PATH}/images/temp-hero-poster.jpg`,
      thumbUrl: `${config.ASSET_PATH}/images/learn-more.jpg`
    },
    scholar: 'Alexander',
    instructionalVideos: [],
    panoramas: [],
    photoEssays: ['parental-investment-1'],
    articles: ['parental-investment-1'],
    podcast: '',
    infographics: ''
  }
]
