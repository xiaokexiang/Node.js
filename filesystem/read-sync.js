'use strict'
const fs = require('fs');
// 文件同步操作
const data = fs.readFileSync('target.txt');
process.stdout.write(data.toString());