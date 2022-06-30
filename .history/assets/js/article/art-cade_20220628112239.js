$(function() {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()


    // 1-获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 2-为添加类别按钮绑定事件
    // 关闭弹出层的时候 需要用到index 来设定关闭那一层 在添加成功之后 关闭弹出层
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
            // 弹出层效果
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html() //这里的内容 可以写在script里 然后引用渲染

            });

        })
        // 3- 给ADD  添加绑定事件
        // 通过代理的形式 为form-add绑定submit事件
        // 这里不能直接给form-add绑定事件 而是给body添加事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        // console.log('okk')
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                // 先渲染页面 再提示成功
                initArtCateList()
                layer.msg('新增文章分类成功！')
                    // 关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    // 4-给编辑按钮添加绑定事件
    // 通过代理的方式给btn-edit绑定事件
    // button是包含在tbody里的 所以给父元素添加绑定事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出层效果 和文章分类效果相似
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html() //这里的内容 可以写在script里 然后引用渲染

        })



        // 5-根据id值 获取文章分类 获取已经存在的值
        var id = $(this).attr('data-id')
            // console.log(id)
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res)
                // 给指定表单填充数据
                form.val('form-edit', res.data)
            }
        })
    })

    // 6-通过动态创建的表单 要经过代理 才能添加事件submit
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                    // 关闭弹出的框框 根据id
                layer.close(indexEdit)
                    // 重新渲染页面
                initArtCateList()
            }
        })
    })



})