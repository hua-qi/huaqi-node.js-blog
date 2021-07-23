// 引入 formidable 第三方模块 (处理表单内容)
const formidable = require('formidable');
// 引入 path 系统模块 （处理路径）
const path = require('path');
// 导入 文章集合构造函数
const { Article } = require('../../model/article');

module.exports = (req, res) => {

    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀 (默认为 false 即：不保留 )
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        // req. 客户端的请求信息
        // 回调函数参数
        // err: 错误对象，如果表单解析失败，err会存放错误信息；反之，err则为空
        // fields: 对象类型，存放 普通表单数据
        // files: 对象类型，存放 上传文件的相关数据

        // "D:\前端学习\demo\nodejs\blog\public\uploads\upload_33598f4eb98b3d9a3f61687750bcabd7.jpg"
        // path.split() 方法 根据 public 字符进行分割，将分割后的字符分别存储为数组中的两个属性
        let cover = files.cover.path.split('public')[1];

        // ES6 解构
        let { title, author, publishDate, content } = fields;

        // 通过文章集合添加数据
        await Article.create({ title, author, publishDate, cover, content });

        // 将页面重定向至文章编辑页面
        res.redirect('/admin/article-edit?message=文章添加成功！');
    });
};