'use strict'
const fs = require('fs');
// 读取文件内容
fs.readFile('target.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data.toString());
})