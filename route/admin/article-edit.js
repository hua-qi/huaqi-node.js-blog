// 导入 Article 集合的构造函数
const { Article } = require('../../model/article');

// 导出模块
module.exports = async(req, res) => {

    // 路由标识 (标识当前为 文章编辑 页面)
    req.app.locals.currentLink = 'article-edit';


    // 获取 url 中相关信息
    let { message, authorId, articleId } = req.query;


    // // 针对 是否有 articleId 进而判断 是添加文章 或是 修改文章信息
    if (articleId) {

        // 判断当前用户是否有权限修改文章
        if (authorId == req.app.locals.userInfo._id) {
            // id 相同，即为拥有权限

            // 修改文章信息
            let article = await Article.findOne({ _id: articleId });

            // 渲染 文章编辑页面（修改文章信息）
            res.render('admin/article-edit', {
                message,
                article,
                link: '/admin/article-modify?articleId=' + articleId,
                btnTxt: '修改',
            });

        } else {
            // 没有权限 重定向至列表页面 并添加提示
            res.redirect('/admin/articlesList?message=非作者，没有权限修改该文章');
        };



    } else {
        // 渲染 文章编辑页面（添加修改文章）
        res.render('admin/article-edit', {
            message,
            link: '/admin/article-add',
            btnTxt: '添加'
        });
    };
};