const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = resolve(__dirname, 'src');

const DEST = resolve(__dirname, 'public');

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
    devtools: resolve(SRC, 'devtools', 'index.js'),
    panel: resolve(SRC, 'panel', 'index.js'),
    background: resolve(SRC, 'background', 'index.js'),
  },

  output: {
    path: DEST,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      chunks: ['devtools'],
    }),
    new HtmlWebpackPlugin({
      filename: 'panel.html',
      chunks: ['panel'],
    }),
  ],
};
