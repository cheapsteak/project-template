import config from '../../../config.js';
import _ from 'lodash';

const data = {
  welcome: {
    title: 'welcome',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/welcome',
    instructionalVideoRoute: null
  },
  science: {
    title: 'science',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/science',
    instructionalVideoRoute: 'tests/instructional-grid-player'
  },
  literacy: {
    title: 'literacy & writing',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/literacy-and-writing',
    instructionalVideoRoute: 'tests/instructional-grid-player'
  },
  math: {
    title: 'math',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/math',
    instructionalVideoRoute: null
  },
  electives: {
    title: 'electives',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/electives',
    instructionalVideoRoute: 'tests/instructional-grid-player'
  },
  computer: {
    title: 'computer science',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/computer-science',
    instructionalVideoRoute: 'tests/instructional-grid-player'
  },
  investment: {
    title: 'parental investment',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/parental-investment',
    instructionalVideoRoute: 'tests/instructional-grid-player'
  },
  development: {
    title: 'character development',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/character-development',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoRoute: null
  },
  history: {
    title: 'history',
    subtitle: 'chapter',
    image: `${config.ASSET_PATH}/images/kid-test.png`,
    chapterRoute: 'chapters/history',
    instructionalVideoRoute: 'tests/instructional-grid-player'
  }
};

export default {
  getDataByChapterId(id) {
    return data[id];
  },

  getImages() {
    const images = _.mapValues(data, 'image');
    return _.values(images);
  }
};
