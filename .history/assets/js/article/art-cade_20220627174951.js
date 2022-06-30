$(function() {
    var layer = layui.layer

    initArtCateList()


    // 获取文章分类的列表
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

        // 为添加类别按钮绑定事件
        $('#btnAddCate').on('click', function() {
            // 弹出层效果
            layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html() //这里的内容 可以写在script里 然后引用渲染

            });

        })
    }
})