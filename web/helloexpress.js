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
