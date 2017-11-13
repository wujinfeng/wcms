const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;


router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// 列表页 /post/list
router.get('/list', function (req, res) {
    console.log(req.query);
    res.locals = {menus: [], user: {}};
    const item = {
        title: '3国',
        author: '王小虎',
        postcatecory: '科技',
        status: '2',
        ctime: '2016-05-02 00:10:20'
    };
    let data = Array(5).fill(item);
    res.json({status: 200, msg: '', data: data || []});
});

// 获取：一篇文章 /post/get/id
router.get('/get/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// 新增:一篇文章 /post/add
router.post('/add', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});


// 删除：一篇文章 /post/delete/id
router.get('/delete/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// 修改：一篇文章 /post/update/id
router.post('/update/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});


module.exports = router;