"use strict";
// 使用request实现http请求

const request = require("request");
const express = require("express");
const rp = require("request-promise");
// 使用request模块实现异步请求
function search(app, es) {
  const url = `http://${es.host}:${es.port}/${es.index}/${es.type}/_search`;

  app.get("/api/search/books/:field/:query", (req, res) => {
    const searchBody = {
      size: 10,
      query: {
        match: {
          [req.params.field]: req.params.query
        }
      }
    };

    const options = { url, json: true, body: searchBody };
    request.get(options, (err, esRes, resBody) => {
      if (err) {
        res.status(502).json({
          error: "bad_gateway",
          resson: err.code
        });
        return;
      }
      if (esRes.statusCode !== 200) {
        res.status(res.statusCode).json(resBody);
        return;
      }
      res.status(200).json(resBody.hits.hits.map(({ _source }) => _source));
    });
  });
}

function findAll(app, es) {
  const url = `http://${es.host}:${es.port}/${es.index}/${es.type}/_search`;
  app.get("/api/books/findAll", (req, res) => {
    const options = { url, json: true };
    // 使用Promise实现
    const promise = new Promise((resolve, reject) => {
      request.get(options, (err, esRes, esBody) => {
        console.log("esBody: ", esBody);
        if (err) {
          reject({ error: err });
          return;
        }

        if (esRes.statusCode !== 200) {
          reject({ error: esBody });
          return;
        }
        // request中使用Promise的resolve来解决
        resolve(esBody);
      });
    });
    promise
      .then(esBody => res.status(200).json(tranferData(esBody)))
      .catch(({ error }) => res.status(error.status || 502).json(error));
  });
}

// 优化查询代码
function findAllAdvance(app, es) {
  const url = `http://${es.host}:${es.port}/${es.index}/${es.type}/_search`;
  app.get("/api/books/findAll/advance", (req, res) => {
    const options = { url, json: true };
    rp(options)
      .then(esBody => res.status(200).json(tranferData(esBody)))
      .catch(({ error }) => res.status(error.status || 502).json(error));
  });
}

// 提取数据
function tranferData(esBody) {
  const newBody = {
    name: "",
    organizer: ""
  };
  const arr = new Array();
  esBody.hits.hits.filter(item => {
    newBody.name = item._source.name;
    newBody.organizer = item._source.organizer;
    arr.push(newBody);
  });
  return arr;
}
module.exports.search = search;
module.exports.findAll = findAll;
module.exports.findAllAdvance = findAllAdvance;
