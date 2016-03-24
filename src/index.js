'use strict';
require('babel-polyfill');
require('./globals.js');
//import stats from 'common/utils/stats';
import detect from 'common/utils/detect';

import { render } from 'react-dom';
import domready from 'domready';
import router from './router.jsx';
import fastclick from 'fastclick';

ga('create', global.CONFIG.gaID, 'auto');

domready(function () {
  var page = document.getElementsByTagName('html')[0];
  page.setAttribute('class', detect.className);

  audio.init();

  fastclick(document.body);
  render(router, document.getElementById('container'));
});
