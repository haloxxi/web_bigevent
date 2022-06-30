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
    $('#coverFile').on('change', function(e) {
        // 获取文件列表数组
        var files = e.target.files
            // var file = e.target.files
            // 判断用户是否选取文件
        if (files.length === 0) {
            return
        }
        // 根据文件 创建对应的URL地址
        var newImgURL = URL.createObjectURL(files[0])
            // 重新设置剪裁区
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 定义文章状态
    var art_state = '已发布'

    // 另存为草稿 绑定点击事件
    $('#btnSavae2').on('click', function() {
        art_state = '草稿'
    })

    // 为表单绑定submit提交事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
            // 1-为form表单创建一个实例对象 转化为dom对象
        var fd = new FormData($(this)[0])
            // 2-将文件状态存到fd中
        fd.append('state', art_state)

        // 1-1验证fd的值 打印出键和值 
        // title   cate_id  content cover_img state

        fd.forEach(function(v, k) {
            console.log(k, v)
        })

        // 3-将图片转化为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                // 4-将文件对象 存储到fd中
                fd.append('cover_img', blob)

                // 最后  发起Ajax请求 数据提交到数据库
                publishiArtcle(fd)
            })
    })

    // 定义发表文章的方法
    function publishiArtcle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            // data: fd,
            // // 注意：向服务器提交的是formDate格式的数据
            // // 必须有以下配置项
            // contentType: false,
            // processData: false,
            // success: function(res) {
            //     if (res.status !== 0) {
            //         return layer.msg('发布文章失败！')
            //     }
            //     layer.msg('文章发布成功！')
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')

                // 然后跳转文章列表页面
                location.href = 'D:\AA资料\11-大事件-后台管）\练习\day01\article\art-list.html'
            }
        })
    }
})