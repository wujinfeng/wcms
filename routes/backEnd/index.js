const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;


router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// 首页
router.get('/home', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.render('index');
});



module.exports = router;