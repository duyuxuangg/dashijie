$(function () {
    getUserInfo();
    $("#btnloginout").click(function () {
        layer.confirm('确定要退出吗？', { icon: 3, title: '退出' }, function (index) {
            localStorage.removeItem("token");
            layer.close(index);
            location.href = "login.html";
        });
    })

})
// 获取基本信息
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            xuanran(res);
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1) {
        //         localStorage.removeItem("token");
        //         location.href = "login.html"
        //     }
        // }
    });
    function xuanran(res) {
        if (res.status !== 1) {
            var name = res.data.nickname || res.data.username;
            $("#welcome").html("欢迎您&nbsp;&nbsp;" + name);
            if (res.data.user_pic !== null) {
                $(".layui-nav-img").attr("src", res.data.user_pic).show();
                $(".text-avatar").hide();
            } else {
                // 渲染文本头像
                $(".layui-nav-img").hide();
                var first = name[0].toUpperCase();
                console.log(first);
                $(".text-avatar").html(first).show();
            }
        }
    }
}