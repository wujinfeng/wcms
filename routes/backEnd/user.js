const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;
const mongo = require('../../model/mongodb');
const moment = require('moment');
const comm = require('../../middlewares/comm');

router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// 列表页 /user/list
router.get('/list', function (req, res) {
    let username = req.query.username;
    let currentPage = req.query.currentPage ? (req.query.currentPage - 1) : 0;
    let limit = Number(req.query.pageSize) || 10;
    let skip = currentPage * limit;
    let params = {};
    if (username) {
        let regex = new RegExp(username, 'i');
        params.username = regex;
    }
    mongo.UserModel.find(params).skip(skip).limit(limit).sort({'createdAt': -1})
        .lean()
        .exec(function (err, docs) {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: err});
            }
            mongo.UserModel.find(params).count().exec(function (err, totalNum) {
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

// 获取：一个 /user/get/id
router.get('/get/:id', function (req, res) {
    let id = req.params.id;
    mongo.UserModel.findById(id, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: '', data: doc});
    })
});

// 新增:一个 /user/add
router.post('/add', async function (req, res) {
    let data = reqBody(req.body);
    mongo.UserModel.create(data, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        res.json({code: 200, msg: ''});
    })
});

// 修改：一个 /user/update
router.post('/update', function (req, res) {
    let id = req.body.id;
    let data = reqBody(req.body);
    mongo.UserModel.update({_id: id}, data, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: ''});
    });
});

// 删除：一个 /user/delete/id
router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    mongo.UserModel.remove({_id: id}, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: ''});
    })
});

// 验证原密码
router.post('/oldpassword', function (req, res) {
    let id = req.body.id;
    let password = req.body.password;
    mongo.UserModel.findById(id, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        console.log(comm.encrypt('' + doc.username + password))
        if (comm.encrypt('' + doc.username + password) === doc.password) {
            return res.json({code: 200, msg: ''});
        }
        res.json({code: 400, msg: new Error('原密码错误')});
    })
});
// 保存新密码
router.post('/newpassword', function (req, res) {
    let id = req.body.id;
    let password = req.body.password;
    mongo.UserModel.findById(id, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        doc.password = comm.encrypt('' + doc.username + password);
        doc.save((err) => {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: err});
            }
            res.json({code: 200, msg: ''});
        });
    });
});

// 新添加用户，修改用户信息
function reqBody(body) {
    let data = {};
    body.username && (data.username = body.username);
    body.password && (data.password = comm.encrypt('' + body.username + body.password));
    body.name && (data.name = body.name);
    body.mobile && (data.mobile = body.mobile);
    body.email && (data.email = body.email);
    body.role && (data.role = body.role);
    body.image && (data.image = body.image);
    return data;
}

module.exports = router;