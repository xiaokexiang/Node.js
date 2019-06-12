'use strict'
// 测试将一条Json数据拆分成多条发送
const net = require('net');
const fs = require('fs');
net.createServer(connection => {
    console.log('Subscriber connected');

    let timer;
    const watcher = fs.watch(process.argv[2], () => {
        const date = Date.now();
        // 每监测到文件变化,就将以下两部分数据分次发送到client
        const firstChunk = '{"type":"watching","timest';
        const secondChunk = `amp": ${date}}\n`;
        console.log(`File changed: ${date}`);
        connection.write(firstChunk);
        connection.write(secondChunk);
    })

    connection.on('close', () => {
        console.log('Subscriber disconnected');
        watcher.close();
    });
}).listen(60300, () => console.log('Listen for subscriber ...'));