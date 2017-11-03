var CheckModel = require('../models/checkModel');
var config = require('../config/config');
var sso = config.sso;
var redis = require('../lib/redis');
var comm = require('../middlewares/comm');
let logger = config.logger;

// 检测cookie 判断cookie值中的ticket是否与redis中的一样，如果不一样，跳转sso登录页面
var checkLogin = function (req, res, next) {
    var check = new CheckModel({});

    var url = '';
    var token = '';
    if (config.debug) {
        url = 'http://partner.zxbike.top';
        token = 12;
    }else{
        url = 'http://'+req.hostname;
        token = req.cookies.access_token;
    }

    check.getSystemName(url, (err, row) => {

        if (err) {
            logger.error(err);
            next(err);
        } else {
            if (row.length == 0) {
                return next(new Error('url未加入数据库！'));
            }
            var platform = row[0].platform;
            res.locals.platform = platform;
            req.platformName = row[0].name;


            if (!token) {
                return res.redirect(sso + row[0].name);//跳转到sso登录页面
            } else {
                redis.client.get('user:' + token, function (err, user) {
                    if (err || !user) {
                        return res.redirect(sso + row[0].name);//跳转到sso登录页面
                    } else {
                        let u = JSON.parse(user);
                        req.user = u;    //req.session.user
                        let menus = comm.formatMenu(u.after_menus,u.systems);
                        req.menus = menus;
                        next();
                    }
                });
            }
        }
    });
};

//导出函数
module.exports = {
    checkLogin: checkLogin
};