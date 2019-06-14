"use strict";
// 批量 rdf to json

const dir = require("node-dir");
const parseRDF = require("./lib/parse-rdf.js");
const dirname = process.argv[2];

const options = {
  match: /\.rdf$/,
  exclude: ["pg0.rdf"]
};

// 使用node-dir遍历目录树
dir.readFiles(dirname, options, (err, content, next) => {
  if (err) {
    throw err;
  }
  const doc = parseRDF(content);
  // es id
  console.log(JSON.stringify({ index: { _id: `pg${doc.id}` } }));
  console.log(JSON.stringify(doc));
  next();
});
