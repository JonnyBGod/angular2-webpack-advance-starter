/**
 * @author: @JonnyBGod
 */

const helpers = require('./helpers');
const autoprefixer = require('autoprefixer');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const METADATA = {
  title: 'Angular2 Webpack Advance Starter',
  baseUrl: '/'
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
var webpackConfig = {

  /**
   * Merged metadata from webpack.common.js for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  resolve: {
    alias: {
      components: helpers.root('src/app/components'),
      frameworks: helpers.root('src/app/frameworks'),
      assets: helpers.root('src/assets')
    }
  },

  module: {

    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [
      {
        test: /\.css$/,
        loader: 'to-string!css-loader!postcss-loader'
      },

      {
        test: /\.scss$/,
        loader: 'to-string!css-loader!postcss-loader!sass-loader'
      },

      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' }
    ]

  },

  postcss: [autoprefixer],

  plugins: [

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'BASE_URL': JSON.stringify(METADATA.baseUrl),
      'RUN_DEMO': METADATA.runDemo
    })
  ],

  /*externals: [
    (function () {
      var IGNORES = [
        'electron', 'electron-debug'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]*/

};

module.exports = webpackConfig;
