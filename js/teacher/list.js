define(["jquery","common","nprogress","template"],function(jquery, undefined, nprogress, template){

    /*
    * 讲师列表
    */
    $.get("/v6/teacher",function(data){
        if(data.code == 200){
            var html = template("teacher-list-tpl",{list:data.result});
            $("#teacher-list-tbody").html(html);
        }
    });
    /*
    * 查看讲师
    * 1.从文档可以看出。需要的tc_id参数
    * 2.给查看的按钮绑定事件
    * 3.发送get请求，传递参数tc_id,按照获取到的数据渲染
    * */
    //利用事件委托的方法绑定事件，a标签为查看，给它的父元素绑定点击的事件，在触发事件的时候，冒泡过程经过a标签
    $("#teacher-list-tbody").on("click",".teacher-view",function(){
        //console.log(123);
        //#teacher-list-tbody是teacher-view的父标签
        $.get("/v6/teacher/view",{
            //这里的this指的是teacher-view
            tc_id:$(this).parents().attr("data-id")
        },function(data){
            if(data.code == 200){
                var html = template("teacher-view-tpl",data.result);
                $("#teacherModal").html(html);
            }
        })
    })


    //当前页面加载完毕后再加载进度条的done
    nprogress.done();
})