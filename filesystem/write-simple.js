'use strict'
const fs = require('fs');
// 输出文件 不存在则创建,存在则覆盖
fs.writeFile('target.txt', 'hello world', (err) => {
    if (err) {
        throw err;
    };
    console.log('file save')
});