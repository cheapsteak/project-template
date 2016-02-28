global.CONFIG = require('../config.js');
global.ASSET_PATH = global.CONFIG.ASSET_PATH;
global.animate = require('gsap-promise');

// creates global Parallax
require('parallax/deploy/parallax');
