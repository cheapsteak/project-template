const config = {
  local: {
    ASSET_PATH: '/middleschool',
    basePath: '/middleschool',
    gaID: 'UA-76397429-1'
  },
  preview: {
    ASSET_PATH: '/middleschool-preview',
    basePath: '/middleschool-preview',
    gaID: 'UA-76397429-1'
  },
  qa: {
    ASSET_PATH: '/middleschool-qa',
    basePath: '/middleschool-qa',
    gaID: 'UA-76397429-1'
  },
  production: {
    ASSET_PATH: '/middleschool',
    basePath: '/middleschool',
    gaID: 'UA-8528348-2'
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
