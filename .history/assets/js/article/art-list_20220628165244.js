$(function() {
    var layer = layui.layer

    //定义一个查询的参数对象
    // 请求数据的时候 需要将请求参数对象 提交到服务器里
    var q = {
        pagenum: 1, //页码值，默认 请求第一页的数据
        pagesize: 2, //每页显示几条数据
        cate_id: '', //文章分类的id
        state: '', //文章发布状态
    }

    // 获取文章数据列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                layer.msg('获取文章列表成功！')
            }
        })
    }
})