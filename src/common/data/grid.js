const data = {
  welcome: {
    title: 'welcome',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  science: {
    title: 'science',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  literacy: {
    title: 'literacy & writing',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  math: {
    title: 'math',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  electives: {
    title: 'electives',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  computer: {
    title: 'computer science',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  investment: {
    title: 'parental investment',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  development: {
    title: 'character development',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  },
  history: {
    title: 'history',
    subtitle: 'chapter',
    image: '../images/kid-test.png'
  }
};

export default (() => {
  const getDataByChapterId = (id) => {
    return data[id];
  };

  return {getDataByChapterId}
})();
