// 引用 express 框架
const express = require('express');
// 创建博客展示页面路由
const home = express.Router();

// 首页 路由
home.get('/', require('./home/index'));
// 博客详情页面 路由
home.get('/article', require('./home/article'));
// 评论功能路由
home.post('/comment', require('./home/comment'));


// 将路由对象作为模块成员进行导出
module.exports = home;