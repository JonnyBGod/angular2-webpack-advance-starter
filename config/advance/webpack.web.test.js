/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebTestConfig = require('../webpack.test.js');
const customConfig = require('../custom/webpack.web.test.js');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  return webpackMerge.smart(simpleWebTestConfig({env: ENV}), commonAdvanceConfig({env: ENV}), {
		module: {
	    loaders: [
	      {
	        test: /\.ts$/,
	        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
	        exclude: [/\.e2e\.ts$/]
	      }
	    ]
	  }
	}, customConfig({env: ENV}));
}
