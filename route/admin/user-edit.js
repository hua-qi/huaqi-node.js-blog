// 引入用户集合的构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {

    // 路由标识 (标识当前为 用户编辑 页面)
    req.app.locals.currentLink = 'user-edit';

    // 获取 url 中相关信息
    let { message, id } = req.query;

    // 针对 是否有 id 进而判断 是添加用户 或是 修改用户信息
    if (id) {
        // 修改用户信息
        let user = await User.findOne({ _id: id });
        // 渲染 用户编辑页面（修改用户信息）
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify?id=' + id,
            btnTxt: '修改',
            userId: '用户id：' + id
        });

    } else {
        // 渲染 用户编辑页面（添加修改用户）
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-add',
            btnTxt: '添加'
        });
    };
};