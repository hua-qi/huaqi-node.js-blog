// 引入mongoose 第三方模块
const mongoose = require('mongoose');
// 引入 config 第三方模块
const config = require('config');

// 解构 获得多个参数
let { user, pwd, host, port, name } = config.get('db');

// 连接数据库 ``字符串拼接
mongoose.connect(`mongodb://${user}:${pwd}@${host}:${port}/${name}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'))