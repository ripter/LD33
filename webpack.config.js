/*global module */
module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
      , { test: /\.mustache$/, loader: 'mustache'}
    ]
  }
};
