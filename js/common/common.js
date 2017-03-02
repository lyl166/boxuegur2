/**
 * Created by Administrator1 on 2017/2/26.
 */
define(["jquery","jqueryCookie"],function($, undefined){
    //左侧导航下拉列表
    $(".navs a").on("click",function(){
        $(this).next().slideToggle();
    });
    //退出功能
    $("#logout").on("click",function(){
        $.post("/v6/logout",function(data){
            //console.log(data);
            if(data.code == 200){
                location.href="/html/home/login.html";
            }
        });
    });

    //获取本地cookie用户信息，然后把头像与名字展示到左侧导航
    //防止报错，做一个容错处理
    var userInfo = null;
    try{
        userInfo = JSON.parse($.cookie("userInfo"));
    }catch(e){
        userInfo = { };
    }
    $(".aside .profile h4").html(userInfo.tc_name? userInfo.tc_name:"gearrgar");
    $(".aside .profile img").attr("src",userInfo.tc_avatar? userInfo.tc_avatar:"/img/default.png");


 /*
 * 左侧导航的定位
 * 1.先获取pathname
 * 2.把所有a标签的active class移除
 * 3.给与pathname对应的a标签添加active class
 * 4.最后给该a标签所有的父ul标签展示出来，因为不展示出来是看不到的
 * */
    var pathname = window.location.pathname
    $(".navs a").removeClass("active").filter("[href='" + pathname + "']").addClass("active").parents("ul").show();

});