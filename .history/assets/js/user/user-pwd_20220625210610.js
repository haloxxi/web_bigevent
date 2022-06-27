$(function() {
    var form = layui.form
    var layer = layui.layer




    form.verify({
        // 规则1：密码6-12位 且没有空格
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 规则2：新旧密码不能相同
        samepwd: function(value) {
            if (value === $('[name=oldpwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newpwd]').val()) {
                return '两次密码不一致'
            }
        }
    })


    // $('.layui-form').on('submit', function(e) {
    //     e.preventDefault()

    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/updatepwd',
    //         // 这里还要添加数据oldpwd-newpwd 可以通过$(this).serialize()获取
    //         data: $(this).serialize(),
    //         success: function(res) {
    //             if (res.status !== 0) {
    //                 return layui.layer.msg('更改用户信息失败！')
    //             }
    //             console.log(res)
    //             layui.layer.msg('重置密码成功！')
    //                 // 重置密码时候如下：
    //                 // jQuery元素通过[0]转化为dom元素 设置reset方法重置
    //             $('.layui-form')[0].reset()
    //         }
    //     })

    // })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res.status)
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                        // return console.log(res.message)
                }
                layer.msg('更新密码成功！')
                    // console.log('okk')
                    // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })

})