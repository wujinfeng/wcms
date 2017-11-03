const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;


router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// get 登录页
router.get('/login', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.render('index');
});

// post 登录
router.post('/login', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.render('welcome');
});

// 退出
router.get('/logout', function (req, res) {
    res.clearCookie('access_token');
    res.redirect('/login');
});


module.exports = router;