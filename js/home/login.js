/**
 * Created by Administrator1 on 2017/2/25.
 */
define(["jquery","jqueryCookie","nprogress"],function($, undefine, nprogress){
    /*
    * 展示用户的历史登录头像
    * 1.获取userInfo这个cookie值
    * 2.把获取到的userInfo字符串转化为对象
    * 3.设置登录页面头像img-src为tc_avatar，如果没有则给一个默认的头像
    * */
    var userInfo = null;
    try{
        userInfo = JSON.parse($.cookie("userInfo"));
        //console.log(userInfo.tc_avatar);
    }catch(e){
        userInfo = {};
    }

    $(".login .avatar img").attr("src",userInfo.tc_avatar ? userInfo.tc_avatar : "/img/default.png");


    $("#form-login").on("submit",function(){
        //console.log("123");
        $.ajax({
            url:"/v6/login",
            type:"post",
            data:$(this).serialize(),
            success:function(data){
                //console.log(data);
                //如果登录成功，使用cookie的方式保存用户信息
                //注意：cookie值必须为字符串，我们得到的是js对象，需要用JSON.stringify进行转换.
                if(data.code  == 200){
                    $.cookie("userInfo", JSON.stringify(data.result),{path:"/"});
                    location.href = "/";
                }
            },
            error:function(){
                console.log("失败");
            }
        });
        return false;
    });

    //该页面所有的js加载完毕，再加载进度条
    nprogress.done() ;
})