const cheerio = require('cheerio');

// 解析rdf文件
module.exports = rdf => {
    const $ = cheerio.load(rdf);
    const book = {};
    // 转换bookId此处的+号是为了保证结果为数字
    book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
    book.title = $('dcterms\\:title').text();
    // 获取作者,作者是数组 element返回的是文档节点,需要使用$包装获取,实现作者Array
    book.authers = $('pgterms\\:agent pgterms\\:name').toArray().map(element => $(element).text())
    // 获取主题列表
    book.subjects = $('[rdf\\:resource$="/LCSH"]').parent().find('rdf\\:value').toArray().map(element => $(element).text());
    return book;
}