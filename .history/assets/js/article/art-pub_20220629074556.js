$(function() {

    var layer = layui.layer
    var form = layui.form

    initCote()
        //  调用initEditor() 初始化富文本编辑器
    initEditor()

    // 1-定义加载文章分类的方法
    function initCote() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('初始化文件失败！')
                }
                // 调用模板引擎 渲染
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // 注意：一定要在之后使用呢form.render()渲染页面
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
})