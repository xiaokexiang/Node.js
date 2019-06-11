const fs = require('fs');
// argv 参数: [node .\watch-argv.js target.txt] => [0, 1, 2]
const filename = process.argv[2];
if (!filename) {
    throw Error('A file to watch must be specified!');
}
fs.watch(filename, () => console.log(`file: ${filename} change ...`));
console.log('watching file change...');