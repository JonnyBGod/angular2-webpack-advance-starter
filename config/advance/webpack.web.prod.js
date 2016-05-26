/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebProdConfig = require('../webpack.prod.js');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge.smart(simpleWebProdConfig, commonAdvanceConfig, {
	
});
