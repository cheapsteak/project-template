'use strict';
require('babel-polyfill');
require('./globals.js');
import Stats from 'common/utils/stats';

import { render } from 'react-dom';
import domready from 'domready';
import router from './router.jsx';

ga('create', global.CONFIG.gaID, 'auto');

domready(function () {
  render(router, document.getElementById('container'));
})
