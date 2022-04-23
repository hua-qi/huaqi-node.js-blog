// 引入 express 框架
const express = require('express');
// 引入路径处理
const path = require('path');
// 引入express-session 模块
const session = require('express-session');
// 导入 art-template 模板引擎
const template = require('art-template');
// 全局引入 dateFormat 模块 (用于处理 日期格式)
const dateFormat = require('dateformat');
// 引入 morgan 第三方模块 （用于开发环境 打印请求信息至控制台
const morgan = require('morgan');
// 导入 config 模块
const config = require('config');

//创建网站服务器 
const app = express();

// 数据库连接 （并未返回模块成员 不用变量接收）
require('./model/connect');

// 处理POST请求参数 (extended false  默认使用 querrString 处理字符串)
// 不能处理 form-data 即 二进制 数据
app.use(express.urlencoded({ extended: false }));

// 配置session
app.use(session({
    resave: true,
    // 在未登录时 客户端不保存 cookie
    saveUninitialized: false,
    secret: 'secret key',
    cookie: {
        // cookie 保存的最长时间 单位：毫秒
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 向express 指定框架模板所在位置
app.set('views', path.join(__dirname, 'views'));
// 向express 指定框架模板的默认后缀
app.set('view engine', 'art');
// 向文件后缀为 .art 文件，指定渲染所使用的模板引擎
app.engine('art', require('express-art-template'));
// 向模板内部导入 dateFormat 变量 （默认写法）
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件 符号 / 代表其根目录 即 该路径
app.use(express.static(path.join(__dirname, 'public')));

// 拦截请求，判断用户登录状态
// 由于中间件的执行顺序是代码从上至下执行，所以应放在路由匹配中间件之前
// 引入 登录拦截模块
app.use('/admin', require('./middleware/loginGuard'));

// 获取当前系统的配置信息 
console.log(config.get('title'));

// 获取系统环境变量（返回值为 对象数据类型）
// console.log(process.env);
// 根据系统环境变量中的 变量名 NODE_ENV 获取变量值
// process.env.NODE_ENV;
// 进行判断
// if (process.env.NODE_ENV == 'development') {
//     // 当前是 开发环境
//     console.log('当前是开发环境');
//     // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
//     app.use(morgan('dev'));
// } else {
//     // 当前是 生产环境
//     console.log('当前是生产环境');
// };

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串数据类型转化为对象数据类型
    const result = JSON.parse(err);
    // 空数组
    let params = [];
    // 遍历对象 填充数组
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    };
    // message 后 通过 & 进行拼接
    res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口 80  浏览器默认给 url添加 80端口
app.listen(80);
// 启动成功后 命令行打印
console.log('网站服务器启动成功，请访问：localhost');