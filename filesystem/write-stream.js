'use strict'
const fs = require('fs');
fs.createWriteStream(process.argv[2]).write('Hello World');