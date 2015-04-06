'use strict';

var utils = require('./_utils');

module.exports = function() {

  var promise = utils.exec(
      './node_modules/.bin/eslint',
      [
        'tasks',
        'src',
        'test'
    ]);

  return promise;
};
