### Restful web 服务

#### Express 使用 demo

_Express 是 Node.js 的 web 应用程序框架_

- 安装 express & morgan

```bash
$ npm install --save --save-exact express@4.14.1 morgan@1.8.1
```

- 代码实现处理 http 请求

```js
"use strict";

const express = require("express");
const morgan = require("morgan");

// 使用express定义上下文
const app = express();
// 使用中间件 morgan并将其设为dev模式,所有记录会输出在控制台
app.use(morgan("dev"));

app.get("/hello/:name", (req, res) => {
  res.status(200).json({ hello: req.param.name });
});

app.listen(60701, () => console.log("Ready ..."));
```

- 模拟 http get 请求

```bash
# -i 表示输出协议头信息
$ curl -i localhost:60701/hello/lucky
```

#### 模块化的 express

- 安装 nconf

```bash
# nconf 配置管理
$ npm install --save --save-exact express@4.14.1 morgan@1.8.1 nconf@0.8.4
```

- 代码实现

```js
"use strict";

const express = require("express");
const morgan = require("morgan");
const nconf = require("nconf");
const pkg = require("../package.json");

// 设置参数读取顺序 参数变量 -> 环境变量
nconf.argv().env("__");
// 设置默认参数 可使用 --conf=/path/to/some.other.json 替换
nconf.defaults({ conf: `${__dirname}/config.json` });
// nconf 加载配置文件
nconf.file(nconf.get("conf"));

const app = new express();

app.use(morgan("dev"));

app.get("/api/version", (req, res) => {
  res.status(200).json({ version: pkg.version });
});

app.listen("60702", () => console.log("Ready ..."));
```

- 模拟请求

```bash
$ curl -s localhost:60702/api/version
```
