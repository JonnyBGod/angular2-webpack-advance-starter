/**
 * @author: @AngularClass
 */
var path = require('path');
const EVENT = process.env.npm_lifecycle_event || '';

// Helper functions
var ROOT = path.resolve(__dirname, '../..');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

function removePlugins(plugins, test) {
  for (var i = 0; i < plugins.length; i++) {
    if (test.filter(function(t) { return plugins[i] instanceof t;}).length > 0) {
      plugins.splice(i, 1);
      return;
    }
  }
}

function removeRules(rules, test) {
  for (var i = 0; i < rules.length; i++) {
    if (test.filter(function(t) { return t.toString() === rules[i].test.toString();}).length > 0) {
      rules.splice(i, 1);
      return;
    }
  }
}

exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.checkNodeImport = checkNodeImport;
exports.removePlugins = removePlugins;
exports.removeRules = removeRules;
