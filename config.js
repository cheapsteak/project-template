const config = {
  local: {
    ASSET_PATH: '/middleschool',
    basePath: '/middleschool',
    gaID: ''
  },
  preview: {
    ASSET_PATH: '/middleschool-preview',
    basePath: '/middleschool-preview',
    gaID: ''
  },
  production: {
    ASSET_PATH: '/middleschool',
    basePath: '/middleschool',
    gaID: ''
  },
  env: process.env.NODE_ENV,
  get ASSET_PATH() {
    return this[this.env || 'local'].ASSET_PATH;
  },
  get basePath() {
    return this[this.env || 'local'].basePath;
  },
  get gaID() {
    return this[this.env || 'local'].gaID;
  }
};

module.exports = config;
