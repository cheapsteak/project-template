import config from '../../../config.js';
const ctaText = 'Explore';

export default [
  {
    slug: 'welcome',
    title: 'Welcome',
    hero: {
      cta: '',
      description: 'At Success Academy we completely redefined how to teach Science.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: [],
    panoramas: ['math', 'literacy-and-writing', 'science', 'hallway'],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'math',
    title: 'Math',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Math.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['tests/instructional-grid-player'],
    panoramas: ['math'],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'science',
    title: 'Science',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Science.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['tests/instructional-grid-player'],
    panoramas: ['science'],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'electives',
    title: 'Electives',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Electives.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: [],
    panoramas: [],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'computer-science',
    title: 'Computer Science',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Computer Science.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['tests/instructional-grid-player'],
    panoramas: [],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'literacy-and-writing',
    title: 'Literacy & Writing',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Literacy and Writing.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['tests/instructional-grid-player'],
    panoramas: ['literacy-and-writing'],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'history',
    title: 'History',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach History.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['tests/instructional-grid-player'],
    panoramas: [],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'character-development',
    title: 'Character Development',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Character Development.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['tests/instructional-grid-player'],
    panoramas: [],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  },
  {
    slug: 'parental-investment',
    title: 'Parental Investment',
    hero: {
      cta: ctaText,
      description: 'At Success Academy we completely redefined how to teach Parental Investment.',
      bgVideoUrl: `${config.ASSET_PATH}/videos/landing-video.mp4`,
      thumbUrl: `${config.ASSET_PATH}/learn-more.jpg`
    },
    instructionalVideos: ['tests/instructional-grid-player'],
    panoramas: [],
    photoEssays: [],
    articles: [],
    podcast: '',
    infographics: ''
  }
]
