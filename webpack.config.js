/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/advance/webpack.web.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/advance/webpack.web.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/advance/webpack.web.dev');
}
