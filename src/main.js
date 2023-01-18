import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import Element from "element-ui";
import "./assets/styles/element-variables.scss";

import "@/assets/styles/index.scss"; // global css
import "@/assets/styles/hmt.scss"; // hmt css
import App from "./App";
import store from "./store";
import router from "./router";
import permission from "./directive/permission";
import { download } from "@/utils/request";

import "./assets/icons"; // icon
import "./permission"; // permission control
import { getConfigKey } from "@/api/system/config";
import {
    parseTime,
    resetForm,
    addDateRange,
    selectDictLabel,
    selectDictLabels,
    handleTree,
    getDicts,
    uploadFile,
    dataURLtoFile
} from "@/utils/hmt";
import { formatTime } from "@/utils/hmt";
import Pagination from "@/components/Pagination";
import Drawer from "@/components/Drawer";
import Steper from "@/components/Steper";
import TableData from "@/components/TableData";

//手写板
import VueSignature from "vue-signature-pad";
Vue.use(VueSignature);

//富文本
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from 'quill'
Vue.use(VueQuillEditor);
import imageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', imageResize)

//自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar";
String.prototype.startWith = function(str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
String.prototype.endWith = function(str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
};

//图标选择
import iconPicker from "e-icon-picker";
// import "e-icon-picker/dist/symbol.js"; //基本彩色图标库
// import "e-icon-picker/dist/index.css"; // 基本样式，包含基本图标
import "font-awesome/css/font-awesome.min.css"; //font-awesome 图标库
import "element-ui/lib/theme-chalk/icon.css"; //element-ui 图标库

Vue.use(iconPicker); //使用e-icon-picker
// 全局方法挂载
Vue.prototype.getDicts = getDicts;
Vue.prototype.getConfigKey = getConfigKey;
Vue.prototype.parseTime = parseTime;
Vue.prototype.formatTime = formatTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.download = download;
Vue.prototype.upload = uploadFile;
Vue.prototype.dataURLtoFile = dataURLtoFile;
Vue.prototype.handleTree = handleTree;
Vue.prototype.isEmpty = function(obj) {
    console.info(obj);
    console.info(obj instanceof String);
    if (obj instanceof String) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    } else if (obj instanceof Object) {
        if (Object.keys(obj).length > 0) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
};

Vue.prototype.msgSuccess = function(msg) {
    this.$message({ showClose: true, message: msg, type: "success" });
};

Vue.prototype.msgError = function(msg) {
    this.$message({ showClose: true, message: msg, type: "error" });
};

Vue.prototype.msgInfo = function(msg) {
    this.$message.info(msg);
};

// 全局组件挂载
Vue.component("Steper", Steper);
Vue.component("Drawer", Drawer);
Vue.component("Pagination", Pagination);
Vue.component("RightToolbar", RightToolbar);
Vue.component("TableData", TableData);
Vue.use(permission);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.filter("format", function(value, arg) {
    function dateFormat(date, format) {
        if (typeof date === "string") {
            var mts = date.match(/(\/Date\((\d+)\)\/)/);
            if (mts && mts.length >= 3) {
                date = parseInt(mts[2]);
            }
        }
        date = new Date(date);
        if (!date || date.toUTCString() == "Invalid Date") {
            return "";
        }
        var map = {
            M: date.getMonth() + 1, //月份
            d: date.getDate(), //日
            h: date.getHours(), //小时
            m: date.getMinutes(), //分
            s: date.getSeconds(), //秒
            q: Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };

        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = "0" + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === "y") {
                return (date.getFullYear() + "").substr(4 - all.length);
            }
            return all;
        });
        return format;
    }
    return dateFormat(value, arg);
});

Vue.filter("dateFormat", function(date, s, e) {
    var dateStr = "";
    try {
        s = s ? s : 0;
        e = e ? e : 4;
        date = date ? date.replace(/\-/g, "/").replace("T", " ") : "";
        var time = new Date(date);
        if (date && time != "Invalid Date") {
            dateStr = time.toUTCString();
            var dateArr = [];
            dateArr = (dateStr || "").split(" ").slice(s, e);
            dateStr = dateArr.join(" ");
        } else {
            dateStr = date;
        }
    } catch (err) {}
    return dateStr;
});

Vue.use(Element, {
    size: Cookies.get("size") || "small" // set element-ui default size
});

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});