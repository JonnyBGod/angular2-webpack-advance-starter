/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebProdConfig = require('../webpack.prod.js');
const customConfig = require('../custom/webpack.web.prod.js');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

const METADATA = {
  baseUrl: ''
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge.smart(simpleWebProdConfig, commonAdvanceConfig, {
	metadata: METADATA,

  plugins: [
   new DefinePlugin({
   	'BASE_URL': JSON.stringify(METADATA.baseUrl),
    'TARGET_DESKTOP': true,
    'TARGET_DESKTOP_BUILD': true
  })
  ]
}, customConfig);
