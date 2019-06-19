// 模块化的express服务
"use strict";

const express = require("express");
const morgan = require("morgan");
const nconf = require("nconf");
const pkg = require("../package.json");
const api = require("./lib/api.js");

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

// API
api.search(app, nconf.get("es"));
api.findAll(app, nconf.get("es"));

app.listen("60702", () => console.log("Ready ..."));
