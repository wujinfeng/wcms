const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;
const mongo = require('../../model/mongodb');

router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// 列表页 /post/list
router.get('/list', function (req, res) {
    console.log(req.query);
    res.locals = {menus: [], user: {}};
    mongo.PostModel.find({}, function (err, docs) {
        if (err) {
            logger.error(err);
            res.json({code: 200, msg: '', data: []});
        } else {
            res.json({code: 200, msg: '', data: docs || []});
        }
    });
});

// 获取：一篇文章 /post/get/id
router.get('/get/:id', function (req, res) {
    console.log(req.query);
    let id = req.param.id;
    mongo.PostModel.find({'_id': id}, function (err, doc) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err, data: []});
        } else {
            res.json({code: 200, msg: '', data: doc});
        }
    });
});

// 新增:一篇文章 /post/add
router.post('/add', function (req, res) {
    console.log(req.body);
    let data = postData(req.body);
    data.createdAt = new Date();
    mongo.PostModel.create(data, function (err, doc) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 200, msg: ''});
        }
    });
});

// 修改：一篇文章 /post/update/id
router.post('/update/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    let id = req.body.id || '';
    let data = postData(req.body);
    data.updatedAt = new Date();
    mongo.PostModel.update({_id: id}, data, function (err, doc) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 200, msg: ''});
        }
    });
});

// 删除：一篇文章 /post/delete/id
router.get('/delete/:id', function (req, res) {
    let id = req.param.id;
    mongo.PostModel.remove({'_id': id}, function (err) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 200, msg: ''});
        }
    });
});

// 发布
router.get('/publish/:id', function (req, res) {
    let id = req.param.id;
    mongo.PostModel.update({'_id': id}, {publishedAt: new Date()}, function (err) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 200, msg: ''});
        }
    })
});

function postData(body) {
    let title = body.title || '';
    let postcategory = body.postcategory || '';
    let state = body.state || '';
    let author = body.author || '';
    let content = body.content || '';
    let image = body.image || '';
    let data = {title, postcategory, state, author, content, image};
    return data
}


module.exports = router;