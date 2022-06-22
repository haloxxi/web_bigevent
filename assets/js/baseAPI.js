// 注意：每次调用$.get（）/$.ajax()的时候
// 会先调用个ajaxprefilter()这个函数
// 这个函数会给我们Ajax配置一个对象
$.ajaxPrefilter(function(options) {

    // 在发起真正的Ajax之前 统一拼接路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
})