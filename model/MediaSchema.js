/**
 * 媒体数据
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let MediaSchema = new Schema({
    fieldname: String,     // 字段名
    originalname: String,  // 原始名
    encoding: String,      // 编码
    mimetype: String,      // 类型
    filename: String,      // 保存的文件名
    relativeDir: String,   // 保存的相对目录
    size: Number           // 空间大小
}, {timestamps: true});

module.exports = MediaSchema;