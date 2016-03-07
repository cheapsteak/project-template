const data = {
  welcome: {
    title: 'welcome',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  science: {
    title: 'science',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  literacy: {
    title: 'literacy & writing',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  math: {
    title: 'math',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  electives: {
    title: 'electives',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  computer: {
    title: 'computer science',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  investment: {
    title: 'parental investment',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  development: {
    title: 'character development',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  },
  history: {
    title: 'history',
    subtitle: 'chapter',
    image: '../images/test-kid.png'
  }
};

export default (() => {
  const getDataByChapterId = (id) => {
    return data[id];
  };

  return {getDataByChapterId}
})();
