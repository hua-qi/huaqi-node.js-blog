// processing：加工
function serializeToJson(form) {
    // serializeArray() 方法 用于获取 表单中用户输入的内容
    // 返回 数组包含对象（对象的数量取决于表单控件的数量），
    // [{name:'',value:''}]
    let transform = form.serializeArray();
    // 将数组包裹对象方式，转变为一个对象存储多个键值对
    let result = {};
    transform.forEach(function(item) {
        // result.email  =  value 等同于下面写法
        result[item.name] = item.value;
    });
    return result;
};