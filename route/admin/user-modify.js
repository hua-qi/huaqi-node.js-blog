// 导入用户集合的构造函数
const { User } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcryptjs');

module.exports = async(req, res, next) => {

    // 接收 post 传递的 参数
    let { username, email, password, role, state } = req.body;
    // 接收 get 传递的 id
    let { id } = req.query;

    let userData = await User.findOne({ _id: id });

    // 密码比对 (参数1: 接收的密码; 参数2:数据库中保存的密码)
    const isValid = await bcrypt.compare(password, userData.password);

    // 比对结果
    if (isValid) {
        // 密码相等
        await User.updateOne({ _id: id }, {
            username,
            email,
            role,
            state
        });

        // 页面重定向至 用户列表页面
        res.redirect('/admin/usersList');
    } else {
        // 密码不等
        // 信息填充 
        let info = {
            path: '/admin/user-edit',
            message: '密码错误! 信息修改失败.',
            id
        };
        // next() 方法的第一个参数传递字符串 (JSON.stringify() 对象转字符串)
        next(JSON.stringify(info));
    };

};