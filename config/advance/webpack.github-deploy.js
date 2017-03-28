/**
 * @author: @AngularClass
 */
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');
const ghDeploy = require('../github-deploy');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

/**
 * Webpack Plugins
 */
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

/**
 * Webpack Constants
 */
const GIT_REMOTE_NAME = 'origin';
const COMMIT_MESSAGE = 'Updates';
const GH_REPO_NAME = ghDeploy.getRepoName(GIT_REMOTE_NAME);
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const AOT = helpers.hasNpmFlag('aot');

module.exports = function (options) {
  isProd = ENV === 'production';

  const webpackConfigFactory = ghDeploy.getWebpackConfigModule(options); // the settings that are common to prod and dev
  const webpackConfig = webpackConfigFactory(options);
  const METADATA = Object.assign({
    baseUrl: '/' + GH_REPO_NAME + '/',
    isDevServer: helpers.isWebpackDevServer()
  }, require('../custom/webpack.common.js').metadata);

  // remove the plugins to be overwriten.
  helpers.removePlugins(webpackConfig.plugins, [
    HtmlWebpackPlugin,
    ngcWebpack.NgcWebpackPlugin
  ]);
  // remove the rules to be overwriten.
  helpers.removeRules(webpackConfig.module.rules, [/\.ts$/]);

  for (var i = 0; i < webpackConfig.module.rules.length; i++) {
    if (webpackConfig.module.rules[i].test.toString() === /\.html$/.toString()) {
      webpackConfig.module.rules[i].exclude.push(helpers.root('src/assets/404.html'));
    }
  }

  return webpackMerge(webpackConfig, {
    output: {
     /**
      * The public path is set to the REPO name.
      *
      * `HtmlElementsPlugin` will add it to all resources url's created by it.
      * `HtmlWebpackPlugin` will add it to all webpack bundels/chunks.
      *
      * In theory publicPath shouldn't be used since the browser should automatically prefix the
      * `baseUrl` into all URLs, however this is not the case when the URL is absolute (start with /)
      *
      * It's important to prefix & suffix the repo name with a slash (/).
      * Prefixing so every resource will be absolute (otherwise it will be url.com/repoName/repoName...
      * Suffixing since chunks will not do it automatically (testes against about page)
      */
      publicPath: '/' + GH_REPO_NAME + '/' + ghDeploy.safeUrl(webpackConfig.output.publicPath)
    },

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
        }
      ]
    },

    plugins: [
      new NormalModuleReplacementPlugin(
        /routerModule/,
        helpers.root('src/app/app.routerModule.desktop.ts')
      ),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),

      new HtmlWebpackPlugin({
        template: 'src/assets/404.html',
        filename: '404.html',
        title: METADATA.title,
        metadata: {
          GH_REPO_NAME: GH_REPO_NAME || ''
        },
        inject: false
      }),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('tsconfig.desktop.json'),
        resourceOverride: helpers.root('config/resource-override.js')
      }),

      function() {
        this.plugin('done', function(stats) {
          if (stats.compilation.errors.length > 0) return;

          console.log('Starting deployment to GitHub.');

          const logger = function (msg) {
            console.log(msg);
          };

          const options = {
            logger: logger,
            remote: GIT_REMOTE_NAME,
            message: COMMIT_MESSAGE,
            dotfiles: true // for .nojekyll
          };

          // Since GitHub moved to Jekyll 3.3, their server ignores the "node_modules" and "vendors" folder by default.
          // but, as of now, it also ignores "vendors*" files.
          // This means vendor.bundle.js or vendor.[chunk].bundle.js will return 404.
          // this is the fix for now.
          fs.writeFileSync(path.join(webpackConfig.output.path, '.nojekyll'), '');

          require('gh-pages').publish(webpackConfig.output.path, options, function(err) {
            if (err) {
              console.log('GitHub deployment done. STATUS: ERROR.');
              throw err;
            } else {
              console.log('GitHub deployment done. STATUS: SUCCESS.');
            }
          });
        });
      }
    ]
  });
};
