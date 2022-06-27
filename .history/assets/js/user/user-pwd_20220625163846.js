$(function() {
    var layui = layui.form


    form.verify({
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