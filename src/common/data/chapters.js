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
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    scholar: 'Arianne',
    instructionalVideos: [],
    panoramas: ['hallway', 'science', 'math', 'literacy-and-writing'],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'math',
    title: 'Math',
    time: 20,
    hero: {
      cta: ctaText,
      description: 'Empowering Confident Mathematicians',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
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
    time: 40,
    hero: {
      cta: ctaText,
      description: 'The Joy of Discovery through Scientific Inquiry',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
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
    time: 60,
    hero: {
      cta: ctaText,
      description: 'Developing the Whole Child',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
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
    time: 70,
    hero: {
      cta: ctaText,
      description: 'Nurturing the Next Generation of Technologists and Developers',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    scholar: 'Raquel',
    instructionalVideos: ['computer-science'],
    panoramas: [],
    photoEssays: ['computer-science-1'],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'literacy-and-writing',
    title: 'Literacy & Writing',
    time: 80,
    hero: {
      cta: ctaText,
      description: 'Developing Independent Learners through Literacy',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
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
    time: 90,
    hero: {
      cta: ctaText,
      description: 'Studying the Past to Shape the Future',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
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
    time: 100,
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Character Development.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
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
    time: 140,
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Parental Investment.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
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
