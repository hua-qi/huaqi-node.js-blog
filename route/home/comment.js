// 导入 评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {

    // 获取 post 请求参数
    const { uid, aid, content } = req.body;

    // 将评论信息存储在数据库中
    await Comment.create({
        content,
        uid,
        aid,
        time: new Date()
    });

    // 重定向至原文章页面
    res.redirect('/home/article?aid=' + aid);
};