# 奇货官网（PC & 手机）

## 安装和开发

``` bash
# 安装依赖（建议使用cnpm）
npm install

# 开发模式 localhost:7070
npm run dev

# 构建
npm run build
（预发环境&生成环境）需要手动修改 config/index.js

## 静态资源路径设置
config.build.assetsPublicPath

## png图片管理
tinypng压缩后，10kb以内的图片放入src/assets/images，通过调用common/less/tool.less中的.base64()方法引用
经过url-loader处理后，会自动生成base64
```

## 配置Mock

`mock`数据在`routes/page.js`中新增一个配置，分为`post`和`get`等类型，其中`key`为对应的请求地址，`value`为本地mock数据，然后在`mock`目录中配置对应的`json`文件，例如：

```
module.exports = {
  post: {
    '/developer/doCreate': '/addapp/index.json',
    '/developer/index': '/addapp/doCreate.json'
  },
  get: {

  }
};
```

## 增加entry

`webpack`的`entry`统一放在了`config/entry`中配置，然后由`utils.computeEntry`和`utils.computeHtmlWebpackPlugin`计算所需的配置，从而减少代码冗余以及每次新增`entry`时都要改好几处的问题。

