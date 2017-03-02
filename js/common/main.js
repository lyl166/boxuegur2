/**
 * Created by Administrator1 on 2017/2/25.
 */
requirejs.config({
    baseUrl:"/",
    paths:{
        //第三方库路径配置
        jquery:"lib/jquery/jquery.min",
        bootstrap:"lib/bootstrap/js/bootstrap.min",
        jqueryCookie:"lib/jquery-cookie/jquery.cookie",
        //进度条
        nprogress:"lib/nprogress/nprogress",
        //自己写的路径配置
        //common
        index:"js/index",
        common:"js/common/common",

        //user
        userList:"js/user/list",
        userProfile:"js/user/profile",

        //teacher
        teacherAdd:"js/teacher/add",
        teacherList:"js/teacher/list",

        //home
        homeLogin: "js/home/login",
        homeRepass: "js/home/repass",
        homeSettings: "js/home/settings",

        //teacher
        courseAdd:"js/course/add",
        courseAdd_step1:"js/course/add_step1",
        courseAdd_step2:"js/course/add_step2",
        courseAdd_step3:"js/course/add_step3",
        courseCategory:"js/course/category",
        courseCategory_add:"js/course/category_add",
        courseList:"js/course/list",
        courseTopic:"js/course/topic"

    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        } ,
        /*jqueryCookie:{
            exports: "$.cookie"
        }*/
    }
});
//以最快的速度加载精度条，再加载其它js文件s
require(["nprogress"],function(nprogress){
    nprogress.start();
})
//所有页面都需要这些js，先加载它们
require(["jquery","bootstrap","common"]);

/*
 * 这里获取页面的pathname，然后对应的加载js
//获取路径
* */
(function(window){
    var pathname = window.location.pathname;
//console.log(pathname)
    /*
    * 判断登录状态
    * 1.登录页
    * 1.1没有SESSID，不用管
    * 1.2有SESSID，跳转到页面
    *
    * 2.其它页
    * 2.1、没有SESSID，跳转到登录页
    * 2.2、有SESSID，不用管
    * */

    require(["jquery","jqueryCookie"],function($, undefined){

        var sessID = $.cookie("PHPSESSID");
        //如果是登录页，并且有sessID，
        if(pathname === "/html/home/login.html" && sessID){
            location.href = "/";
        }else  if(pathname !=="/html/home/login.html" && !sessID){
           //如果不是登录页，并且没有sessID，则跳到登录页
            location.href = "/html/home/login.html";
        }
        //下面的应该放在回调里面，因为下面的和上面跳转的是同步的，而回调外与里面则是异步的
        //如果没有发生页面跳转，就加载对应的js模块
        switch(pathname){
            //uer
            case "/":
                require(["index"]);
                break;
            case "/html/user/list.html":
                require(["userList"]);
                break;
            case "/html/user/profile.html":
                require(["userProfile"]);
                break;

            //teacher
            case "/html/teacher/add.html":
                require(["teacherAdd"]);
                break;
            case "/html/teacher/list.html":
                require(["teacherList"]);
                break;

            //home
            case "/html/home/login.html":
                require(["homeLogin"]);
                break;
            case "/html/home/repass.html":
                require(["homeRepass"]);
                break;
            case "/html/home/settings.html":
                require(["homeSettings"]);
                break;

            //course
            case "/html/course/add.html":
                require(["courseAdd"]);
                break;
            case "/html/course/add_step1.html":
                require(["courseAdd_step1"]);
                break;
            case "/html/course/add_step2.html":
                require(["courseAdd_step2"]);
                break;
            case "/html/course/add_step3.html":
                require(["courseAdd_step3"]);
                break;
            case "/html/course/category.html":
                require(["courseCategory"]);
                break;
            case "/html/course/category_add.html":
                require(["courseCategory_add"]);
                break;
            case "/html/course/list.html":
                require(["courseList"]);
                break;
            case "/html/course/topic.html":
                require(["courseTopic"]);
                break;
        }
    });

})(window);