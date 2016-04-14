global.CONFIG = require('../config.js');
global.ASSET_PATH = global.CONFIG.ASSET_PATH;

global.BezierEasing = require('bezier-easing');
global.audio = require('common/utils/audio');
global.ViniEaseOut = new Ease(BezierEasing(0.14, 0.25, 0.4, 0.99).get);
global.SereneEaseInOut = new Ease(BezierEasing(.62, .12, 0, .92).get);
