const fs = require('fs')
// 监听file文件改变
fs.watch('target.txt', () => console.log('file change!'))
console.log('watching file change...')