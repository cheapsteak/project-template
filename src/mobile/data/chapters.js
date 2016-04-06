import config from '../../../config.js';

export default [
  {
    name: 'Welcome',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-1.png`,
    instructionalVideos: [],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: {
      image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-4.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1'
    }
  },
  {
    name: 'Science',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-2.png`,
    instructionalVideos: ['science'],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
  {
    name: 'Literacy &<br/>Writing',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-3.png`,
    instructionalVideos: ['literacy', 'writing'],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
  {
    name: 'Math',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-4.png`,
    instructionalVideos: ['math'],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
  {
    name: 'Electives',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-5.png`,
    instructionalVideos: [],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
  {
    name: 'Character Development',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-6.png`,
    instructionalVideos: [],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
  {
    name: 'Computer<br/>Science',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-7.png`,
    instructionalVideos: ['computer-science'],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
  {
    name: 'History',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-8.png`,
    instructionalVideos: [],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
  {
    name: 'Parental<br/>Investment',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-9.png`,
    instructionalVideos: [],
    panorama: { image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`, route: '/mobile' },
    articles: [
      {
        slug: 'welcome-1',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        image: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: null
  },
]