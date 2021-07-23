// 引入 Article 集合的构造函数
const { Article } = require('../../model/article');
// 导入 分页模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    let { page } = req.query;
    // 从数据库 查询文章 并 格式化
    let temp = await pagination(Article).page(page).size(6).display(5).find().populate('author').exec();
    let str = JSON.stringify(temp);
    let articles = JSON.parse(str);

    // res.send(articles);
    // return;
    // 渲染模板 并 传递数据
    res.render('home/default.art', {
        articles
    });
};