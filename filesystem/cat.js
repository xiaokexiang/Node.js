#!/usr/bin/env node
// 直接运行方式创建读流
'use strict'
require('fs').createReadStream('./target.txt').pipe(process.stdout);