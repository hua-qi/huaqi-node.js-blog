// 引入 Article 集合的构造函数
const { Article } = require('../../model/article');
// 引入 Comment 集合的构造函数
const { Comment } = require('../../model/comment')

module.exports = async(req, res) => {

    // 解构 获取 aid
    let { aid } = req.query;

    // 通过 aid 查找文章数据 多集合联合查询
    let articleData = await Article.findOne({ _id: aid }).populate('author').lean();
    // 通过 aid 查找该文章对应的 评论数据
    let commentData = await Comment.find({ aid }).populate('uid').lean();



    res.render('home/article.art', {
        articleData,
        commentData
    });
};