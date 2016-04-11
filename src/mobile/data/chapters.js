import config from '../../../config.js';

export default [
  {
    name: 'Welcome',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-1.png`,
    scholar: 'Arianne',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: ['welcome'],
    photoEssay: undefined,
    panoramas: [
      {
        slug: 'science',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`,
      },
      {
        slug: 'literacy-and-writing',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`,
      },
      {
        slug: 'math',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`,
      },
      {
        slug: 'hallway',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-2.jpg`,
      }
    ],
    articles: [
      {
        slug: 'welcome-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'welcome-2',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-4.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1'
    }
  },
  {
    name: 'Science',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-2.png`,
    scholar: 'Idrissa',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: ['science'],
    photoEssay: {
      slug: 'science-1',
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
    },
    panoramas: [],
    articles: [
      {
        slug: 'science-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      }
    ],
    podcast: undefined
  },
  {
    name: 'Literacy &<br/>Writing',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-3.png`,
    scholar: 'Sela',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: ['literacy', 'writing'],
    photoEssay: undefined,
    panoramas: [],
    articles: [
      {
        slug: 'literacy-and-writing-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      }
    ],
    podcast: undefined
  },
  {
    name: 'Math',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-4.png`,
    scholar: 'Quinlan',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: ['math'],
    photoEssay: undefined,
    panoramas: [],
    articles: [
      {
        slug: 'math-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'math-2',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'math-3',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      }
    ],
    podcast: undefined
  },
  {
    name: 'Electives',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-5.png`,
    scholar: 'Morgan and William',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: [],
    photoEssay: undefined,
    panoramas: [],
    articles: [
      {
        slug: 'electives-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      }
    ],
    podcast: undefined
  },
  {
    name: 'Character Development',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-6.png`,
    scholar: 'Lianne',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: [],
    photoEssay: {
      slug: 'character-development-1',
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
    },
    panoramas: [],
    articles: [
      {
        slug: 'character-development-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      }
    ],
    podcast: undefined
  },
  {
    name: 'Computer<br/>Science',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-7.png`,
    scholar: 'Raquel',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: ['computer-science'],
    photoEssay: {
      slug: 'computer-science-1',
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
    },
    panoramas: [],
    articles: [],
    podcast: undefined
  },
  {
    name: 'History',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-8.png`,
    scholar: 'Frankie',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: [],
    photoEssay: {
      slug: 'history-1',
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
    },
    panoramas: [],
    articles: [
      {
        slug: 'history-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
      {
        slug: 'history-2',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      },
    ],
    podcast: undefined
  },
  {
    name: 'Parental<br/>Investment',
    image: `${config.ASSET_PATH}/images/mobile-chapters-kid-9.png`,
    scholar: 'Alexander',
    narrativeVideo: {
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-1.jpg`,
      src: 'https://player.vimeo.com/external/160156123.hd.mp4?s=3a124481f349bd0b62a5731ea4ad1166caf5dd40&profile_id=119&a=1',
      duration: '10:13'
    },
    instructionalVideos: [],
    photoEssay: {
      slug: 'parental-investment-1',
      iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
    },
    panoramas: [],
    articles: [
      {
        slug: 'parental-investment-1',
        iconImage: `${config.ASSET_PATH}/images/mobile-list-thumbnail-3.jpg`,
      }
    ],
    podcast: undefined
  },
];