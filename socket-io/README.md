## Socket网络编程

### 1.监听socket连接
*基于服务端和客户端连接,服务端绑定TCP端口号,客户端订阅此端口号实现Socket监听*

#### 给服务端绑定TCP端口
``` js
const server = net.createServer(connection => {
// 成功绑定60300端口号后或将socket对象传递给connection
}).listen(60300, () => console.log('Listen for subscribers ...'));

```

#### 服务端watch文件
``` js
const fs = require('fs');
const net = require('net');
const fileName = process.argv[2];
if (!fileName) {
    throw Error('filename can not be null!');
}
// 创建连接
const server = net.createServer(connection => {

    // 有客户端成功连接就会提示
    console.log('Subscriber connected!');
    console.log(`Now Watching "${fileName}" for changes ... \n`);

    // 监听文件变化,输出到客户端的控制台
    const watcher = fs.watch(fileName, () => {
        connection.write(`File changed: ${new Date()} \n`);
    });

    connection.on('close', () => {
        console.log('Subscriber disconnected!');
        watcher.close();
    });
    connection.on('error', () => {
        console.log('err: ', error);
    })
    // 监听60300端口
}).listen(60300, () => console.log('Listen for subscribers ...'));
```

#### 使用telnet客户端
``` bash
$ telnet localhost 60300
```

#### 流程分析
*Socket服务绑定主机的TCP端口号,客户端通过主机的TCP端口号与服务端实现连接,服务端监听到file文件的修改,输出内容到客户端,此过程是单向的*

### 2.实现Json格式的数据传递&自定义socket客户端

#### 服务端
``` js
const server = net.createServer(connection => {

    // 有客户端成功连接就会提示
    console.log('Subscriber connected!');
    console.log(JSON.stringify({ "type": "watching", "filename": fileName }) + '\n');

    // 监听文件变化,输出到客户端的控制台
    const watcher = fs.watch(fileName, () => {
        connection.write(JSON.stringify({ "type": "changed", "timestamp": Date.now() }) + '\n');
    });

    connection.on('close', () => {
        console.log('Subscriber disconnected!');
        watcher.close();
    });
    connection.on('error', () => {
        console.log('err: ', error);
    })
    // 监听60300端口
}).listen(60300, () => console.log('Listen for subscribers ...'));
```

#### 自定义客户端
``` js
const net = require('net');
// 连接指定端口号
const client = net.connect({ port: 60300 });
client.on('data', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'watching') {
        console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed') {
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`)
    } else {
        console.log(`unrecongnized message type: ${message.type}`);
    }
});
client.on('error', err => { throw err });
```