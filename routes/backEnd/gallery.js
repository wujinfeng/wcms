const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;


router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// 列表页 /gallery/list
router.get('/list', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status:200,msg:'',data:[]});
});

// 获取：一个 /gallery/get/id
router.get('/get/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status:200,msg:'',data:[]});
});

// 新增:一个 /gallery/add
router.post('/add', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status:200,msg:'',data:[]});
});

// 删除：一个 /gallery/delete/id
router.get('/delete/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status:200,msg:'',data:[]});
});

// 修改：一个 /gallery/update/id
router.post('/update/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status:200,msg:'',data:[]});
});

module.exports = router;