// 导出模块
module.exports = (req, res, next) => {

    // 字符截取 (这里是为了做 文章专项路由)
    let subUrl = req.url.substring(0, 6);

    // 判断用户访问的是否为登录页面 以及 用户的登录状态
    // 若 用户是登录状态，则放行请求
    // 若 用户是非登录状态，则将请求重定向至登录页面
    if (subUrl != '/login' && !req.session.username) {
        // req.session.username 见admin.js 第36行，若用户为登录状态则 session对象下应该有username属性，反之则没有
        res.redirect('/admin/login');

    } else {
        // 用户为登录状态 放行请求
        // 如果该用户为 普通用户
        if (req.session.role == 'normal') {

            // 页面跳转至 博客首页 并阻止代码向下执行
            return res.redirect('/home/');

        } else {
            // 如果该用户为 超级用户 admin
            next();
        }
    };
};