/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const HtmlElementsPlugin = require('../html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebTestConfig = require('../webpack.test.js');
const customConfig = require('../custom/webpack.web.test.js');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

let webpackConfig = simpleWebTestConfig({env: ENV});
// remove the instance of HtmlWebpackPlugin.
helpers.removePlugins(webpackConfig.plugins, [HtmlWebpackPlugin]);

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  return webpackMerge.smart(webpackConfig, commonAdvanceConfig({env: ENV}), {

    plugins: [
      /*
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      /*
       * Plugin: HtmlElementsPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: require('../head-config.common')
      }),
    ]

  }, customConfig({env: ENV}));
}
