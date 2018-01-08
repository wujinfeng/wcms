const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongo = require('../../model/mongodb');
const config = require('../../config/config');
const comm = require('../../middlewares/comm');
const logger = config.logger;

router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// get 登录页
router.get('/', function (req, res) {
    res.json({code: 200, msg: ''});
});

// post 登录
router.post('/', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        return res.json({code: 400, msg: '请填写正确用户名和密码'});
    }
    let data = {username: username, password: comm.encrypt('' + username + password)};
    mongo.UserModel.findOne(data, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        console.log('登录信息:' + doc)
        if (doc) {
            let userinfo = {_id: doc._id, username: doc.username, role: doc.role};
            let token = jwt.sign(userinfo, config.tokenSecret);
            userinfo.token = token;
            return res.json({code: 200, msg: '登录成功', data: userinfo});
        }
        res.json({code: 400, msg: '请填写正确用户名和密码'});
    })
});

// 退出
router.get('/logout', function (req, res) {
    res.clearCookie('token');
    res.json({code: 200, msg: ''});
});


module.exports = router;