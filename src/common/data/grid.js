const data = {
  welcome: {
    title: 'welcome',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: true
  },
  science: {
    title: 'science',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: false
  },
  literacy: {
    title: 'literacy & writing',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: true
  },
  math: {
    title: 'math',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: false
  },
  electives: {
    title: 'electives',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: true
  },
  computer: {
    title: 'computer science',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: true
  },
  investment: {
    title: 'parental investment',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: false
  },
  development: {
    title: 'character development',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: true
  },
  history: {
    title: 'history',
    subtitle: 'chapter',
    image: '../images/kid-test.png',
    hasInstructionalVideo: false
  }
};

export default (() => {
  const getDataByChapterId = (id) => {
    return data[id];
  };

  return {getDataByChapterId}
})();
