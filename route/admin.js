// 引用 express 框架
const express = require('express');
// 创建博客展示页面路由
const admin = express.Router();

//渲染登录页面 路由 （导入登录页面模块
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能 路由 （导入登录模块
admin.post('/login', require('./admin/login'));

// 实现退出功能 路由
admin.get('/logout', require('./admin/logout'));

// 用户系路由

// 创建 用户列表页面 路由
admin.get('/usersList', require('./admin/usersList'));

// 创建 用户编辑页面 路由
admin.get('/user-edit', require('./admin/user-edit'))

// 创建实现 用户添加功能 路由
admin.post('/user-add', require('./admin/user-add'));

// 创建实现 修改用户信息功能 路由
admin.post('/user-modify', require('./admin/user-modify'));

// 创建实现 删除用户功能 路由
admin.get('/user-delete', require('./admin/user-delete'));

// 文章系路由

// 创建 文章列表页面 路由
admin.get('/articlesList', require('./admin/articlesList'));

// 创建 文章编辑页面 路由
admin.get('/article-edit', require('./admin/article-edit'))

// 创建 文章添加功能 路由
admin.post('/article-add', require('./admin/article-add'))

// 创建实现 修改文章功能 路由
admin.post('/article-modify', require('./admin/article-modify'));

// 创建实现 删除文章功能 路由
admin.get('/article-delete', require('./admin/article-delete'));


// 将路由对象作为模块成员进行导出
module.exports = admin;