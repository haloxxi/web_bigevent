$(function() {

    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChoseImage').on('click', function() {
            $('#file').click()
        })
        // 为文件选择绑定change事件
    $('#file').on('change', function(e) {
        console.log(e)
            // 获取用户选择文件
        var filelist = e.target.filelis
        if (filelist.length !== 1) {
            return layer.msg('请选择照片！')
        }


    })


})