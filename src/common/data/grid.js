import config from '../../../config.js';
import _ from 'lodash';

const data = {
  welcome: {
    title: 'welcome',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/welcome',
    instructionalVideoUrl: null
  },
  science: {
    title: 'science',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/science',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  literacy: {
    title: 'literacy & writing',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/literacy-and-writing',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  math: {
    title: 'math',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/math',
    instructionalVideoUrl: null
  },
  electives: {
    title: 'electives',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/electives',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  computer: {
    title: 'computer science',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/computer-science',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  investment: {
    title: 'parental investment',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/parental-investment',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  development: {
    title: 'character development',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/character-development',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: null
  },
  history: {
    title: 'history',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterUrl: 'chapters/history',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  }
};

export default {
  getDataByChapterId(id) {
    return data[id];
  },

  getImagesUrls() {
    const images = _.mapValues(data, 'image');
    return _.values(images);
  }
};
