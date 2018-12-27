function gourl(url,data) {
    var href="http://202.99.114.74:57301/epg/";
        href+=url;

    if(data.length!=0){
        href+="?"+data.join("&");
    }
    return href;
}
function $(str) {
    var s = str.charAt(0);// 得到的可能是"#",".","其他";
    var ss = str.slice(1);//得到"demo","one"等
    switch (s) {
        case "#":
            return document.getElementById(ss);
            break;
        default:
            return document, getElementsByTagName(str);
    }
}
function addElement(obj,ele,attr,attrName,content) {
    var parent = this.$(obj);
    var element = document.createElement(ele);
    //设置属性，如 id
    element.setAttribute(attr,attrName);
    element.innerHTML = content;
    parent.appendChild(element);
}
function auth(UserID,UserToken,CarrierID) {
    Ajax.get({
        url:"http://202.99.114.74:57301/api.php",//请求首页数据
        data:{
            mod:"user",
            ac:"authorization",
            UserID:UserID,
            UserToken:UserToken,
            CarrierID:CarrierID,
        },
        success:function(data){
            data=JSON.parse(data);
            console.log(data)
            var productId=datas.productList[0].productId;
            console.log(productId);
            // if(data.code==0){
            //             //    var productId=  data.datas.productList.productId;
            //             //
            //             // }else{
            //             //
            //             // }
        },

        async: false,
    })
}
function rep(str,c) {
    var g="";
    if(c){
        var a=str.split("&");
         g=a.join("--");

    }else{
        var a=str.split("--");
         g=a.join("&");
    }
    return g;
}