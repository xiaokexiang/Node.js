'use strict'
const net = require('net');
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