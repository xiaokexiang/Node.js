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

修改配置

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

#### 基于 bootstrap 的 css&js 的使用

- 安装

```bash
$ npm install --save-dev --save-exact style-loader@0.19.0 css-loader@0.28.7 url-loader@0.6.2 file-loader@1.1.5
```

- webpack.config.js 配置中添加

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

- 安装 bootstrap&juqery 实现 js 功能

```bash
$ npm install --save-dev --save-exact bpptstrap@3.3.7 jquery@3.2.1
```

- webpack.config.js 配置中添加

```js
plugins: [
    // 该配置会将 $ 和 jQuery以全局变量注入到代码中
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
```

- entry.js 配置添加

```js
import "bootstrap";
```

#### 使用 TypeScript 进行转译

- 安装

```bash
$ npm install --save-dev --save-exact typescript@2.5.3 ts-loader@2.3.7

```

- 创建 tsconfig.json 实现 ts 转成 js

```json
{
  "compilerOptions": {
    // 存放转换好的js文件的目录
    "outDir": "./dist/",
    // 为转换好的文件生成sourceMap
    "sourceMap": true,
    // 指定哪个模块系统处理依赖
    "module": "CommonJS",
    // 转换后文件的es版本
    "target": "es5",
    // 指定ts需要使用的内置类型
    "lib": ["dom", "es2015.promise", "es5"],
    // 指定ts是否需要对.js进行编译
    "allowJs": true,
    // 是否使用严苛模式
    "alwaysStrict": true
  }
}
```

- webpack.config.js 添加配置

```js
rules: [
  {
    test: /\.ts$/,
    use: "ts-loader"
  }
];
```

- 新建 app 目录&目录下新建 templates.ts

```js
export const main = `
<div class="container">
    <h1>App Design By Bootstrap</h1>
    <div class="alerts"></div>
    <div class="mains"></div>
</div>`;

export const welcome = `
<div class="alert alert-success">
        <button class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <h1>Welcome!</h1>
        <p>B4 is an application for creating book bundles</p>
</div>`;

export const alert = `
<div class="alert alert-success alert-dismissible fade in " role="alert">
    <button class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Success!</strong>Bootstrap is working!
</div>
`;
```

- app 目录下新建 index.ts

_如果出现: 导入路径不能以“.ts”扩展名结束提示,安装 Deno 插件_

```js
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import * as templates from "./templates.ts";

document.body.innerHTML = templates.main;

const mainElement = document.body.querySelector(".mains");
const alertElement = document.body.querySelector(".alerts");

mainElement.innerHTML = templates.welcome;
alertElement.innerHTML = templates.alert;
```

- 修改 entry.js 入口文件

```js
entry: "./app/index.ts",
```

执行`npm start`,访问 localhost:60800,如页面正确显示即为成功!

#### Hadnlebars 处理模板

- 安装

```bash
$ npm install --save-dev --save-exact handlebars@4.0.10
```

- 导入 Handlebars 并修改代码

```js
import * as Handlebars from "../node_modules/handlebars/dist/handlebars.js";

export const main = Handlebars.compile(`
<div class="container">
    <h1>App Design By Bootstrap</h1>
    <div class="alerts"></div>
    <div class="mains"></div>
</div>`);
```

- 模板调用代码修改

```js
// 变成函数调用的方式
alertElement.innerHTML = templates.alert({
  type: "info",
  message: "Handlebars is working!"
});
```

#### 实现 hash 路由

_URL hash,也就是 URL #号后面的部分_

- 修改 index.ts

```js
const mainElement = document.body.querySelector(".mains");

// 定义跳转函数
const showView = async () => {
  const [view, ...params] = window.location.hash.split("/");
  switch (view) {
    case "#welcome":
      mainElement.innerHTML = templates.welcome();
      break;
    default:
      throw Error(`Unrecognized view: ${view}`);
  }
};
// 添加事件监听,但第一次进入页面时不会触发hashchange事件
window.addEventListener("hashchange", showView);

// 通过showView异步函数触发Error,捕获异常实现hash跳转
showView().catch(err => (window.location.hash = "#welcome"));
```

#### 页面列表渲染

- webpack.config.js 配置

```js
devServer: {
    contentBase: distDir,
    port: 60800,
    // 拦截请求转发到对应的服务
    proxy: {
      "/api/*": {
        target: "localhost:60702",
        // 跨域支持
        changeOrigin: true
      },
      "/es": {
        target: "localhost:9200",
        pathRewrite: { "^/es": "" }
      }
    }
  }
```

- index.ts 代码修改

```js
// 获取全部数据
const getAllData = async () => {
  //  fetch 是异步请求
  const esRes = await fetch("/es/books/book/_search");
  const esResBody = await esRes.json();

  return esResBody.hits.hits.map(item => ({
    id: item._source.id,
    name: item._source.name,
    organizer: item._source.organizer
  }));
};

//渲染数据列表
const showTable = datas => {
  mainElement.innerHTML = templates.showTable({ datas });
};

// 路由
const showView = async () => {
  const [view, ...params] = window.location.hash.split("/");
  switch (view) {
    case "#list":
      const datas = getAllData();
      showTable(datas);
      break;
  }
};
```

- 修改渲染模板

```js
// 展示全部的data
export const showTable = Handlebars.compile(`
    <div class="panel panel-default>
        <div class="panel-heading>Books</div>
        {{#if datas.length}}
        <table class="table">
            <tr>
                <th>Name</th>
                <th>Organizer</th>
            </tr>
            {{#each datas}}
            <tr>
                <td>
                    <a href="#view/{{id}}"></a>
                </td>
                <td>
                    <button class="btn delete" data-bundle-id="{{id}}">Delete</button>
                </td>
            </tr>
            {{/each}}
        </table>
        {{else}}
        <div class="panel-body">
            <p>None yet!</p>
        </div>
        {{/if}}
    </div>
`);
```
