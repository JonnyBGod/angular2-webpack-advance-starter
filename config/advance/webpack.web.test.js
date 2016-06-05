/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebTestConfig = require('../webpack.test.js');
const customConfig = require('../custom/webpack.web.test.js');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge.smart(simpleWebTestConfig, commonAdvanceConfig, {

}, customConfig);
