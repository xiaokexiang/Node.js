'use strict'
// 从原有的直接消费TCP流变成由ldj-client.js处理流
const netClient = require('net').connect({ port: 60300 });
const ldjClient = require('./lib/ldj-client.js').connect(netClient);
ldjClient.on('message', message => {
    if (message.type === 'watching') {
        console.log(`Now watching: ${message.timestamp}`);
    } else if (message.type === 'changed') {
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`)
    } else {
        console.log(`unrecongnized message type: ${message.type}`);
    }
});