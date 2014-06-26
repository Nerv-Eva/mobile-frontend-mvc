/**
 * Created by 轶卓 on 14-5-14.
 */
/*-----------返回 $_GET 对象, 仿PHP模式，自己人使用起来更习惯，哈哈-------*/
var $_GET = (function(){
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        if(u[1].indexOf('#') != -1) {
            u = u[1].split("#");
            u = u[0].split("&");
        } else {
            u = u[1].split("&");
        }
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();
