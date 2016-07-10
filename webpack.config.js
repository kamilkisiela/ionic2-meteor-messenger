var camelCase = require('lodash.camelcase');
var upperFirst = require('lodash.upperfirst');

module.exports = {
  entry: [
    './app/app.js'
  ],
  output: {
    path: __dirname + '/www/build/js',
    filename: 'app.bundle.js'
  },
  externals: [
    'cordova',
    resolveExternals
  ],
  target: 'web',
  devtool: 'source-map',
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy', 'add-module-exports']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|www)/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js']
  }
};

function resolveExternals(context, request, callback) {
  return cordovaPlugin(request, callback) ||
         callback();
}

function cordovaPlugin(request, callback) {
  var match = request.match(/^cordova\/(.+)$/);
  var plugin = match && match[1];

  if (plugin) {
    plugin = camelCase(plugin);
    plugin = upperFirst(plugin);
    callback(null, 'window.cordova && cordova.plugins && cordova.plugins.' + plugin);
    return true;
  }
}