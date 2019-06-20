### 使用 Node.js 搭建用户界面

#### 使用 webpack 进行打包

_webpack 是一个打包工具,它将所有的前端代码和依赖代码一起打包进目标文件里_

- 安装 webpack&webpack-dev-server

```bash
$ npm install --save-dev --save-exact webpack-dev-server@2.9.1
$ npm install --save-dev --save-exact webpack@3.6.0
```

- 创建 webpack 配置文件

```js
"use strict";
// 配置入口文件
nodule.exports = {
  entry: "./entry.js"
};
```

- 生成 webpack bundle

```bash
$ npm install --save-dev --save-exact html-webpack-plugin@2.30.1
```

- 修改配置

```js
const path = require("path");
// 通过内置的path模块获取到dist文件夹的路径
const distDir = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./entry.js",
  // 声明打包后的文件存储路径和名称
  output: {
    filename: "bundle.js",
    path: distDir
  },
  devServer: {
    contentBase: distDir,
    port: 60800
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "html builder"
    })
  ]
};
```

#### 编写前台页面

安装

```bash
$ npm install --save-dev --save-exact style-loader@0.19.0 css-loader@0.28.7 url-loader@0.6.2 file-loader@1.1.5
```

webpack.config.js 配置中添加

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)/,
      loader: "url-loader?limit=100000"
    }
  ];
}
```

安装 bootstrap&juqery 实现 js 功能

```bash
$ npm install --save-dev --save-exact bpptstrap@3.3.7 jquery@3.2.1
```

webpack.config.js 配置中添加

```js
plugins: [
    // 该配置会将 $ 和 jQuery以全局变量注入到代码中
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
```

entry.js 配置添加

```js
import "bootstrap";
```
