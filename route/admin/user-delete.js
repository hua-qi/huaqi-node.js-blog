// 引入 用户集合 的构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 解构对象 获得 id
    let { userId } = req.query;

    // 根据 id 删除用户
    await User.findOneAndDelete({ _id: id });

    // 重定向至用户列表页面
    res.redirect('/admin/usersList');
};