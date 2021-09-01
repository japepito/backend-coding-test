const createRide = require('./create-ride');
const getRides = require('./get-rides');
const getRide = require('./get-ride');

module.exports = {
  paths: {
    '/rides': {
      ...getRides,
      ...createRide,
    },
    '/rides/{id}': {
      ...getRide,
    },
  },
};
