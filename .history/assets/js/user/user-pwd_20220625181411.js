$(function() {
    var form = layui.form



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


    $('.layui-form').on('click', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更改用户信息失败！')
                }
                console.log(res)
                layer.msg('重置密码成功！')
            }
        })

    })


})