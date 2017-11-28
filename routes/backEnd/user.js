const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;
const UserService = require('../../service/backEnd/userService');


router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// get 登录页
router.get('/login', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// post 登录
router.post('/login', function (req, res) {
    res.locals = {menus: [], user: {}};

    res.json({status: 200, msg: '', data: []});
});

// 退出
router.get('/logout', function (req, res) {
    res.clearCookie('access_token');
    res.json({status: 200, msg: '', data: []});
});

// 列表页 /user/list
router.get('/list', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// 获取：一个 /user/get/id
router.get('/get/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// 新增:一个 /user/add
router.get('/add', async function (req, res) {
    res.locals = {menus: [], user: {}};

    let user = new UserService(req.query);
    user.init();
    try {
        let result = await user.add();
        console.log(`result: ${result} `);
        res.json({status: 200, msg: 'ok', data: []});
    } catch (e) {
        console.error(e);
        res.json({status: 500, msg: e.message, data: []});
    }
});

// 删除：一个 /user/delete/id
router.get('/delete/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// 修改：一个 /user/update/id
router.post('/update/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

module.exports = router;