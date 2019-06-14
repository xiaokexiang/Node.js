"use strict";
// 单次 rdf 转换成 json

const fs = require("fs");
const parseRDF = require("./lib/parse-rdf.js");
const rdf = fs.readFileSync(process.argv[2]);
const book = parseRDF(rdf);
// JSON.stringify 参数1: 序列化对象 参数2: 可选的替换函数 参数3: 缩进嵌套对象
console.log(JSON.stringify(book, null, "  "));
/**
 * {
  "id": 11,
  "title": "Alice's Adventures in Wonderland",
  "authers": [
    "Carroll, Lewis"
  ],
  "subjects": [
    "Alice (Fictitious character from Carroll) -- Juvenile fiction",
    "Children's stories",
    "Imaginary places -- Juvenile fiction",
    "Fantasy fiction"
  ]
}
*/
