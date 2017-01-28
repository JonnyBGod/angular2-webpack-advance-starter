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
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const AOT = helpers.hasNpmFlag('aot');

/**
 * Webpack Plugins
 */
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');


const METADATA = Object.assign({
  baseUrl: '',
  isDevServer: helpers.isWebpackDevServer()
}, customConfig.metadata);

let webpackConfig = webpackMerge.smart(simpleWebProdConfig({env: ENV}), commonAdvanceConfig({env: ENV}));

// remove the plugins to be overwriten.
helpers.removePlugins(webpackConfig.plugins, [
  DefinePlugin,
  HtmlWebpackPlugin,
  ngcWebpack.NgcWebpackPlugin
]);
// remove the rules to be overwriten.
helpers.removeRules(webpackConfig.module.rules, [/\.ts$/]);

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  isProd = ENV === 'production';

  return webpackMerge.smart(webpackConfig, {
    module: {
      rules: [
        /*
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          use: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            {
              loader: 'ng-router-loader',
              options: {
                loader: 'async-import',
                genDir: 'compiled',
                aot: AOT
              }
            },
            'awesome-typescript-loader?{configFileName: "tsconfig.desktop.json"}',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
      ]
    },

    plugins: [
      new NormalModuleReplacementPlugin(
        /routerModule/,
        helpers.root('src/app/app.routerModule.desktop.ts')
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('tsconfig.desktop.json'),
        resourceOverride: helpers.root('config/resource-override.js')
      }),

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
