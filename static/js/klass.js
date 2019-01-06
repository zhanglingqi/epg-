//通过类
function ApiKlass() {
    this.initialize.apply(this, arguments);
}

ApiKlass.prototype = {
    init_dom: function (dom_id) { //初始化元素的属性
        this.current_button = this.get(dom_id);
        this.current_dom = this.current_button["current_dom"];
        this.dom_wrap = this.current_button["dom_wrap"];
        this.dom_focus = this.current_button["dom_focus"];
        this.dom_focus_img = this.current_button["dom_focus_img"];
        this.dom_select_box = this.current_button["dom_select_box"];
        this.current_btn_info = this.current_button["btn_info"];
        this.dom_scroll_text = this.current_button["dom_scroll_text"];
        this.dom_zoom = this.current_button["dom_zoom"];
        this.dom_zoom_wrap = this.current_button["dom_zoom_wrap"];

        if ($("channel_tips")) {
            if (this.current_dom.id == "id_2_1" || this.current_dom.id == "id_3_1" || this.current_dom.id == "id_4_1" || this.current_dom.id == "id_5_1") {
                $("channel_tips").style.visibility = "hidden";
            } else {
                $("channel_tips").style.visibility = "visible";
            }
        }
        if (this.dom_focus) {
            if (this.current_btn_info && this.current_btn_info["focus_image"]) {
                this.dom_focus_img.src = this.current_btn_info["focus_image"];
            }
            this.dom_focus.style.visibility = "visible";
            this.dom_focus.style.zIndex = 1000;
            this.dom_focus.style.display = "block";

            if (this.dom_focus.style["color"]) {
                this.dom_focus.style.zIndex = 0;
            }
            if (this.dom_wrap) {
                this.dom_wrap.style.visibility = "hidden";
            }
        }

        if (this.dom_select_box) {
            this.dom_select_box.style.visibility = "visible";
            this.dom_select_box.style.zIndex = 1000;

        }
        if (this.dom_zoom_wrap) {
            this.dom_zoom_wrap.style.visibility = "visible";
            this.dom_wrap.style.zIndex = 1;
            this.dom_zoom_wrap.style.zIndex = 1;

            this.set_zoom_size(this.current_dom, this.dom_wrap, 1);
            this.set_zoom_size(this.dom_zoom, this.dom_zoom_wrap, 1);
        }
        if (this.dom_scroll_text) {
            zsj.scroll.start(this.dom_scroll_text.id);
        }

        if (this.dom_select_box) {
            zsj.flicker.start(this.dom_select_box);
        }
        if (this.dom_zoom) {
            zsj.flicker.start(this.dom_zoom);
        }
        zsj.utils.call(this.current_button["onfocus"], [this.dom_select_box, this.dom_zoom_wrap, this.current_dom]);
    },
    initialize: function (focus_id, func_key, define_buttons, btn_info, define_save_pv, zoom) {
        /****
            @focus_id->初始化的IMG ID ID命名规则id+行号+列号 以"_"分割 例如：id_{{row}}_{{column}} id_1_1
            @define_buttons->自定义按钮，{"id_1_1":{"left":"id_1_2","right":"","top":"","down":"id_2_8"}}
            说明->选中默认的图片为xxxx_02.png,默认图片为xxxx_01.png
        ****/
        // 修复有些盒子按键异常
        // document.onkeypress = initKeyEventPress;
        document.onkeydown = initKeyEventPressDown;

        this.cache_ids = []; // 存储所有DOM元素的ID
        this.max_row = 0; // 最大行
        this.max_column = 0; // 最大列

        this.define_save_pv = define_save_pv || "";
        this.arr_data = this.get_data(); // DOM元素ID以二维数组存储
        this.define_buttons = define_buttons; //自定义Button的left,right,up,down数据
        this.btn_info = btn_info || {};
        this.button_store = this.config_buttons(); // 存储所有Button的left,right,up,down数据
        this.zoom = zoom || 5; //缩放尺寸

        if (this.get(focus_id)) {
            this.init_dom(focus_id); // 初始化当前元素
        } else if (this.cache_ids[0]) {
            this.init_dom(this.cache_ids[0]);
        }

        var self = this;

        evtMap = {
            "left": function (evt) {
                self.move("left");
            },
            "right": function (evt) {
                self.move("right");
            },
            "up": function (evt) {
                self.move("up");
            },
            "down": function (evt) {
                self.move("down");
            },
            "enter": function (evt) {
                self.enter();
            },
            "back": function (evt) {
                self.back();
                evt.preventDefault();
            }
        }


        if (func_key) {
            for (var i in func_key) {
                evtMap[i] = func_key[i];
            }
        }
    },

    get: function (id) {
        if ($(id)) {
            return this.button_store[id];
        }
    },

    // 获取所有的dom元素
    get_data: function () {
        var data = new Array();
        var doms = document.getElementsByTagName('img');

        for (var i = 0; i < doms.length; i++) {
            dom_id = doms[i].id;

            if (dom_id && dom_id.indexOf('id_') == 0) {
                this.cache_ids.push(dom_id);

                var id = dom_id.split("_");
                var row = parseInt(id[1]);
                var column = parseInt(id[2]);

                if (row > this.max_row) {
                    this.max_row = row;
                }

                if (column > this.max_column) {
                    this.max_column = column;
                }

                if (typeof (data[row]) == "undefined") {
                    data[row] = new Array();
                }

                data[row][column] = 1;
            }
        }

        return data;
    },

    // 配置button的事件
    config_buttons: function () {
        var buttons = {};

        // 遍历所有的DOM元素的ID
        var ids = this.cache_ids;
        for (var i = 0; i < ids.length; i++) {

            var dom_id = ids[i];

            var id = dom_id.split("_");
            var row = parseInt(id[1]);
            var column = parseInt(id[2]);

            buttons[dom_id] = {
                "left": this.left_dom(row, column),
                "right": this.right_dom(row, column),
                "up": this.up_dom(row, column),
                "down": this.down_dom(row, column)
            };

            if (this.define_buttons && this.define_buttons[dom_id]) {
                var define_button = this.define_buttons[dom_id];
                for (var key in define_button) {
                    // 使用自定义的当前dom的配置
                    if (zsj.utils.inArray(["left", "right", "up", "down"], key) != -1) {
                        if ($(define_button[key]) || define_button[key] == null) {
                            buttons[dom_id][key] = define_button[key];
                        }
                    } else {
                        buttons[dom_id][key] = define_button[key];
                    }
                }
            }

            if (this.btn_info && this.btn_info[dom_id]) {
                buttons[dom_id]["btn_info"] = this.btn_info[dom_id];
            }

            if (buttons[dom_id]) {
                buttons[dom_id]["current_dom"] = $(dom_id);
                buttons[dom_id]["dom_wrap"] = $("div_" + dom_id);
                buttons[dom_id]["dom_focus"] = $("div_" + dom_id + "_focus");
                buttons[dom_id]["dom_focus_img"] = $("img_" + dom_id + "_focus");
                buttons[dom_id]["dom_select_box"] = $("div_" + dom_id + "_select_box");
                buttons[dom_id]["dom_scroll_text"] = $(dom_id + "_scroll_text");
                buttons[dom_id]["dom_zoom"] = $("zoom_" + dom_id);
                buttons[dom_id]["dom_zoom_wrap"] = $("div_" + dom_id + "_zoom");
            }
        }

        return buttons;
    },

    get_id: function (row_index, column_index) { //通过行列获取dom元素的ID
        var t_id = "id_" + row_index + "_" + column_index;
        return t_id;
    },

    move: function (action) {
        if (action == "down") {
            if (this.current_button["down_action"]) {
                zsj.utils.call(this.current_button["down_action"]);
            }
        }
        if (action == "up") {
            if (this.current_button["up_action"]) {
                zsj.utils.call(this.current_button["up_action"]);
            }
        }
        if (action == "right") {
            if (this.current_button["right_action"]) {
                zsj.utils.call(this.current_button["right_action"]);
            }
        }
        if (action == "left") {
            if (this.current_button["left_action"]) {
                zsj.utils.call(this.current_button["left_action"]);
            }
        }
        ret = zsj.utils.call(
            this.current_button["onmove"],
            [this.current_button, action]
        );


        if (ret) {
            return false;
        }

        var next_dom = this.current_button[action];

        if (!$(next_dom)) { // 如果不存在则不执行
            return;
        }
        //处理当前选中的元素

        if (this.dom_focus) {
            this.dom_focus.style.visibility = "hidden";
            this.dom_focus.style.display = "none";
            if (this.dom_wrap) {
                this.dom_wrap.style.visibility = "visible";
            }
        }

        if (this.dom_select_box) {
            this.dom_select_box.style.visibility = "hidden";
        }
        if (this.dom_zoom_wrap) {
            this.dom_zoom_wrap.style.visibility = "hidden";
            this.dom_wrap.style.zIndex = 0;
            this.dom_zoom_wrap.style.zIndex = 0;

            this.set_zoom_size(this.current_dom, this.dom_wrap, -1);
            this.set_zoom_size(this.dom_zoom, this.dom_zoom_wrap, -1);
        }

        zsj.utils.call(this.current_button["onblur"]);

        zsj.scroll.stop();

        zsj.flicker.stop();

        //初始化下一个元素
        this.init_dom(next_dom);


    },

    left_dom: function (r, c) { // 获取左边DOM元素的ID

        var data = this.arr_data;
        var dom_id = null;

        if (c > 1) {
            // 向左查找，固定当前行
            for (var j = c - 1; j > 0; j--) {
                if (data[r] && data[r][j]) {
                    return this.get_id(r, j);
                }
            }
        }
        return dom_id;
    },

    right_dom: function (r, c) { // 获取右边DOM元素的ID
        var data = this.arr_data;
        var dom_id = null;

        if (c < this.max_column) {
            // 向右查找，固定当前行
            for (var j = c + 1; j < data[r].length; j++) {
                if (data[r] && data[r][j]) {
                    return this.get_id(r, j);
                }
            }
        }
        return dom_id;
    },

    up_dom: function (r, c) { // 获取上边的DOM元素的ID
        var data = this.arr_data;
        var dom_id = null;

        if (r > 1) {
            // 每次向上移动一行，行固定，向左查找
            for (var i = r - 1; i > 0; i--) {
                for (var j = c; j > 0; j--) {
                    if (data[i] && data[i][j]) {
                        return this.get_id(i, j);
                    }
                }
            }
        }

        return dom_id;
    },

    down_dom: function (r, c) { // 获取下边的DOM元素的ID

        var data = this.arr_data;
        var dom_id = null;

        // 每次向下移动一行，行固定，向左查找
        for (var i = r + 1; i <= this.max_row; i++) {
            for (var j = c; j > 0; j--) {
                if (data[i] && data[i][j]) {
                    return this.get_id(i, j);
                }
            }
        }

        return dom_id;
    },
    enter: function (evt) {
        if (this.current_button["button_name"]) {
            var c_key = this.current_dom.id;
            var c_name = this.current_button["button_name"];
            zsj.utils.save_pv(c_key, c_name, this.define_save_pv["page_key"]);
        }
        if (this.current_button["action"]) {
            zsj.utils.call(this.current_button["action"]);
        } else if (this.current_dom.title) {
            window.location.href = this.current_dom.title;
        }
    },
    back: function (evt) {
        var url = $("a_back").href;
        if (zsj.utils.isEmpty(url)) return;
        window.location.href = url;
    },
    set_zoom_size: function (dom_img, dom_wrap, times) {
        if (dom_wrap.style.transition != undefined) {
            if (times > 0) {
                dom_wrap.style.transform = "scale(1.08, 1.08)";
                dom_wrap.style.webkitTransform = "scale(1.08, 1.08)";
                dom_wrap.style.transition = "-webkit-transform 0.2s";
            } else {
                dom_wrap.style.transform = "scale(1, 1)";
                dom_wrap.style.webkitTransform = "scale(1, 1)";
                dom_wrap.style.transition = "-webkit-transform 0.2s";
            }
        } else {
            //            if (dom_img.style.width && dom_img.style.height) {
            //                dom_img.style.width = (parseInt(dom_img.style.width) + (this.zoom * times * 2)) + "px";
            //                dom_img.style.height = (parseInt(dom_img.style.height) + (this.zoom * times * 2)) + "px";
            //            }
            //            if (dom_wrap.style.left && dom_wrap.style.top) {
            //                dom_wrap.style.left = (parseInt(dom_wrap.style.left) - this.zoom * times) + "px";
            //                dom_wrap.style.top = (parseInt(dom_wrap.style.top) - this.zoom * times) + "px";
            //            }
        }
    }


}
