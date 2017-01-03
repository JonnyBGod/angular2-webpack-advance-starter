/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebDevConfig = require('../webpack.dev.js');
const customConfig = require('../custom/webpack.web.dev.js');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

let webpackConfig = simpleWebDevConfig({env: ENV});
// remove the instance of HtmlWebpackPlugin.
helpers.removeHtmlWebpackPlugin(webpackConfig.plugins);

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
	return webpackMerge.smart(webpackConfig, commonAdvanceConfig({env: ENV}), {

	}, customConfig({env: ENV}));
}