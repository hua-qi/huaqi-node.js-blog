// 导入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async(req, res) => {

    // 路由标识 (标识当前为 用户列表 页面)
    req.app.locals.currentLink = 'usersList';

    // 接收客户端传递过来的 当前页 参数
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pageSize = 10;
    // 用户数据的总条数
    let count = await User.countDocuments();
    // 总页数（向上取整）
    let total = Math.ceil(count / pageSize);
    // 页码对应的数据查询开始位置
    let start = (page - 1) * pageSize;

    let users = await User.find().limit(pageSize).skip(start);
    // res.send(users);
    // 渲染用户列表页面
    res.render('admin/usersList', {
        users,
        page,
        total,
        count
    });

};