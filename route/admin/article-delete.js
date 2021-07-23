// 引入 Article 集合的解构对象
const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 解构对象 获得 id
    let { articleId } = req.query;

    // 根据 id 删除用户
    await Article.findOneAndDelete({ _id: articleId });

    // 重定向至用户列表页面
    res.redirect('/admin/articlesList');
};