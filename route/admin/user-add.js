// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcryptjs');

module.exports = async(req, res, next) => {

    // 用户验证
    try {
        await validateUser(req.body);
    } catch (err) {
        // 验证未通过
        // 重定向至用户添加页面 （重定向结束后，会执行 res.end() )
        // return res.redirect(`/admin/user-edit?message=${err.message}`);
        // JSON.stringify() 将对象数据数据类型转化内字符串数据类型 
        let redData = { path: '/admin/user-edit', message: err.message };
        return next(JSON.stringify(redData));
    };

    // 根据邮箱地址查询用户是否已存在
    let user = await User.findOne({ email: req.body.email });
    // 如果用户已经存在
    if (user) {
        // 重定向至用户添加页面 （重定向结束后，会执行 res.end() )
        // return res.redirect(`/admin/user-edit?message=该邮箱地址已经被占用`);
        let redData = { path: '/admin/user-edit', message: '该邮箱地址已经被占用' };
        return next(JSON.stringify(redData));
    };
    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const bcryptPassword = await bcrypt.hash(req.body.password, salt);
    // 加密后密码替换 原密码
    req.body.password = bcryptPassword;

    // 将用户信息添加到数据库
    await User.create(req.body);
    // 重定向至用户编辑页面 （重定向结束后，会执行 res.end() )
    // return res.redirect(`/admin/usersList`);
    let redData = { path: '/admin/user-edit', message: '用户添加成功！' };
    return next(JSON.stringify(redData));
};