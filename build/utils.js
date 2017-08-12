let path = require('path')
let config = require('../config')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// less加载
exports.styleLoaders = function (options) {
  if (options.extract) {
    return [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader!postcss-loader!less-loader"
      })
    }]
  } else {
    return [{
      test: /\.less$/,
      loader: "style-loader!css-loader!postcss-loader!less-loader"
    }]
  }
}

/**
 * [description]
 * @param  {Array} entryConfig 入口配置数组
 * @param  {String} pre         前缀名：如'h5-'
 * @return {Array}             Chunks数组
 */
exports.computeChunks = function(entryConfig, pre = '') {
  entryConfig = entryConfig || []
  let chunks = []

  for (let i = 0; i < entryConfig.length; i++) {
    let pathBuild = entryConfig[i].path.replace(/\//g, '-');
    chunks.push(pre + pathBuild + entryConfig[i].name)
  }

  return chunks
}

exports.computeEntry = function (entry, h5entry) {
  entry = entry || []
  let result = {}

  for (let i = 0; i < entry.length; i++) {
    let item = entry[i]
    let path = item.path
    let name = item.name
    let pathBuild = path.replace(/\//g, '-');
    result[pathBuild + name] = './src/js/' + path + name + '.js'
  }

  for (let i = 0; i < h5entry.length; i++) {
    let item = h5entry[i]
    let path = item.path
    let name = item.name
    let pathBuild = path.replace(/\//g, '-');
    result['h5-' + pathBuild + name] = './h5/src/js/' + path + name + '.js'
  }

  Object.assign(result, {
    vendor: 'jquery',
    h5vendor: '@h5/src/js/h5base'
  })

  return result
}

exports.computeHtmlWebpackPlugin = function (entry, h5entry) {
  entry = entry || []
  let result = []

  for (let i = 0; i < entry.length; i++) {
    let item = entry[i]
    let path = item.path
    let name = item.name
    let pathBuild = path.replace(/\//g, '-');
    let template = item.template
    result.push(
      new HtmlWebpackPlugin({
        filename: path + name + '.html',
        template: template,
        inject: true,
        chunks: [pathBuild + name, 'vendor', 'manifest']
      })
    )
  }

  for (let i = 0; i < h5entry.length; i++) {
    let item = h5entry[i]
    let path = item.path
    let name = item.name
    let pathBuild = path.replace(/\//g, '-');
    let template = item.template
    result.push(
      new HtmlWebpackPlugin({
        filename: 'h5/' + path + name + '.html',
        template: 'h5/' + template,
        inject: true,
        chunks: ['h5-' + pathBuild + name, 'h5vendor', 'h5manifest']
      })
    )
  }

  return result
}
