$(function () {
  //点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".loginBox").hide();
    $(".regBox").show();
  })
  //点击去登陆账号的链接
  $("#link_login").on("click", function () {
    $(".loginBox").show();
    $(".regBox").hide();
  })
  //用户验证
  var form = layui.form;
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      console.log(value);
      var pwd = $(".regBox [name=password]").val();
      console.log(pwd);
      if (pwd !== value) {
        return "密码输入不同"
      }
    }
  });
  console.log($(".loginBox [name=username]")[0]);
  $('#form_reg').on("submit", function (e) {
    e.preventDefault();
    var layer = layui.layer;
    $.post("/api/reguser", {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val()
    }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg("注册成功请登陆,嘿嘿嘿");
      $("#link_login").click();
      $(".loginBox [name=username]")[0].focus();
    })
  });

  $("#form_login").submit(function (e) {
    $("#link_login").addClass("layui-anim-scale")
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "post",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status === 1) {
          layer.msg("登陆失败");
          return;
        }
        layer.msg("登陆成功请登陆,嘿嘿嘿");
        console.log(res);
        localStorage.setItem("token", res.token);
        location.href = "index.html";
      }
    })
  })
})