$(function() {
    var layui = layui.form


    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldpwd]').val())
        }
    })


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