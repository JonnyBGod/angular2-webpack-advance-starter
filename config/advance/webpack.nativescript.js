/**
 * @author: @JonnyBGod
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const helpers = require('./helpers');
const autoprefixer = require('autoprefixer');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const customConfig = require('../custom/webpack.nativescript.js');

module.exports = webpackMerge.smart({
  entry: {
    app: helpers.root('nativescript/app/app.ts')
  },
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.tns.ts', '.ts', '.tns.js', '.js'],

    alias: {
      // legacy imports pre-rc releases
      angular2: helpers.root('node_modules/@angularclass/angular2-beta-to-rc-alias/dist/beta-17'),
      components: helpers.root('src/app/components'),
      frameworks: helpers.root('src/app/frameworks'),
      assets: helpers.root('src/assets')
    }

  },

  resolveLoader: {
    root: helpers.root('node_modules')
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        loader: 'to-string!css-loader!postcss-loader'
      },
      {
        test: /\.scss$/,
        loader: 'to-string!css-loader!postcss-loader!sass-loader'
      },

      {test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000'}
    ]
  },

  postcss: [autoprefixer],

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.html$/, function(result) {
      result.request = result.request.replace('.html', '.tns.html');
    }),

    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),

    /*
     * Plugin: OccurenceOrderPlugin
     * Description: Varies the distribution of the ids to get the smallest id length
     * for often used ids.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
     * See: https://github.com/webpack/docs/wiki/optimization#minimize
     */
    new webpack.optimize.OccurenceOrderPlugin(true)

  ]
}, customConfig);
