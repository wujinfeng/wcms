const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;
const mongo = require('../../model/mongodb');
const moment = require('moment')

router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// 列表页 /post/list
router.get('/list', function (req, res) {
    console.log(req.query);
    let createdAt = req.query.createdAt;
    let title = req.query.title;
    let status = req.query.status;
    let postcategoryId = req.query.postcategoryId;
    let currentPage = req.query.currentPage ? (req.query.currentPage - 1) : 0;
    let limit = Number(req.query.pageSize) || 10;
    let skip = currentPage * limit;
    let params = {};
    if(createdAt){
        params.createdAt = {$gte: createdAt[0], $lt: createdAt[1]};
    }
    if(title){
        let regex = new RegExp(title, 'i');
        params.title = regex;
    }
    if(status){
        params.status = status;
    }
    if(postcategoryId){
        params.postcategoryId = postcategoryId;
    }
    mongo.PostModel.find(params)
        .select({title:1,author:1,createdAt:1,status:1,postcategoryId:1})
        .skip(skip).limit(limit)
        .sort({'sort':-1,'updatedAt': -1})
        .populate({path:'postcategoryId',select:'name'}).lean()
        .exec(function (err, docs) {
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
            console.log(docs)
            res.json({code: 200, msg: '', data: {tableData: docs, totalNum: totalNum}});
        });
    });
});

// 获取：一篇文章 /post/get/id
router.get('/get/:id', function (req, res) {
    let id = req.params.id;
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
    let author = '5a4d802278c4980a00d11e6c';
    let data = postData(req.body);
    data.author = author;
    console.log(data);
    mongo.PostModel.create(data, function (err) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 200, msg: ''});
        }
    });
});

// 修改：一篇文章 /post/update
router.post('/update', function (req, res) {
    let id = req.body.id || '';
    let author = '5a4d802278c4980a00d11e6b';
    let data = postData(req.body);
    data.author = author;
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
    let id = req.params.id;
    mongo.PostModel.remove({'_id': id}, function (err) {
        if (err) {
            logger.error(err);
            res.json({code: 500, msg: err});
        } else {
            res.json({code: 200, msg: ''});
        }
    });
});


function postData(body, author) {
    let title = body.title || '';
    let brief = body.brief || '';
    let content = body.content || '';
    let html = body.html || '';
    let sort = body.sort || 0;
    let postcategoryId = body.postcategoryId || [];
    let image = body.image || '';
    let status = body.status || 1;
    let data = {title, brief, content, html, sort, postcategoryId, image, author, status};
    return data
}


module.exports = router;