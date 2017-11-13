const crypto = require('crypto');
const _ = require('lodash');
const config = require('../config/config');

//md5加密
let md5 = exports.md5 = function (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

//加密
let encrypt = exports.encrypt = function (text) {
    return md5(md5(text));
};

// 格式2位数字
let format = exports.format = function (param) {
    return (parseInt(param) < 10) ? '0' + param : param;
};

// 秒转时间
let second2Time = exports.second2Time = function (second) {
    let s = parseInt(second);
    let t = '00:00:00';
    if (s > 0) {
        let hour = parseInt(s / 3600);
        let min = parseInt(s / 60) % 60;
        let sec = s % 60;
        t = '' + format(hour) + ':' + format(min) + ':' + format(sec);
    }
    return t;
};
