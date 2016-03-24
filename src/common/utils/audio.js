import Howl from 'howler';
import _ from 'lodash';
import manifest from '../data/sounds';

var soundMap;

export default {
  init() {
    const howls = _.map(manifest, function (val) {
      const urls = Array.isArray(val) ? val : [val];
      return new Howl.Howl({urls});
    });
    soundMap = _.zipObject(Object.keys(manifest), howls);
  },
  play(id) {
    soundMap[id].play();
  }
};
