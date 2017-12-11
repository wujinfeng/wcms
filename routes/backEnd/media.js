const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const config = require('../../config/config');
const logger = config.logger;
const path = require('path');
const multer = require('multer');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let relativeDir = config.upload.rootPath + new Date().getFullYear() + '/' + new Date().getDate() + '/';
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
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// 获取：一个 /media/get/id
router.get('/get/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
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
    //console.log(req);
    console.log('******************');
    let file = req.files[0];
    console.log(file);
    let data = {
        fieldname: file.fieldname,     // 字段名
        originalname: file.originalname,  // 原始名
        encoding: file.encoding,      // 编码
        mimetype: file.mimetype,      // 类型
        filename: file.filename,      // 保存的文件名
        relativeDir: file.relativeDir,   // 保存的相对目录
        size: file.size,           // 空间大小
        createdAt: new Date(),
        updatedAt: new Date()
    };
    let id = 'wer3';
    res.json({status: 200, msg: 'ok', data: {id: id }});
});

// 删除：一个 /media/delete/id
router.get('/delete/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

// 修改：一个 /media/update/id
router.post('/update/:id', function (req, res) {
    res.locals = {menus: [], user: {}};
    res.json({status: 200, msg: '', data: []});
});

module.exports = router;