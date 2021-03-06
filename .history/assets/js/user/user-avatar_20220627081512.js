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

        // 1-拿到用户选择的文件
        var file = e.target.files[0]
            // 2-根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
            // 3-先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


})