$(function() {

    var layer = layui.layer
    var form = layui.form

    initCote()
        //  调用initEditor() 初始化富文本编辑器
    initEditor()

    // 定义加载文章分类的方法
    function initCote() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res)
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


    // 为选择按钮绑定触发事件
    $('#btnChoosImage').on('click', function() {
        $('#coverFile').click()
    })

    // 监听overfile的change事件 获取文件列表
    $('#overFile').on('change', function(e) {
        // 获取文件列表数组
        // var files = e.target.files
        var file = e.target.files[0]
            // 判断用户是否选取文件
        console.log(file.length)
        if (file.length === 0) {
            return
        }
        // 根据文件 创建对应的URL地址
        var newImgURL = URL.createObjectURL(file)
            // 重新设置剪裁区
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#coverFile').on('change', function(e) {
        // 获取到文件的列表数组
        var files = e.target.files
            // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
            // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
})