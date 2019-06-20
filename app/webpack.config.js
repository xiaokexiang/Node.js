"use strict";
// 配置入口文件

const path = require("path");
// 通过内置的path模块获取到dist文件夹的路径
const distDir = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

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
    }),
    // 该配置会将 $ 和 jQuery以全局变量注入到代码中
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
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
    ]
  }
};
