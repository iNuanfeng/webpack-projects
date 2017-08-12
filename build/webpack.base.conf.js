var path = require('path')
var utils = require('./utils')
var config = require('../config')
var entryConfig = require('../config/entry')
var h5entryConfig = require('../config/h5entry')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 定义了一些文件夹的路径
// var ROOT_PATH = path.resolve(__dirname)
// var APP_PATH = path.resolve(ROOT_PATH, '../src')

module.exports = {
  // 项目的文件夹
  entry: utils.computeEntry(entryConfig, h5entryConfig),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@h5': resolve('h5'),
      '@unit': resolve('unit')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          // 'eslint-loader',
          'babel-loader'
        ],
        include: [resolve('src'), resolve('h5/src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
