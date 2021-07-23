module.exports = (req, res) => {
    // 删除session
    req.session.destroy(() => {
        // 删除 cookie
        res.clearCookie('connect.sid');
        // 重定向至登录页面
        res.redirect('/admin/login');
        // 清楚模板中的用户信息
        req.app.locals.userInfo = null;
    });
};