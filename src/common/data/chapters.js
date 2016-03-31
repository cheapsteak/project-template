import config from '../../../config.js';
const ctaText = 'Explore';

export default [
  {
    slug: 'welcome',
    title: 'Welcome',
    time: 0,
    hero: {
      cta: '',
      description: 'At Success Academy we completely redefined how to teach Science.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: [],
    panoramas: ['math', 'literacy-and-writing', 'science', 'hallway'],
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
      description: 'At Success Academy we completely redefined how to teach Math.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['math'],
    panoramas: ['math'],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'science',
    title: 'Science',
    time: 40,
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Science.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['science'],
    panoramas: ['science'],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'electives',
    title: 'Electives',
    time: 60,
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Electives.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: [],
    panoramas: [],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'computer-science',
    title: 'Computer Science',
    time: 70,
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Computer Science.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['computer-science'],
    panoramas: [],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'literacy-and-writing',
    title: 'Literacy & Writing',
    time: 80,
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Literacy and Writing.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['literacy', 'writing'],
    instructionalVideosCtas: ['Literacy', 'Writing'],
    panoramas: ['literacy-and-writing'],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'history',
    title: 'History',
    time: 90,
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach History.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['history'],
    panoramas: [],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
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
    instructionalVideos: [],
    panoramas: [],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
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
    instructionalVideos: [],
    panoramas: [],
    photoEssays: [],
    articles: ['welcome-1', 'welcome-2'],
    podcast: '',
    infographics: ''
  }
]
