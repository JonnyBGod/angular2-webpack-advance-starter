/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebDevConfig = require('../webpack.dev.js');
const customConfig = require('../custom/webpack.web.dev.js');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge.smart(simpleWebDevConfig, commonAdvanceConfig, {

}, customConfig);
