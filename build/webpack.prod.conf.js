var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var entryConfig = require('../config/entry')
var h5entryConfig = require('../config/h5entry')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    
    // new ExtractTextPlugin("[name].css"),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   // template: path.resolve(PAGE_PATH, 'index.html'),
    //   template: resolve('src/pages/index.html'),
    //   chunks: ['index', 'vendor', 'manifest'],
    //   inject: true,
    //   minify: {
    //     // removeComments: true,
    //     // collapseWhitespace: true,
    //     // removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },

    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),

    // 打包公用模块
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module, count) {
    //     // 所有被引用的node_modules中的模块，打包到vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor', 'h5vendor', 'manifest']
    // }),
    
    // pc 公共文件提取
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 注意不要.js后缀
      chunks: utils.computeChunks(entryConfig, '')
    }),

    // 避免修改业务代码导致vendor的md5改变，保留文件缓存
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // h5 公共文件提取
    new webpack.optimize.CommonsChunkPlugin({
      name: 'h5vendor', // 注意不要.js后缀
      chunks: utils.computeChunks(h5entryConfig, 'h5-')
    }),

    // 避免修改业务代码导致vendor的md5改变，保留文件缓存
    new webpack.optimize.CommonsChunkPlugin({
      name: 'h5manifest',
      chunks: ['h5vendor']
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ].concat(utils.computeHtmlWebpackPlugin(entryConfig, h5entryConfig))
})

module.exports = webpackConfig
