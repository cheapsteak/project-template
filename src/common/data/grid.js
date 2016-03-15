const data = {
  welcome: {
    title: 'welcome',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: null
  },
  science: {
    title: 'science',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  literacy: {
    title: 'literacy & writing',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  math: {
    title: 'math',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: null
  },
  electives: {
    title: 'electives',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  computer: {
    title: 'computer science',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  investment: {
    title: 'parental investment',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  },
  development: {
    title: 'character development',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: null
  },
  history: {
    title: 'history',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests/instructional-grid-player'
  }
};

export default (() => {
  const getDataByChapterId = (id) => {
    return data[id];
  };

  return {getDataByChapterId}
})();
