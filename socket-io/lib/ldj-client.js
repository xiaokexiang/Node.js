'use strict'
// 实现一个自定义LDJ缓存模块来解决JSON分块消息的问题
const EventEmitter = require('events').EventEmitter;
class LDJClient extends EventEmitter {
    constructor(stream) {
        super();
        // 初始化字符串
        let buffer = '';
        stream.on('data', data => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            // 发过来的消息中没有\n就缓存,有\n就发送
            while (boundary !== -1) {
                const input = buffer.substring(0, boundary);
                // 获取\n剩下的内容
                buffer = buffer.substring(boundary + 1);
                // 传输一个完整的消息出去
                this.emit('message', JSON.parse(input));
                // 继续判断剩下的内容中是否有\n,有就循环执行
                boundary = buffer.indexOf('\n');
            }
        });
    }
    static connect(stream) {
        return new LDJClient(stream);
    }
}
module.exports = LDJClient;