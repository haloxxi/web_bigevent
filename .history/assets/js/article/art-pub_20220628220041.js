$(function() {

    var layer = layui.layer


    initCote()

    // 定义加载文章分类的方法
    function initCote() {
        $.ajax({
            method: 'GET',
            url: '/my/article/add',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文件失败！')
                }
                // 调用模板引擎 渲染
            }
        })
    }
})