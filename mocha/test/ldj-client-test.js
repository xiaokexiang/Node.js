// Mocha测试用例
'use strict'
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../../socket-io/lib/ldj-client.js');

// describe创建上下文环境,第二个参数是函数,包含测试具体内容
describe('LDJClient', () => {
    let stream = null;
    let client = null;

    // 新实例赋值
    beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    // it()函数进行实际测试
    it('should emit a message event from a single data event', done => {
        client.on('message', message => {
            assert.deepEqual(message, { foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo":"bar"}\n');
    });
});