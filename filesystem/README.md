## Node.js开发实战

### 1.基于文件修改的fs模块

#### 引入fs模块
``` js
const fs = require('fs')

```
#### 监听文件变化
``` js
fs.watch(filename, () => console.log(`file: ${filename} change ...`));
```

#### 异步读取文件
``` js
fs.readFile('target.txt', (err, data) => {})
```

#### 同步读取文件
``` js
const data = fs.readFileSync('target.txt');
```

#### stream流读取文件
``` js
fs.createReadStream(process.argv[2])
    .on('data', chunk => process.stdout.write(chunk))
    .on('error', error => process.stderr.write(`Error: ${error.message}\n`));
```

#### 异步输出文件
``` js
fs.writeFile('target.txt', 'hello world', (err) => {});
```

#### 同步输出文件
``` js
fs.writeFileSync('target.txt', 'hello world');
```

#### 流输出文件
``` js
fs.createWriteStream(filename).write('Hello World');
```