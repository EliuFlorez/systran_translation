'use strict';
module.exports = function(app) {
  var translate = require('../controllers/translateController');

  app.route('/translate')
    .get(translate.translateText);
};