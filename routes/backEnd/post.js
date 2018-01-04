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
    let currentPage = req.query.currentPage ? (req.query.currentPage - 1) : 0;
    let limit = Number(req.query.pageSize) || 10;
    let skip = currentPage * limit;
    let params = {};
    mongo.PostModel.find(params).skip(skip).limit(limit).sort({'updatedAt': -1}).lean().exec(function (err, docs) {
        if (err) {
            logger.error(err);
            return res.json({code: 200, msg: '', data: []});
        }
        mongo.PostModel.find(params).count().exec(function (err, totalNum) {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: err});
            }
            docs = docs.map(function (obj) {
                obj.createdAt = moment(obj.createdAt).format('YYYY-MM-DD HH:mm:ss');
                return obj
            });
            res.json({code: 200, msg: '', data: {tableData: docs, totalNum: totalNum}});
        });
    });
});

// 获取：一篇文章 /post/get/id
router.get('/get/:id', function (req, res) {
    console.log(req.query);
    let id = req.param.id;
    mongo.PostModel.findById(id, function (err, doc) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err, data: {}});
        } else {
            res.json({code: 200, msg: '', data: doc});
        }
    });
});

// 新增:一篇文章 /post/add
router.post('/add', function (req, res) {
    console.log(req.body);
    let data = postData(req.body);
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
    mongo.PostModel.update({_id: id}, data, function (err) {
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

function postData(body, author) {
    let title = body.title || '';
    let brief = body.brief || '';
    let content = body.content || '';
    let html = body.html || '';
    let top = body.top || '';
    let postcategoryId = body.postcategoryId || [];
    let image = body.image || '';
    let author = author || '';
    let data = {title, brief, content, html, top, postcategoryId, image, author};
    return data
}


module.exports = router;