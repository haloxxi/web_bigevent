$(function() {
    var form = layui.form

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
        url: ''
    })
}