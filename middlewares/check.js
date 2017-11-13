const config = require('../config/config');
const comm = require('../middlewares/comm');
const logger = config.logger;

// 检测cookie 判断cookie值中的ticket是否与redis中的一样，如果不一样，跳转sso登录页面
let checkLogin = function (req, res, next) {
    next();
};

//导出函数
module.exports = {
    checkLogin: checkLogin
};