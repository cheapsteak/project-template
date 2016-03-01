'use strict';
require('babel-polyfill');
require('./globals.js');
import stats from 'common/utils/stats';

import { render } from 'react-dom';
import domready from 'domready';
import router from './router.jsx';
import fastclick from 'fastclick';

ga('create', global.CONFIG.gaID, 'auto');

domready(function () {
  fastclick(document.body);
  render(router, document.getElementById('container'));
});
