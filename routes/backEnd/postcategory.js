const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;
const mongo = require('../../model/mongodb');
const moment = require('moment');

router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});


// 列表页 /postcategory/list
router.get('/list', function (req, res) {
    let name = req.query.name;
    let currentPage = req.query.currentPage ? (req.query.currentPage - 1) : 0;
    let limit = Number(req.query.pageSize) || 10;
    let skip = currentPage * limit;
    let params = {};
    if (name) {
        let regex = new RegExp(name, 'i');
        params.name = regex;
    }
    mongo.PostcategoryModel.find(params).skip(skip).limit(limit).sort({'createdAt': -1})
        .populate({path:'parentId',select:'name'}).lean()
        .exec(function (err, docs) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        mongo.PostcategoryModel.find(params).count().exec(function (err, totalNum) {
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

// 获取：一个 /postcategory/get/id
router.get('/get/:id', function (req, res) {
    let id = req.params.id;
    mongo.PostcategoryModel.findById(id, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: '', data: doc});
    })
});

// 新增:一个 /postcategory/add
router.post('/add', function (req, res) {
    console.log(req.body)
    let data = reqBody(req.body);
    mongo.PostcategoryModel.create(data, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: ''});
    })
});

// 删除：一个 /postcategory/delete/id
router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    mongo.PostcategoryModel.remove({_id: id}, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: ''});
    })
});

// 修改：一个 /postcategory/update/id
router.post('/update', function (req, res) {
    console.log(req.body);
    let id = req.body.id; console.log(id)
    let data = reqBody(req.body);
    mongo.PostcategoryModel.update({_id: id}, data, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: ''});
    });
});

// 获取所有分类 /postcategory/getall
router.get('/getall', function (req, res, next) {
    console.log('getall')
    mongo.PostcategoryModel.find({}).sort({'createdAt': -1}).exec(function (err, docs) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        res.json({code: 200, msg: '', data: docs});
    });
});

// 获取下级分类 /postcategory/getsub
router.get('/getsub/:id', function (req, res, next) {
    console.log('getsub')
    let id = req.params.id;
    mongo.PostcategoryModel.find({parentId: id}).sort({'createdAt': -1}).exec(function (err, docs) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        res.json({code: 200, msg: '', data: docs});
    });
});

function reqBody(body) {
    let name = body.name || '';
    let parentId = body.parentId || '';
    let brief = body.brief || '';
    let image = body.image || '';
    let data = {name, parentId, brief, image};
    return data;
}


module.exports = router;