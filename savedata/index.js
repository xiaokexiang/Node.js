import package from "../package.json";
("use strict");

const fs = require("fs");
const request = require("request");
const program = require("commander");
const pkg = require(package);

program
  .version(pkg.version) // 版本
  .description(pkg.description) //描述
  .usage("[options] <command> [...]") // 用户字符串
  .option("-o, --host <hostname>", "hostname [localhost]", "localhost") //标记及默认值
  .option("-p, --port <number>", "port number [9200]", "9200")
  .option("-j, --json", "format output as JSON")
  .option("-i, --index <name>", "which index to use")
  .option("-t, --type <type>", "default type fot bulk operations");

// 解析node.js命令行选项
program.parse(process.argv);

// 如果出现无法识别的参数就提示help
if (!program.args.filter(arg => typeof arg === "object").length) {
  program.help;
}
