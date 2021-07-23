// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 引入 分页工具 mongoose-sex-page 第三方模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    // 路由标识 (标识当前为 文章列表 页面)
    req.app.locals.currentLink = 'articlesList';

    // 接收客户端传递的页码
    let { page, message } = req.query;

    // 查询所有的文章数据 联合查询
    // 1.page(): 指定当前页
    // 2.size(): 指定每页显示的数据条数
    // 3.diplay(): 指定客户端要显示的页码数量
    // 4.exec(): 向数据库发送查询请求
    let temp = await pagination(Article).find().sort('-publishDate').page(page).size(5).display(5).populate('author').exec();
    let str = JSON.stringify(temp);
    let articlesData = JSON.parse(str);
    // let articlesData = await Article.find().populate('author').lean();
    // 文章数据的总条数
    // let count = await Article.countDocuments();

    // res.send(articlesData);

    res.render('admin/articlesList', {
        articlesData,
        message
    });
};