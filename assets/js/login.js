$(function() {
    // 点击去注册账号的链接
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // 点击去登录链接
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    // 从layUI获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过layui.form（）来自定义检验规则
    form.verify({
            // 自定义一个psw校验规则 [\S]非空格
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
            ],
            // 校验两次密码是否一致
            repwd: function(value) {
                // 通过形参value拿到的是确认密码框的内容
                // 还需要那倒密码框的内容
                // 然后进行下一次判断
                // 判断失败则return err
                var pwd = $('.reg-box  [name=password]').val()
                if (pwd != value) {
                    return '两次密码不一样'
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
            // 参数太长 可以提取出来  http://api-breakingnews-web.itheima.net
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('/api/reguser',
            data,
            function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message)
                }
                // console.log('注册成功！')
                layer.msg('注册成功')
                    // 模拟人的手动点击行为
                $('#link-login').click()

            })
    })

    // 监听登录的表单
    $('#form-login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // serialize()快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // return layer.msg('登陆失败！')
                    return console.log(res.message)
                }
                layer.msg('登录成功！')
                    // console.log(res.token)
                    // 将登录成功的token值保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})