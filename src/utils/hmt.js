/**
 * 通用js方法封装处理
 * Copyright (c) 2019 hmt
 */
import request from '@/utils/request'
const baseURL = process.env.VUE_APP_BASE_API
import { getDictArr } from "@/api/system/dict/data";
import { _getSessionStore } from '@/utils/storage';
import { tokenKey } from '@/settings';
import store from '@/store'
// 日期格式化
export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 表单重置
export function resetForm(refName) {
    if (this.$refs[refName]) {
        // console.info(this.$refs[refName])
        this.$refs[refName].resetFields();
    }
}
//数字转大写
export function toChinesNum(num) {
    let changeNum = [
        "零",
        "壹",
        "贰",
        "叁",
        "肆",
        "伍",
        "陆",
        "柒",
        "捌",
        "玖",
    ]; //changeNum[0] = "零"
    let unit = ["", "拾", "佰", "仟", "万"];
    num = parseInt(num);
    let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (var i = 0; i < strArr.length; i++) {
            newNum =
                (i == 0 && strArr[i] == 0 ?
                    "" :
                    i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ?
                    "" :
                    changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
                newNum;
        }
        return newNum;
    };
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
// 添加日期范围
export function addDateRange(params, dateRange) {
    var search = params;
    search.beginTime = "";
    search.endTime = "";
    if (null != dateRange && '' != dateRange) {
        search.beginTime = dateRange[0];
        search.endTime = dateRange[1];
    }
    return search;
}
// 回显数据字典
export function getDicts(code) {
    //   console.log(code)
    return new Promise((resolve, reject) => {
        getDictArr({ dictTypeCode: code }).then(response => {
            //   console.log(response)
            if (response.code == 200) {
                response.data = response.data.map(item => {
                    item.dictCode = item.dictCode + '';
                    item.dictValue = isNaN(parseInt(item.dictCode)) ? item.dictCode : parseInt(item.dictCode);
                    item.dictLabel = item.dictName;
                    return item
                })
                return resolve(response)
            } else {
                return resolve(response)
            }
        }).catch((error) => {
            return reject(error)
        });
    });

}
// 回显数据字典
export function selectDictLabel(datas, value) {
    var actions = [];
    Object.keys(datas).some((key) => {
        if (datas[key].dictValue == ('' + value)) {
            actions.push(datas[key].dictLabel);
            return true;
        }
    })
    return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
    var actions = [];
    var currentSeparator = undefined === separator ? "," : separator;
    var temp = value.split(currentSeparator);
    Object.keys(value.split(currentSeparator)).some((val) => {
        Object.keys(datas).some((key) => {
            if (datas[key].dictValue == ('' + temp[val])) {
                actions.push(datas[key].dictLabel + currentSeparator);
            }
        })
    })
    return actions.join('').substring(0, actions.join('').length - 1);
}

// 通用下载方法
export function download(fileName) {
    window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}

// 字符串格式化(%s )
export function sprintf(str) {
    var args = arguments,
        flag = true,
        i = 1;
    str = str.replace(/%s/g, function() {
        var arg = args[i++];
        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
    if (!str || str == "undefined" || str == "null") {
        return "";
    }
    return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
    id = id || 'id'
    parentId = parentId || 'parentId'
    children = children || 'children'
    rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
        //对源数据深度克隆
    const cloneData = JSON.parse(JSON.stringify(data))
        //循环所有项
    const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
            //返回每一项的子级数组
            return father[id] == child[parentId]
        }).sort((a, b) => {
            let flag = 0;
            if (a.orderNo) {
                flag = a.orderNo - b.orderNo
            } else if (a.sort) {
                flag = a.sort - b.sort
            } else if (a.id) {
                flag = a.id - b.id
            }
            return flag
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        //返回第一层
        return father[parentId] === rootId;
    });
    // console.info(treeData)
    return treeData != '' ? treeData : data;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
    let result = ''
    Object.keys(params).forEach((key) => {
        if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
        }
    })
    return result
}
//是否有当前权限
export const isPromise = (promise) => {
    const permissions = store.getters && store.getters.permissions;
    return permissions.includes(promise);
}

export const isCrm = () => {
    return _getSessionStore(tokenKey) == 20;
}

//防抖
export function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 3000
    }
    let _lastTime = null
    return function() {
        let _nowTime = +new Date().getTime()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)
            _lastTime = _nowTime;
            return;
        }
    }
}

export function debounce(func, wait) {
    let lastTime = null;
    let timeout;
    if (wait == null || wait == undefined) {
        wait = 3000
    }
    return function() {
        let context = this;
        let args = arguments;
        let now = new Date();
        // 判定不是一次抖动
        if (now - lastTime - wait > 0) {
            setTimeout(() => {
                func.apply(context, args);
            }, wait);
        } else {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
        // 注意这里lastTime是上次的触发时间
        lastTime = now;
    }
}

//将base64转换为文件对象
export function dataURLtoFile(dataurl, filename = 'fileName') {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    // console.info(mime)
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    //转换成file对象
    return new File([u8arr], filename, { type: mime });
    //转换成成blob对象
    //return new Blob([u8arr],{type:mime});
}

export function uploadFile({ url, file, name = "file" }) {

    // console.info(file)

    // console.info(typeof file)
    var formdata = new FormData()
    formdata.append(name, file)
    return request({
        url: url || '',
        method: 'post',
        type: 'multipart/form-data',
        data: formdata,
        params: { companyId: '3021', busirecordId: '3530', uploadType: '' }
    })
}