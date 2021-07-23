// 导出模块
module.exports = (req, res) => {

    let { aid } = req.query;

    // 这里的admin 不能加 / 
    res.render('admin/login', {
        aid
    });
};