module.exports = (function() {
  'use strict';
  var path = require('path');
  var webpack = require('webpack');

  var BUILD_DIR = path.resolve(__dirname, 'build');
  var APP_DIR = path.resolve(__dirname, 'src');

  var HTMLWebpackPlugin = require('html-webpack-plugin');

  var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        test: /\.(png|jpeg|gif|jpg)$/,
        loader: 'file-loader?&name=assets/retina_images/[name].[ext]'
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap'
      }]
    },
    plugins: [new HTMLWebpackPlugin({
      template: APP_DIR + '/assets/app.html',
      inject: 'body'
    })],
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true
    },
  }

  return config;
})();
