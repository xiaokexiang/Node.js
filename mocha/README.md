### 基于Mocha实现Node.js代码的单元测试

#### npm安装

``` bash
# 初始化npm,会生成package.json文件
$ npm init -y
#安装Mocha包 --save-dev: 开发依赖 --save-exact 记录精确的版本号
$ npm install --save-dev --save-exact mocha@3.4.2
```
*Node.js中包含几种不同类型的依赖,常规依赖是代码运行时会使用到,常用require引入,开发依赖是指开发时需要的模块,指定--save-dev或-D参数即可,需要注意的是执行npm install命令时都会将各类型的依赖安装到项目中*

*package-lock.json代表本次安装的所有模块的版本号*

#### 关于模块的语义版本号

*版本号由: 主版本号,次版本号,修订版本号组成*
* 如果本次没有新增或者删除任何功能,只是修改bug,应该增加修订版本号
* 如果本次新增了功能,但没有删除或者修改已有功能,应该增加次版本号,并重置修订版本号
* 如果本次修改会对现有功能产生影响,应该增加主版本号,并重置次版本号和修订版本号

*如果npm install时去掉--save-exact参数,则会在package.json中添加带^的版本号,表明npm会安装与你指定版本相同或者更新的次版本*

#### 使用Mocha开发单元测试
``` js
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
```