const data = {
  welcome: {
    title: 'welcome',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  science: {
    title: 'science',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  literacy: {
    title: 'literacy & writing',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  math: {
    title: 'math',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  electives: {
    title: 'electives',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  computer: {
    title: 'computer science',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  investment: {
    title: 'parental investment',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  development: {
    title: 'character development',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  },
  history: {
    title: 'history',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    chapterUrl: 'tests/chapter',
    narrativeVideoUrl: 'tests/narrative-video-player',
    instructionalVideoUrl: 'tests'
  }
};

export default (() => {
  const getDataByChapterId = (id) => {
    return data[id];
  };

  return {getDataByChapterId}
})();
