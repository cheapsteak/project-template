const uri = '/middleschool';

const config = {
  basePath: uri,
  local: {
    ASSET_PATH: uri,
    gaID: ''
  },
  production: {
    ASSET_PATH: uri,
    gaID: ''
  },
  env: process.env.NODE_ENV,
  get ASSET_PATH() {
    return this[process.env.NODE_ENV || 'local'].ASSET_PATH;
  },
  get gaID() {
    return this[process.env.NODE_ENV || 'local'].gaID;
  }
};

module.exports = config;
