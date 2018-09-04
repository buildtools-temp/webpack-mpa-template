/**
 * utils - 为整个脚手架提供方法
 */

'use strict';
//path模块提供了用于处理文件和目录路径的使用工具
const path = require('path');
//config目录中的index文件
const config = require('../config');
//extract-text-build-plugin - 用来分离css和js的内容
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//这是一个json文件，加载过来之后，会变成一个对象
const packageConfig = require('../package.json');

/**
 * createNotifierCallback
 * 此处调用了一个模块，可以在GitHub上找到，它是一个原生的操作系统上发送通知的nodeJS模块。用于返回脚手架错误的函数
 * @returns {Function}
 */
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
};

/**
 * 多个数组合并
 * @param arr1
 * @param arr2
 * @param arr3.......
 * @returns {*}
 */
exports.arrayConcat = (arr1, arr2, arr3) => {
    if (arguments.length <= 1) {
        return false;
    }
    var concat_ = function (arr1, arr2) {
        var arr = arr1.concat();
        for (var i = 0; i < arr2.length; i++) {
            arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
        }
        return arr;
    }
    var result = concat_(arr1, arr2);
    for (var i = 2; i < arguments.length; i++) {
        result = concat_(result, arguments[i]);
    }
    return result;
};

