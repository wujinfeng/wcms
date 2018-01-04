const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');
const mongo = require('../../model/mongodb');
const shortid = require('shortid');
const config = require('../../config/config');
const logger = config.logger;
const path = require('path');
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let now = new Date();
        let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
        let relativeDir = config.upload.rootPath + now.getFullYear() + '/' + date + '/';
        let destination = path.normalize(config.upload.path + relativeDir);
        mkdirp.sync(destination);
        file.relativeDir = relativeDir;
        cb(null, destination);
    },
    filename: function (req, file, cb) {
        let filename = shortid.generate() + path.extname(file.originalname);
        cb(null, filename);
    }
});

let upload = multer({storage: storage});


router.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

// 列表页 /media/list
router.get('/list', function (req, res) {
    let time = req.query.createdAt;
    let originalname = req.query.originalname;
    let currentPage = req.query.currentPage ? (req.query.currentPage - 1) : 0;
    let limit = Number(req.query.pageSize) || 10;
    let skip = currentPage * limit;
    let params = {};
    if (time) {
        params.createdAt = {$gte: time, $lt: moment(time).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')};
    }
    if (originalname) {
        let regex = new RegExp(originalname, 'i');
        params.originalname = regex;
    }
    mongo.MediaModel.find(params).skip(skip).limit(limit).sort({'createdAt': -1}).lean().exec(function (err, docs) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        mongo.MediaModel.find(params).count().exec(function (err, totalNum) {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: err});
            }
            docs = docs.map(function (obj) {
                obj.address = config.upload.url + obj.relativeDir + obj.filename;
                obj.createdAt = moment(obj.createdAt).format('YYYY-MM-DD HH:mm:ss');
                return obj
            });
            res.json({code: 200, msg: '', data: {tableData: docs, totalNum: totalNum}});
        })
    })
});

// 获取：一个 /media/get/id
router.get('/get/:id', function (req, res) {
    let id = req.param.id || ''
    mongo.MediaModel.find({_id: id}, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 500, msg: '', data: docs});
    })
});

// 新增:一个 /media/add
/** req.files
 * [ { fieldname: 'file',
    originalname: 'reservation.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'E:\\wu\\code\\wcms\\public\\upload\\2017\\11',
    filename: 'H1-b2asZM.jpg',
    relativeDir : ''
    path: 'E:\\wu\\code\\wcms\\public\\upload\\2017\\11\\H1-b2asZM.jpg',
    size: 30748 } ]
 */
router.post('/add', upload.array('image', 10), function (req, res) {
    let data = reqFile(req);
    mongo.MediaModel.create(data, function (err, doc) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 200, msg: '', data: doc._id});
    })
});

// 修改：一个 /media/update/id
router.post('/update/:id', upload.array('image', 1), function (req, res) {
    let id = req.param.id;
    let data = reqFile(req);
    mongo.MediaModel.update({_id: id}, data, function (err) {
        if (err) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        return res.json({code: 500, msg: '', data: docs});
    })
});

// 删除：一个 /media/delete/id
router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    mongo.MediaModel.findByIdAndRemove(id, function (err, doc) {
        if (err || !doc) {
            logger.error(err);
            return res.json({code: 500, msg: err});
        }
        let filePath = path.normalize(config.upload.path + doc.relativeDir + doc.filename);
        fs.access(filePath, (err) => {
            if (err) {
                console.log(filePath + '不存在')
            } else {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
            }
        });
        return res.json({code: 200, msg: ''});
    })
});

function reqFile(req) {
    let file = req.files[0];
    let data = {
        fieldname: file.fieldname || '', // 字段名
        originalname: file.originalname || '', // 原始名
        encoding: file.encoding || '', // 编码
        mimetype: file.mimetype || '', // 类型
        filename: file.filename || '', // 保存的文件名
        relativeDir: file.relativeDir || '', // 保存的相对目录
        size: file.size || '' // 空间大小
    };
    return data;
}

module.exports = router;