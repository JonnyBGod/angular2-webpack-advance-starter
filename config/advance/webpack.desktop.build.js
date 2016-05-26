/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.desktop.js');
const simpleWebProdConfig = require('../webpack.prod.js');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(simpleWebProdConfig, commonAdvanceConfig, {

  entry: {
    'main.desktop': './src/main.desktop.ts'
  },

  output: {
    path: helpers.root('dist_desktop')
  },

	plugins: [

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having production builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'TARGET_DESKTOP_BUILD': true,
      'process.env': {
        'TARGET_DESKTOP_BUILD': true,
      }
    })
  ],

  node: {
    __dirname: false,
    __filename: false,
  }
});
