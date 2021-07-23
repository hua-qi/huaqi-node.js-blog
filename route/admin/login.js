// 导入 bcryptjs
const bcrypt = require('bcryptjs');
// 导入用户集合构造函数
const { User } = require('../../model/user');


// 导出模块
module.exports = async(req, res) => {
    // （async 异步函数标记）


    // 接收post请求参数
    const { email, password, aid } = req.body;


    // 如果客户端浏览器禁用 js 运行，则客户端进行的账号和密码验证将失效
    // 为此在服务端我们增加验证功能
    if (email.length == 0 || password.length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    // 根据邮箱地址查询用户信息 (参数 ES6写法 键值对相等 写其一)
    // 如果查询到用户 userData 变量类型为对象类型
    // 如果没有查询到用户 userData 变量为空
    let userData = await User.findOne({ email });

    if (userData) {
        // 查询到用户
        // 将客户端传递过来的密码 与 数据库中用户信息的密码进行比对
        // true 对比成功 false 对比失败
        let isValid = bcrypt.compare(password, userData.password)
        if (isValid) {
            // 登录成功
            // 将用户名存储在请求对象中
            // session 是 express-session 提供的对象（存储信息时，会自动创建 sessionId)
            req.session.username = userData.username;
            // 将用户角色 存储在 session 对象中
            req.session.role = userData.role;
            // res.send('登录成功');
            // req.app 即 app.js 文件中的 app（即 express() 的实例化对象）
            // app.local 可以理解为 全局对象，所有 template 模板均可拿到
            req.app.locals.userInfo = userData;

            // 专项跳转
            // 对用户的角色进行判断
            if (userData.role == 'admin') {
                // 管理员  重定向到 usersList 页面
                res.redirect('/admin/usersList');
            } else {
                if (aid) {
                    // 重定向至 原文章（aid对应的文章）页面
                    res.redirect('/home/article?aid=' + aid)
                } else {
                    // 普通用户 重定向至 博客首页
                    res.redirect('/home');
                }

            };



        } else {
            // 没有查询到用户
            res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
        };

    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    };
};