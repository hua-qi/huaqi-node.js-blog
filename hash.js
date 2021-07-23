// 导入 bcryptjs
const bcrypt = require('bcryptjs');

// 示例
let run = async() => {
    // 生成随机字符串
    // genSalt() 接收一个数值作为参数
    // 数值越大 生成的随机字符串复杂度越高，反之则复杂度越低
    // 默认值：10
    // 返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    // 对密码进行加密
    // 参数1：要进行加密的明文
    // 参数2:随机字符串
    // 返回值是加密后的密码
    const result = await bcrypt.hash('123456', salt);
    console.log(result);
};

run();