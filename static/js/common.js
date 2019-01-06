function $(domId) {
    return document.getElementById(domId);
}

function changeImage(btnid, imgurl) {
    $(btnid).src = imgurl;
}

//添加键值保存进Cookie方法
function setKey(k) {
    pval = getCookie('pwd', '');
    if (pval != null && pval != "") {
        pval += k;
        setCookie('pwd', pval, 365);
    } else {
        setCookie('pwd', k, 365);
    }
}

//检测密码
function checkPwd(goHref) {
    pval = getCookie('pwd', '');
    if (pval.length == 2) {
        if (pval == "99") {
            window.location.href = goHref;
        }
        deleteCookie('pwd');
    } else if (pval.length > 2) {
        deleteCookie('pwd');
    }
}

//cookie 的名称、值以及过期天数。
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//返回Cookie(值或空字符串)
function getCookie(c_name, defaultValue) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return defaultValue
}

// 删除 Cookie
function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, "", expdate);
}

function addBackDoorKey9(goHref) {
    /***页面调用方法
        var func_key = {"number9":addBackDoorKey9("http://www.baidu.com")};
        document.onkeypress = initKeyEvent(func_key);
    ***/
    return function () {
        setKey(9);
        checkPwd(goHref);
    }
}

var keyPress = false;
var keyPressDown = false;

var KEY_MAP = {
    1: "up",
    2: "down",
    3: "left",
    4: "right",
    13: "enter",
    283: "back",
    339: "back",
    340: "back",
    372: "upPage",
    373: "downPage",
    8: "back",
    126: "back",
    48: "back",
    96: "back",
    13: "enter",
    33: "upPage",
    34: "downPage",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    263: "playPause", //暂停/播放
    259: "volUp", //音量+
    260: "volDown", //音量-
    264: "fastForward", //快进
    265: "fastRewind", //快退
    261: "mute", //静音
    1060: "track", //声道
    "EVENT_MEDIA_END": "EVENT_MEDIA_END", //视频播放结束
    //"EVENT_MEDIA_ERROR":"EVENT_MEDIA_ERROR",    //视频播放错误
    48: "number0",
    49: "number1",
    50: "number2",
    51: "number3",
    52: "number4",
    53: "number5",
    54: "number6",
    55: "number7",
    56: "number8",
    57: "number9"

}

var evtMap = {};

function initKeyEventPress(evt) { //初始化事件对象
    /*** 页面调用方法。
        var func_key = {"number0":function(){alert("OKKK");} };
        document.onkeypress = initKeyEventPress(func_key);
    ***/
    if (keyPressDown) {
        return;
    }
    keyPress = true;

    evt = evt ? evt : window.event;
    var keyCode = evt.which ? evt.which : evt.keyCode;
    if (keyCode == 0x0300) {
        eval("oEvent = " + Utility.getEvent());
        keyCode = oEvent.type;
    }
    var keyMapKey = KEY_MAP[keyCode];

    if (keyMapKey) {
        eventFunc = evtMap[keyMapKey];
        if (eventFunc && typeof (eventFunc) == "function") {
            eventFunc(evt);
        }
        evt.preventDefault(); //停止所有操作
        return false;
    }

    if (evtMap["all"] && typeof (evtMap["all"]) == "function") {
        evtMap["all"](evt);
    }

    return true;
}

function initKeyEventPressDown(evt) { //初始化事件对象
    /*** 页面调用方法。
        var func_key = {"number0":function(){alert("OKKK");} };
        document.initKeyEventPressDown = initKeyEvent(func_key);
    ***/
    if (keyPress) {
        return;
    }
    keyPressDown = true;
    evt = evt ? evt : window.event;
    var keyCode = evt.which ? evt.which : evt.keyCode;
    if (keyCode == 0x0300) {
        eval("oEvent = " + Utility.getEvent());
        keyCode = oEvent.type;
    }
    var keyMapKey = KEY_MAP[keyCode];
    if (keyMapKey) {
        eventFunc = evtMap[keyMapKey];
        if (eventFunc && typeof (eventFunc) == "function") {
            eventFunc(evt);
        }
        evt.preventDefault(); //停止所有操作
        return false;
    }

    if (evtMap["all"] && typeof (evtMap["all"]) == "function") {
        evtMap["all"](evt);
    }

    return true;
}

function getEventTargetId(evt) {
    return evt.srcElement ? evt.srcElement : evt.target;
}

function PageClass() {
    var self = this;
    self.is_focus = 1;
    self.filter = {};
    self.pages_info = {};
}

PageClass.prototype = {
    set_filter: function (key, value) {
        if (typeof (value) == "object") {
            for (var k in value) {
                this.filter[k] = value[k];
            }
        } else {
            this.filter[key] = value;
        }
    },
    add_page_info: function (page_key, dict_data) {
        this.pages_info[page_key] = dict_data;
    },
    get_page_info: function (page_key) {
        if (this.pages_info[page_key]) {
            return this.pages_info[page_key];
        }
        return null;
    },
    refresh: function (page_name) {
        var ret = {};
        var filter = this.filter;
        var pages_info = this.pages_info;
        for (var key in pages_info) {
            var p = pages_info[key];
            var prev_page_id = p["prev_page_id"];
            var next_page_id = p["next_page_id"];
            var first_page_id = p["first_page_id"];
            var last_page_id = p["last_page_id"];
            var current_page = p["current_page"];
            var number_of_page = p["number_of_page"];
            ret[key] = current_page;
        }
        for (var fk in filter) {
            ret[fk] = filter[fk];
        }

        if (this.is_focus && prev_page_id && page_name == "prev_page") {
            if (current_page == 1) {
                ret["focus"] = next_page_id;
            } else {
                ret["focus"] = prev_page_id;
            }
        } else if (this.is_focus && next_page_id && page_name == "next_page") {
            if (current_page == number_of_page) {
                ret["focus"] = prev_page_id;
            } else {
                ret["focus"] = next_page_id;
            }
        }

        var url = window.location.href.split("?")[0];
        var params = [];
        for (var k in ret) {
            params.push(k + "=" + ret[k]);
        }
        url = url + "?" + params.join("&");
        window.location.href = url;
    },
    prev_page: function (page_key, is_focus) {
        if (!arguments[0]) {
            page_key = "p";
        }
        this.is_focus = is_focus;
        var page_info = this.get_page_info(page_key);
        if (page_info.current_page == 1) {
            return;
        }
        page_info.current_page = page_info.current_page - 1;
        this.refresh("prev_page");
    },
    next_page: function (page_key, is_focus) {
        if (!arguments[0]) {
            page_key = "p";
        }
        this.is_focus = is_focus;
        var page_info = this.get_page_info(page_key);
        if (page_info.current_page == page_info.number_of_page) {
            return;
        }
        page_info.current_page = page_info.current_page + 1;
        this.refresh("next_page");
    },
    last_page: function (page_key) {
        if (!arguments[0]) {
            page_key = "p";
        }
        var page_info = this.get_page_info(page_key);
        if (page_info.current_page == page_info.number_of_page) {
            return;
        }
        page_info.current_page = page_info.number_of_page;
        this.refresh("last_page");
    },
    first_page: function (page_key) {
        if (!arguments[0]) {
            page_key = "p";
        }
        var page_info = this.get_page_info(page_key);
        if (page_info.current_page == 1 || page_info.current_page == 0) {
            return;
        }
        page_info.current_page = 1;
        this.refresh("first_page");
    }
}

function Carousel() {
    this.init.apply(this, arguments);
}

Carousel.prototype = {
    init: function (columns, apiKlass, switch_fun, begin, end, max_index, first_cols, call_pos, type) {
        /**
         * @columns: 推荐位内容
         * @apiKlass: 光标移动对象
         * @switch_fun: 切换操作
         * @begin: 开始索引
         * @end: 结束索引
         * @first_cols: 推荐位起始id列的索引，比如id="id_2_2" => first_cols=2
         * @call_pos: 调用该类的位置，index->首页
         * @type: 1表示横向，2表示纵向
         */
        this.columns = columns;
        this.apiKlass = apiKlass;
        this.begin = parseInt(begin) || 0;
        this.end = parseInt(end) || 2;
        this.max_index = max_index || 2;
        this.first_cols = first_cols || 2;
        this.len = this.columns.length;
        this.switch_fun = switch_fun;
        this.call_pos = call_pos || "index";
        this.type = type || 1;
        if (this.type == 2) {
            this.dir_increase = "down";
            this.dir_reduce = "up";
        } else {
            this.dir_increase = "right";
            this.dir_reduce = "left";
        }
        this.show_dir_btn();
    },
    switched: function (dir) {
        if (dir == this.dir_increase) {
            if (this.end < this.len - 1) {
                ++this.begin;
                ++this.end;
            }
        } else if (dir == this.dir_reduce) {
            if (this.begin > 0) {
                --this.begin;
                --this.end;
            }
        }

        for (var i = this.begin, j = this.first_cols; i <= this.end; ++i, ++j) {
            this.switch_fun(this.columns, i, j);
        }

        this.show_dir_btn();
    },
    move: function (current_button, dir) {
        var index = current_button["index"];
        zsj.scroll.stop(); // 解决：左右选中时，视频列表名与视频图不相匹配
        if (this.call_pos == "index") {
            if (this.begin == 0 && dir == this.dir_reduce && index == 0) {
                zsj.flicker.stop();
                this.apiKlass.set_zoom_size(this.apiKlass.current_dom, this.apiKlass.dom_wrap, -1);
                this.apiKlass.set_zoom_size(this.apiKlass.dom_zoom, this.apiKlass.dom_zoom_wrap, -1);
                this.apiKlass.dom_zoom_wrap.style.visibility = "hidden";
                this.apiKlass.init_dom("id_1_1");
                return true;
            }
        }

        if (index == this.max_index && dir == this.dir_increase) {
            this.switched(this.dir_increase);
        } else if (index == 0 && dir == this.dir_reduce) {
            this.switched(this.dir_reduce);
        }
    },
    show_dir_btn: function () {
        if (this.end < this.len - 1) {
            zsj.utils.show("hand_right");
        } else {
            zsj.utils.hide("hand_right");
        }

        if (this.begin > 0) {
            zsj.utils.show("hand_left");
        } else {
            zsj.utils.hide("hand_left");
        }
    }
}


function ajax(url, fnSucc, fnFaild) {
    var oAjax = null;
    var sep = url.indexOf("?") == "-1" ? "?" : "&";

    url = url + sep + 'rand=' + Math.random();

    if (window.XMLHttpRequest) {
        oAjax = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        zsj.utils.log("The STB is not supported Ajax.");
    }

    oAjax.open('GET', url, true);
    oAjax.send();

    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {
                fnSucc(oAjax.responseText);
            } else {
                if (fnFaild) {
                    fnFaild();
                }
            }
        }
    };
}

var zsj = {};
zsj.utils = {
    log: function (info) {
        var img = document.createElement('img');
        img.src = "/life/js_log.do?info=" + info;
        img.style.visibility = 'hidden';
        document.body.appendChild(img);
    },
    call: function (fn, args) {
        if (typeof fn == "string" && fn !== "") {
            return eval("(" + fn + ")");
        } else if (typeof fn == "function") {
            if (!(args instanceof Array)) {
                var temp = [];
                for (var i = 1; i < arguments.length; i++) {
                    temp.push(arguments[i]);
                }
                args = temp;
            }
            return fn.apply(window, args);
        }
    },
    show: function (id) {
        var dom = $(id);
        if (dom) {
            dom.style.visibility = "visible";
        }
    },
    hide: function (id) {
        var dom = $(id);
        if (dom) {
            dom.style.visibility = "hidden";
        }
    },
    isEmpty: function (o) {
        if (undefined != o && o != null && o != "" && typeof o != "undefined") {
            return false;
        }
        return true;
    },
    inArray: function (arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == elem) {
                return i;
            }
        }
        return -1;
    },
    tip: function (id, info, second, type) {
        var second = second || 3;
        var type = type || 1; //1 没图，2 有图
        if (type == 1) {
            $(id).innerHTML = info;
            if (this.isEmpty(info)) {
                return;
            }
        }
        this.show(id);
        if (second > 0) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(function () {
                zsj.utils.hide(id);
            }, second * 1000);
        }
    },
    save_pv: function (c_key, c_name, page_key) {
        var img = new Image();
        img.src = "/music/save_pv.do?c_name=" + c_name + "&c_key=" + c_key + "&page_key=" + page_key;
    }

}

//选中框闪烁
zsj.flicker = {
    start: function (dom_select_box) {
        var id = dom_select_box.id;
        /**this.timer = setInterval(function () {
            if($(id).style.visibility==="hidden") {
                zsj.utils.show(id);
            } else {
                zsj.utils.hide(id);
            }
        }, 200);**/
    },
    stop: function () {
        /**if(typeof this.timer !== "undefined") {
            clearInterval(this.timer);
        }**/
    }
}

zsj.scroll = {
    start: function (id) {
        this.scrollId = id;
        this.innerHtml = $(id).innerHTML;
        if (this.innerHtml.length > 5) {
            $(id).innerHTML = '<marquee behavior="alternate" direction="left" scrollamount="1">' + this.innerHtml + '</marquee>';
        }
    },
    stop: function () {
        if (this.scrollId) {
            $(this.scrollId).innerHTML = this.innerHtml;
            this.scrollId = undefined;
        }
    }
};

//轮播图
function Slide() {
    this.init.apply(this, arguments);
}

Slide.prototype = {
    init: function (id, data, param) {
        this.data = data;
        this.counter = 0;
        this.dom = $(id);
        this.dom.src = data[0]["link_image"];
        this.param = param;
        this.dom.title = data[0]["special__link_url"] + param;

        var self = this;
        setInterval(function () {
            self.move();
        }, 3000);
    },
    move: function () {
        this.counter += 1;
        var index = this.counter % this.data.length;
        this.dom.src = this.data[index]["link_image"];
        this.dom.title = this.data[index]["special__link_url"] + this.param;
    }
};


function get_http_url(url) {
    var host = "http://" + window.location.host;
    if (url.indexOf("http") != 0) {
        url = host + url;
    }
    return url;
}


//页面滑动
function PageSlide() {
    this.init.apply(this, arguments);
}

PageSlide.prototype = {
    init: function () {
        this.timerDown = null;
        this.timerUp = null;
        this.timerLeft = null;
        this.top = parseInt(getCookie("offsetTop", 0));
        this.left = parseInt(getCookie("offsetLeft", 0));
        this.flag = false; //模拟不支持offsetTop情况
    },
    moveUp: function (itarget) { //向上移动
        clearInterval(this.timerUp);
        clearInterval(this.timerDown);
        var oDiv = $("wrapper");
        var my_self = this;
        this.timerUp = setInterval(function () {
            var speed = 100;
            var top = oDiv.offsetTop;
            if (top == undefined || my_self.flag) {
                top = my_self.top;
            }
            if (top + speed > itarget) {
                speed = itarget - top;
            }
            if (top >= itarget) {
                clearInterval(my_self.timerUp);
            } else {
                oDiv.style.top = (top + speed) + 'px';
                my_self.top = top + speed;
                setCookie("offsetTop", top + speed);
            }
        }, 100);
        $('container').style.left = 0;
    },
    moveDown: function (itarget) { //向下移动
        clearInterval(this.timerUp);
        clearInterval(this.timerDown);
        var oDiv = $("wrapper");
        var my_self = this;
        this.timerDown = setInterval(function () {
            var speed = -100;
            var top = oDiv.offsetTop;
            if (top == undefined || my_self.flag) {
                zsj.utils.log("offsetTop Incompatible");
                top = my_self.top;
            } else {
                zsj.utils.log("offsetTop compatible");
            }
            if (top + speed < itarget) {
                speed = itarget - top;
            }
            if (top <= itarget) {
                clearInterval(my_self.timerDown);
            } else {
                oDiv.style.top = (top + speed) + 'px';
                my_self.top = top + speed;
                setCookie("offsetTop", top + speed);
            }
        }, 100);
        $('container').style.left = 0;
    },
    moveLeft: function (itarget) {
        clearInterval(this.timerLeft);

        var oDiv = $('container');
        var my_self = this;
        this.timerLeft = setInterval(function () {
            var speed = 0;
            var left = oDiv.offsetLeft;
            if (left == undefined) {
                left = my_self.left;
            }
            if (left > itarget) {
                if (left + speed > itarget) {
                    speed = itarget - left;
                } else {
                    speed = -100;
                }
            } else {
                if (left + speed < itarget) {
                    speed = itarget - left;
                } else {
                    speed = 100;
                }
            }
            if (left == itarget) {
                clearInterval(my_self.timerLeft);
            } else {
                oDiv.style.left = (left + speed) + 'px';
                my_self.left = left + speed;
                setCookie("offsetLeft", left + speed);
            }
        }, 1);
    }
};

//模拟input输入
var my_input = {
    init: function (obj) {
        var self = this;
        evtMap["left"] = function (evt) {
            self.delete_num(obj.current_dom.id);
        };
        evtMap["delete"] = function (evt) {
            self.delete_num(obj.current_dom.id);
        };
        for (var i = 0; i < 10; i++) {
            (function (i) {
                evtMap["number" + i] = function (evt) {
                    self.add_num(i, obj.current_dom.id);
                };
            })(i);
        }
    },
    add_num: function (key, dom_id) {
        var num_dom = $("num_" + dom_id);
        var num = num_dom.innerHTML.replace(/^\s*|\s*$/g, "");;

        if (num.length < 11) {
            num = num + key;
        }
        num_dom.innerHTML = num;
    },
    delete_num: function (dom_id) {
        var num_dom = $("num_" + dom_id);
        var num = num_dom.innerHTML.replace(/^\s*|\s*$/g, "");
        var new_num = num.substring(0, num.length - 1);
        $("num_" + dom_id).innerHTML = "";

    }
};

function ajax2(url, fnSucc, fnFaild) {
    var oAjax = null;
    var sep = url.indexOf("?") == "-1" ? "?" : "&";

    url = url + sep + 'rand=' + Math.random();

    if (window.XMLHttpRequest) {
        oAjax = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        zsj.utils.log("The STB is not supported Ajax.");
    }

    oAjax.open('GET', url, true);
    oAjax.send();

    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {
                fnSucc(oAjax.responseText);
            } else {
                if (fnFaild) {
                    fnFaild();
                }
            }
        }
    };
}
