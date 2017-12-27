const express = require('express');
const router = express.Router();
const config = require('../../config/config');
const logger = config.logger;
const mongo = require('../../model/mongodb');

router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});


// 列表页 /postcategory/list
router.get('/list', function (req, res) {
    let skip = req.query.skip ? (req.query.skip - 1) : 0;
    let limit = req.query.limit || 10;
    mongo.PostcategoryModel.find({}).skip(skip).limit(limit).sort({'updatedAt': -1}).exec(function (err, docs) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 500, msg: '', data: docs});
    })
});

// 获取：一个 /postcategory/get/id
router.get('/get/:id', function (req, res) {
    let id = req.param.id;
    mongo.PostcategoryModel.find({_id: id}, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 500, msg: '', data: docs});
    })
});

// 新增:一个 /postcategory/add
router.post('/add', function (req, res) {
    console.log(req.body)
    let data = reqBody(req.body);
    data.createdAt = new Date();
    mongo.PostcategoryModel.create(data, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 500, msg: '', data: docs});
    })
});

// 删除：一个 /postcategory/delete/id
router.get('/delete/:id', function (req, res) {
    let id = req.param.id;
    mongo.PostcategoryModel.remove({_id: id}, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 500, msg: '', data: docs});
    })
});

// 修改：一个 /postcategory/update/id
router.post('/update/:id', function (req, res) {
    console.log(req.body);
    let id = req.param.id;
    let data = reqBody(req.body);
    mongo.PostcategoryModel.update({_id: id}, data, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 500, msg: '', data: docs});
    });
});

function reqBody(body) {
    let name = body.name || '';
    let parentId = body.parentId || '';
    let brief = body.brief || '';
    let image = body.image || '';
    let updatedAt = new Date();
    let data = {name, parentId, brief, image, updatedAt};
    return data;
}


module.exports = router;