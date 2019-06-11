'use strict'
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