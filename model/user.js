// 引入 mongoose 第三方模块
const mongoose = require('mongoose');
// 导入 bcryptjs
const bcrypt = require('bcryptjs');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证唯一值
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        // 硬性规定：
        // admin 超级管理员
        // normal 普通用户
        type: String,
        required: true
    },
    state: {
        type: Number,
        // 0: 启用状态，1：禁用状态
        default: 0
    }
});
// 引入 验证用户 模块 joi
const Joi = require('joi');

// 创建集合 (使用 变量 User 接收构造函数）
const User = mongoose.model('User', userSchema);

// 创建用户
const createUser = async() => {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    let user = await User.create({
        username: '平安',
        email: 'pingan@blog.com',
        password: pass,
        role: 'nomral',
        state: 0
    });
};

// 调用函数
// createUser();

// 用户验证
const validateUser = userData => {
    // 定义对象的验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(12).required().error(new Error('用户名非法')),
        email: Joi.string().email().required().error(new Error('邮箱格式非法')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式非法')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色格式非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    });

    // 实施验证
    return schema.validateAsync(userData);
};

// 将用户集合作为模块成员进行导出（使用对象方式，可导出多个成员（在键-值 相等的情况下 只写其一就可
module.exports = {
    User,
    validateUser
};