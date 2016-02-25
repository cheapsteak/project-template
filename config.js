module.exports = {
  basePath: '/middleschool',
  local: {
    ASSET_PATH: '/',
    gaID: ''
  },
  production: {
    ASSET_PATH: '/',
    gaID: ''
  },
  get env () {
    return process.env.NODE_ENV;
  },
  get ASSET_PATH () {
    return this[process.env.NODE_ENV || 'local'].ASSET_PATH;
  },
  get gaID () {
    return this[process.env.NODE_ENV || 'local'].gaID;
  },
};
