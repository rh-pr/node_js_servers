'use strict';

const path = require ('path');

module.exports = {
  photo: {
    height: 200,
    maxSize: 1024 * 1024,
    pathToDir: path.join (__dirname, '../../static/images/profiles'),
    width: 200,
  },
};
