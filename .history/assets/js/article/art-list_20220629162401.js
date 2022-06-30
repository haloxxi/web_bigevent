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
        // 调用模板函数 美化时间
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    initTable()


    // 获取文章数据列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                //使用模板引擎 渲染页面
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 初始化文章分类
    function iniitCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
            }
        })
    }
})