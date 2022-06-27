$(function() {
    // 调用 getUserInfo()函数 获取用户信息
    getUserInfo()
        // 退出键设置
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // console.log('okk')
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 点击确定后 do something
            // console.log('ok')
            // 1-清空本地存储的token
            localStorage.removeItem('token')
                // 2-重新跳转登录页面
            location.href = '/login.html'
                // 这是关闭conform询问弹框
            layer.close(index);
        });

    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        // 这里不用写根路径 前边base已经自动添加上了
        url: '/my/userinfo',
        // 请求头 配置对象 有权限 所以要请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用renderAvatar()函数 渲染头像
            renderAvatar(res.data)
        },
        // 已经注册全局事件 不需要再写一遍了


        // 无论成功还是很失败 都会调用complete这个函数
        // 校验不通过直接访问后台页面 也是不允许的
        // complete: function(res) {
        //     console.log('执行了complete回调')
        //     console.log(res)
        //         // 在complete函数中可以那倒res.responseJSON拿到响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1-强制清空
        //         localStorage.removeItem('token')
        //             // 2-强制跳转登录页面
        //         location.href = '/login.html'
        //     }
        // }

    })
}

// 渲染头像
function renderAvatar(user) {
    // 1-获取用户名称
    var name = user.nickname || user.username
        // 2-设置欢迎文本 
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
        // 3-按需求渲染头像
    if (user.user_pic !== null) {
        // 3-1-渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3-2-渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}