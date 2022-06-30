$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage


    //定义一个查询的参数对象
    // 请求数据的时候 需要将请求参数对象 提交到服务器里
    var q = {
            pagenum: 1, //页码值，默认 请求第一页的数据
            pagesize: 2, //每页显示几条数据
            cate_id: '', //文章分类的id
            state: '', //文章发布状态
            layout: ''
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
    initCate()



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

                // 在页面加载完之后 调用渲染 才能分页
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                    // console.log(htmlStr)
                $('[name=cate_id]').html(htmlStr)
                    // layui的特性 调用方法渲染
                form.render()


            }
        })
    }


    // 为表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 查询参数对象 q中对应的属性值
        q.cate_id = cate_id
        q.state = state
            // 根据筛选条件 重新弄渲染页面
        initTable()
    })

    // 定义渲染分页方法
    function renderPage(total) {
        // console.log(total)
        // 调用laypage.render() 来渲染分页的结构
        laypage.render({
            elem: 'pageBox', //分页容器的iid
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置默认被选中的分页

            // 分页的时候，触发jump回调
            // 调用jump回调的方式有两种
            // 1-点击页码时候 触发回调
            // 2-只要调用render()方法，就会触发jump回调
            jump: function(obj, first) {

                // 可以通过first来测试使用哪一种回调触发 jump
                // 返回ture则是第二种render调用 
                // 点击页码时候 是通过第一种方法触发的
                // 所以要判断触发方式 然后调用函数
                console.log(first)

                console.log(obj.curr)
                    // 然后把新页码值 赋值到q这个查询参数对象中
                q.pagenum = obj.curr
                    // 根据q的值 更新数据 并且渲染页面
                    // initTable()  直接调用这个函数的话 会陷入循环 一直处于第一个页面
                if (!first) {
                    initTable() //这时候就不会出现死循环
                }
            }
        })
    }
})