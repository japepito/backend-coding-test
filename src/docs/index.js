const basicInfo = require('./basic-info');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const rides = require('./rides');

module.exports = {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  ...rides,
};
