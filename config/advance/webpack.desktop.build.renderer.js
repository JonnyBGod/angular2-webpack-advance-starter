/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonAdvanceConfig = require('./webpack.common.web.js');
const simpleWebProdConfig = require('../webpack.prod.js');
const customCommonConfig = require('../custom/webpack.common.js');
const customConfig = require('../custom/webpack.web.prod.js');

/**
 * Webpack Constants
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

/**
 * Webpack Plugins
 */
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');


const METADATA = Object.assign({
  baseUrl: '',
  isDevServer: helpers.isWebpackDevServer()
}, customConfig.metadata);

let webpackConfig = webpackMerge.smart(simpleWebProdConfig({env: ENV}), commonAdvanceConfig({env: ENV}));
// remove the instance of HtmlWebpackPlugin.
helpers.removeHtmlWebpackPlugin(webpackConfig.plugins);

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  return webpackMerge.smart(webpackConfig, {
    plugins: [
      new NormalModuleReplacementPlugin(
        /routerModule/,
        helpers.root('src/app/app.routerModule.desktop.ts')
      ),

      new DefinePlugin({
        'BASE_URL': METADATA.baseUrl,
        'TARGET_DESKTOP': true,
        'TARGET_DESKTOP_BUILD': true
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),
    ]
  }, customConfig({env: ENV}));
}
