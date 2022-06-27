// 注意：每次调用$.get（）/$.ajax()的时候
// 会先调用个ajaxprefilter()这个函数
// 这个函数会给我们Ajax配置一个对象
$.ajaxPrefilter(function(options) {

    // 在发起真正的Ajax之前 统一拼接路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // console.log(options.url)

    // 统一为有权限的接口设置headers
    // 不是所有都要加headers 只有my开头的需要
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局挂载complete回调函数
    options.complete = function(res) {
        // console.log('执行了complete回调')
        // console.log(res)
        // 在complete函数中可以那倒res.responseJSON拿到响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1-强制清空
            localStorage.removeItem('token')
                // 2-强制跳转登录页面
            location.href = '/login.html'
        }
    }
})