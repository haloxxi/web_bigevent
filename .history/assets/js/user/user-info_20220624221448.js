$(function() {
    var form = layui.form
        // 下边使用到layer提示框 所以要先获取
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须1-6个字符之间'
            }
        }
    })
})


// 初始化用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            console.log(res)
                // 调用form.val()快速为表单赋值
            form.val('formUserInfo', res.data)
        }
    })
}