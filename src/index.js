'use strict';
require('babel-polyfill');
require('./globals.js');
require( './app.jsx' );

ga('create', global.CONFIG.gaID, 'auto');
